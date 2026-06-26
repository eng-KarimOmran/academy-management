import z from "zod";

import {
  address,
  id,
  limit,
  phone,
  platform,
  url,
  entityName,
  page,
} from "../../shared/utils/common.validation";

export const AcademySchema = {
  create: {
    body: z.object({
      name: entityName,
      phone,
      userId: id,
    }),
  },

  update: {
    params: z.object({
      academyId: id,
    }),
    body: z.object({
      name: entityName,
    }),
  },

  delete: {
    params: z.object({
      academyId: id,
    }),
  },

  get: {
    params: z.object({
      academyId: id,
    }),
  },

  getAll: {
    query: z.object({
      page,
      limit,
      search: z.string().optional(),
    }),
  },

  phone: {
    add: {
      params: z.object({
        academyId: id,
      }),
      body: z.object({
        phone,
      }),
    },

    delete: {
      params: z.object({
        academyId: id,
        phoneId: id,
      }),
    },
  },

  address: {
    add: {
      params: z.object({
        academyId: id,
      }),
      body: z.object({
        address,
      }),
    },

    delete: {
      params: z.object({
        academyId: id,
        addressId: id,
      }),
    },
  },

  socialMedia: {
    add: {
      params: z.object({
        academyId: id,
      }),
      body: z.object({
        platform,
        url,
      }),
    },

    delete: {
      params: z.object({
        academyId: id,
        socialMediaId: id,
      }),
    },

    update: {
      params: z.object({
        academyId: id,
        socialMediaId: id,
      }),
      body: z.object({
        platform: platform.optional(),
        url: url.optional(),
      }),
    },
  },

  owner: {
    add: {
      params: z.object({
        academyId: id,
        userId: id,
      }),
    },

    delete: {
      params: z.object({
        academyId: id,
        userId: id,
      }),
    },
  },
  paymentLink: {
    add: {
      params: z.object({
        academyId: id,
      }),
      body: z.object({
        url: url,
        walletProvider: z.string(),
        phone: phone.optional()
      }),
    },
    delete: {
      params: z.object({
        academyId: id,
        paymentLinkId: id,
      }),
    }
  }
};