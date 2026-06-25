import { PaginatedResponse } from './../../shared/types/types';
import { AcademyGetPayload, AcademyInclude, TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import * as DTO from "./academy.dto";
import { Academy, User } from '../../../prisma/generated/client';
import { RequestAuth } from '../auth/auth.type';
import { Response, NextFunction } from 'express';

type SafeUser = Omit<User, "password" | "logoutAt">;


export type AcademyWithFullRelations =
    AcademyGetPayload<{
        include: {
            academyPhones: true,
            addresses: true,
            owners: true,
            paymentLinks: true,
            socialMedia: true,
        };
    }>;

export type AcademyWithSafeRelations = Omit<AcademyWithFullRelations, "owners"> & { owners: SafeUser[] };

export interface RequestAcademy extends RequestAuth {
    academy?: Academy;
}

export interface IAcademyService {
    create: (data: DTO.CreateAcademyDto) => Promise<Academy>;

    update: (data: DTO.UpdateAcademyDto) => Promise<Academy>;

    delete: (data: DTO.DeleteAcademyDto) => Promise<Academy>;

    addOwner: (data: DTO.AddOwnerDto) => Promise<Omit<AcademyGetPayload<{ include: { owners: true } }>, "owners"> & { owners: SafeUser[] }>;

    deleteOwner: (data: DTO.DeleteOwnerDto) => Promise<Omit<AcademyGetPayload<{ include: { owners: true } }>, "owners"> & { owners: SafeUser[] }>;

    addSocialMedia: (data: DTO.AddSocialMediaDto) => Promise<AcademyGetPayload<{ include: { socialMedia: true } }>>;

    deleteSocialMedia: (data: DTO.DeleteSocialMediaDto) => Promise<AcademyGetPayload<{ include: { socialMedia: true } }>>;

    addPhone: (data: DTO.AddPhoneDto) => Promise<AcademyGetPayload<{ include: { academyPhones: true } }>>;

    deletePhone: (data: DTO.DeletePhoneDto) => Promise<AcademyGetPayload<{ include: { academyPhones: true } }>>;

    addAddress: (data: DTO.AddAddressDto) => Promise<AcademyGetPayload<{ include: { addresses: true } }>>;

    deleteAddress: (data: DTO.DeleteAddressDto) => Promise<AcademyGetPayload<{ include: { addresses: true } }>>;

    getDetails: (academy: DTO.GetAcademyDetailsDto) => Promise<AcademyWithSafeRelations>

    getAll: (data: DTO.GetAllAcademiesDto) => Promise<PaginatedResponse<Academy>>;

    myAcademics: (data: { userId: string; tx?: TransactionClient }) => Promise<Academy[]>;

    deletePaymentLink: (data: DTO.DeletePaymentLinkDto) => Promise<AcademyGetPayload<{ include: { paymentLinks: true } }>>;

    addPaymentLink: (data: DTO.AddPaymentLinkDto) => Promise<AcademyGetPayload<{ include: { paymentLinks: true } }>>;
}


export type AcademyControllerMethod<T> = (
    req: T,
    res: Response,
    next: NextFunction
) => Promise<Response>

export interface IAcademyController {
    create: AcademyControllerMethod<RequestAuth>
    update: AcademyControllerMethod<RequestAcademy>
    delete: AcademyControllerMethod<RequestAcademy>

    addOwner: AcademyControllerMethod<RequestAcademy>
    deleteOwner: AcademyControllerMethod<RequestAcademy>

    addSocialMedia: AcademyControllerMethod<RequestAcademy>
    deleteSocialMedia: AcademyControllerMethod<RequestAcademy>

    addPhone: AcademyControllerMethod<RequestAcademy>
    deletePhone: AcademyControllerMethod<RequestAcademy>

    addAddress: AcademyControllerMethod<RequestAcademy>
    deleteAddress: AcademyControllerMethod<RequestAcademy>

    getDetails: AcademyControllerMethod<RequestAcademy>
    getAll: AcademyControllerMethod<RequestAcademy>
    myAcademics: AcademyControllerMethod<RequestAuth>

    addPaymentLink: AcademyControllerMethod<RequestAcademy>
    deletePaymentLink: AcademyControllerMethod<RequestAcademy>
}