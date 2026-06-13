import { User } from "../../../prisma/generated/client";
import ApiError from "../../shared/utils/ApiError";
import { omit } from "../../shared/utils/omit";
import { ITokenPayload, Token } from "../../shared/utils/Token";
import * as DTO from "./auth.dto";
import UserRepository from "../user/user.repository"; // استدعاء الريبوزيتوري الموحد لليوزر
import AuthRepository from "./auth.repository";
import { userAuthSelect } from "../user/user.selectors";
import HashHelper from "./auth.utils";
import { CreateUserDto } from "../user/user.dto";

const AuthService = {
  async login(dataSafe: DTO.LoginDto) {
    const { phone, password } = dataSafe.body;
    const user = await UserRepository.findByPhone({ phone, select: userAuthSelect });

    if (!user || !user.isActive) {
      throw ApiError.Unauthorized("رقم الهاتف أو كلمة المرور غير صحيحة");
    }

    const isPasswordValid = await HashHelper.compare({
      plainPassword: password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw ApiError.Unauthorized("رقم الهاتف أو كلمة المرور غير صحيحة");
    }

    const { access, refresh } = Token.generateTokens(user.id);
    
    const safeUser = omit(user, ["password", "logoutAt"]);

    return {
      user: safeUser,
      tokens: { access, refresh },
    };
  },

  async refresh({ userLogin, tokenPayload }: { userLogin: User; tokenPayload: ITokenPayload }) {
    const access = Token.generateAccessToken(userLogin.id, tokenPayload.jti!);
    const safeUser = omit(userLogin, ["password", "logoutAt"]);

    return { access, user: safeUser };
  },

  async logout({ userLogin, tokenPayload, dataSafe }: { userLogin: User; tokenPayload: ITokenPayload; dataSafe: DTO.LogoutDto }) {
    const { allDevices } = dataSafe.query;

    if (allDevices) {
      await AuthRepository.logoutAllDevices({ userId: userLogin.id });
      return true;
    }

    await AuthRepository.addTokenBlacklist({ jti: tokenPayload.jti! });
    return true;
  },

  async changePassword({ userLogin, dataSafe }: { userLogin: User; dataSafe: DTO.ChangePasswordDto }) {
    const { password, newPassword } = dataSafe.body;

    const isPasswordValid = await HashHelper.compare({
      plainPassword: password,
      hashedPassword: userLogin.password,
    });

    if (!isPasswordValid) {
      throw ApiError.Unauthorized("كلمة المرور غير صحيحة");
    }

    const hashPassword = await HashHelper.hash(newPassword);

    await AuthRepository.changePasswordUser({
      userId: userLogin.id,
      hashPassword,
    });

    return true;
  },

  async createFirstOwner(dataSafe: CreateUserDto) {
    const { name, phone, password } = dataSafe.body;
    const userExists = await UserRepository.findFirst({ where: { roles: { has: "OWNER" } } });

    if (userExists) {
      throw ApiError.Conflict("OWNER_ALREADY_EXISTS");
    }

    const hashedPassword = await HashHelper.hash(password);
    const user = await UserRepository.create({ data: { name, phone, password: hashedPassword, roles: ["OWNER"] } })

    return omit(user, ["password", "logoutAt"]);
  }
};

export default AuthService;