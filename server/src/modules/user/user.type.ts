import { PaginatedResponse } from '../../shared/types/types';
import { User } from './../../../prisma/generated/browser';
import { CreateUserDto, DeleteUserDto, GetAllUsersDto, GetUserDetailsDto, NewPasswordDto, UpdateUserDto } from './user.dto';

export type SafeUser = Omit<User, "password" | "logoutAt">;

export type MeUser = SafeUser & {
    academies: {
        name: string;
        id: string;
        createdAt: Date;
        imageId: string | null;
    }[];

    jobProfile: {
        isActive: boolean;
        userId: string;
        id: string;
        createdAt: Date;
        academyId: string;
        jobProfileType: string;
        bonusAmount: number;
    }[];
};

export interface IUserService {
    createUser(data: CreateUserDto): Promise<SafeUser>;

    updateUser(data: UpdateUserDto, currentUser: User): Promise<SafeUser>;

    deleteUser(data: DeleteUserDto, currentUser: User): Promise<SafeUser>;

    getAllUsers(data: GetAllUsersDto): Promise<PaginatedResponse<SafeUser>>;

    getUserDetails(data: GetUserDetailsDto): Promise<SafeUser>;

    newPassword(data: NewPasswordDto, currentUser: User): Promise<SafeUser>;

    getMe(currentUser: User): Promise<MeUser>;
}