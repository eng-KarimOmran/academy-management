import { PaginatedResponse } from './../../shared/types/types';
import { AcademyGetPayload, TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import * as DTO from "./academy.dto";
import { Academy } from '../../../prisma/generated/client';

export type AcademyWithFullRelations =
    AcademyGetPayload<{
        include: {
            owners: true;
            phones: true;
            addresses: true;
            paymentLinks: true;
            socialMedia: true;
        };
    }>;

export interface IAcademyService {
    create: (data: DTO.CreateAcademyDto) => Promise<Academy>;

    update: (data: DTO.UpdateAcademyDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    delete: (data: DTO.DeleteAcademyDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    addOwner: (data: DTO.AddOwnerDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    deleteOwner: (data: DTO.DeleteOwnerDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    addSocialMedia: (data: DTO.AddSocialMediaDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    deleteSocialMedia: (data: DTO.DeleteSocialMediaDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    addPhone: (data: DTO.AddPhoneDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    deletePhone: (data: DTO.DeletePhoneDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    addAddress: (data: DTO.AddAddressDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    deleteAddress: (data: DTO.DeleteAddressDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    getDetails: (data: DTO.GetAcademyDetailsDto, academy?: AcademyWithFullRelations) => Promise<Academy>;

    getAll: (data: DTO.GetAllAcademiesDto) => Promise<PaginatedResponse<Academy>>;

    myAcademics: (data: { userId: string; tx?: TransactionClient }) => Promise<Academy[]>;
}