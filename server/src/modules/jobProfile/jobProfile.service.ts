import { IJobProfileService } from "./jobProfile.type";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { buildPagination, buildPaginationMeta } from "../../shared/utils/Pagination";
import { buildJobProfileWhere, orderBy } from "./jobProfile.utils";
import { JobProfileCreateInput } from "../../../prisma/generated/models";
import { userSafe } from "../user/user.utils";

const JobProfileService: IJobProfileService = {
  async createJobProfile({ body, params }) {
    const { academyId } = params
    const { userId, ...jobProfileData } = body
    const jobProfile = await prisma.jobProfile.findUnique({ where: { academyId_userId: { academyId, userId } } })
    if (jobProfile) throw ApiError.Conflict("JOB_PROFILE_EXISTS")

    const data: JobProfileCreateInput = {
      academy: { connect: { id: academyId } },
      user: { connect: { id: userId } },
      financialAccount: { create: {} },
      ...jobProfileData
    }

    return await prisma.jobProfile.create({ data });
  },

  async updateJobProfile({ params, body }) {
    const { jobProfileId } = params;

    const targetJobProfile = await prisma.jobProfile.findUnique({
      where: { id: jobProfileId },
    });

    if (!targetJobProfile) throw ApiError.NotFound("JobProfile");

    const jobProfile = await prisma.jobProfile.update({
      where: { id: jobProfileId },
      data: body,
    });

    return jobProfile;
  },

  async deleteJobProfile({ params }) {
    const { jobProfileId } = params;

    const targetJobProfile = await prisma.jobProfile.findUnique({
      where: { id: jobProfileId },
    });

    if (!targetJobProfile) throw ApiError.NotFound("JobProfile");

    const jobProfile = await prisma.jobProfile.delete({
      where: { id: jobProfileId },
    });

    return jobProfile;
  },

  async getAllJobProfiles({ params, query }) {
    const { academyId } = params;
    const { page, limit, ...filters } = query;

    const pagination = buildPagination({ page, limit });

    const where = buildJobProfileWhere({
      academyId,
      ...filters,
    });

    const { jobProfiles, count } = await prisma.$transaction(async (tx) => {
      const [jobProfiles, count] = await Promise.all([
        tx.jobProfile.findMany({
          where,
          ...pagination,
          orderBy,
          include: { user: true },
        }),
        tx.jobProfile.count({ where }),
      ]);

      const jobProfilesSafe = jobProfiles.map((j) => ({
        ...j,
        user: userSafe(j.user),
      }));

      return { jobProfiles: jobProfilesSafe, count };
    });

    const paginationMeta = buildPaginationMeta({
      page,
      limit,
      count,
    });

    return {
      items: jobProfiles,
      pagination: paginationMeta,
    };
  },

  async getJobProfileDetails({ params }) {
    const { jobProfileId } = params;

    const jobProfile = await prisma.jobProfile.findUnique({
      where: { id: jobProfileId },
      include: {
        user: true,
        academy: true,
        financialAccount: true
      },
    });

    if (!jobProfile) throw ApiError.NotFound("JobProfile");

    const jobProfileSafe = {
      ...jobProfile,
      user: userSafe(jobProfile.user),
    }

    return jobProfileSafe;
  },
};

export default JobProfileService;