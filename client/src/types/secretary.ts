
interface User {
  id: string,
  name: string,
  phone: string,
}

export interface Secretary {
  id: string;
  academyId: string,
  baseSalary: number;
  targetCount: number;
  bonusAmount: number;
  user: User;
}