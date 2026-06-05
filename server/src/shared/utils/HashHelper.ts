import * as argon2 from "argon2";

export default class HashHelper {
  static async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 2,
    });
  }

  static async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const isValid = argon2.verify(hashedPassword, plainPassword);
      return isValid;
    } catch (error) {
      console.error("HashHelper compare error:", error);
      return false;
    }
  }
}
