import z from "zod";
import * as Schema from "./jobProfile.schema";

export type CreateJobProfileDto = {
  params: z.infer<typeof Schema.createJobProfileSchema.params>;
  body: z.infer<typeof Schema.createJobProfileSchema.body>;
};

export type UpdateJobProfileDto = {
  params: z.infer<typeof Schema.updateJobProfileSchema.params>;
  body: z.infer<typeof Schema.updateJobProfileSchema.body>;
};

export type DeleteJobProfileDto = {
  params: z.infer<typeof Schema.deleteJobProfileSchema.params>;
};

export type GetJobProfileDetailsDto = {
  params: z.infer<typeof Schema.getJobProfileDetailsSchema.params>;
};

export type GetAllJobProfilesDto = {
  params: z.infer<typeof Schema.getAllJobProfilesSchema.params>;
  query: z.infer<typeof Schema.getAllJobProfilesSchema.query>;
};