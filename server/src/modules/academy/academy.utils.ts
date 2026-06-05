import {
  AcademyUpdateInput,
  AcademyWhereInput,
} from "../../../prisma/generated/models";
import ApiError from "../../shared/utils/ApiError";
import {
  findAcademyByOwner,
  findAcademyByPhoneOrName,
} from "./academy.repository";

export const buildAcademyWhere = ({
  search,
}: {
  search?: string;
}): AcademyWhereInput => {
  const where: AcademyWhereInput = {};

  if (search) {
    where.OR = [
      { address: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }

  return where;
};

export const isAcademyOwner = async ({
  ownerId,
  academyId,
}: {
  ownerId: string;
  academyId: string;
}) => {
  const academy = await findAcademyByOwner({
    academyId,
    ownerId,
  });

  return !!academy;
};

export const checkAcademyUpdateConflict = async ({
  academyId,
  currentName,
  currentPhone,
  name,
  phone,
}: {
  academyId: string;
  currentName: string;
  currentPhone: string;
  name?: string;
  phone?: string;
}): Promise<AcademyUpdateInput> => {
  const isNameChanged = name && name !== currentName;
  const isPhoneChanged = phone && phone !== currentPhone;
  const data: AcademyUpdateInput = {};

  if (!isNameChanged && !isPhoneChanged) return data;

  const academyExists = await findAcademyByPhoneOrName({
    academyId,
    name: isNameChanged ? name : undefined,
    phone: isPhoneChanged ? phone : undefined,
  });

  if (academyExists) {
    if (isNameChanged && academyExists.name === name) {
      throw ApiError.Conflict("Name");
    }
    if (isPhoneChanged && academyExists.phone === phone) {
      throw ApiError.Conflict("Phone");
    }
  }

  return {
    ...(isNameChanged && { name }),
    ...(isPhoneChanged && { phone }),
  };
};
