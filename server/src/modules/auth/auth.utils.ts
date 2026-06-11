import * as argon2 from "argon2";

const HashHelper = {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 2,
    });
  },

  async compare({ plainPassword, hashedPassword }: { plainPassword: string; hashedPassword: string }): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch (error) {
      console.error("HashHelper compare error:", error);
      return false;
    }
  },
};

export default HashHelper;