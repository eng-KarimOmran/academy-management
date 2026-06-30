import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateRange(day?: "today" | "tomorrow") {
  let target = dayjs();

  if (day === "tomorrow") {
    target = target.add(1, "day");
  }

  const gte = target.startOf("day").toISOString();
  const lte = target.endOf("day").toISOString();

  return { gte, lte };
}

export function createDataWithKeys(num: number = 1): string[] {
  return Array.from({ length: num }, (_, i) => `key-${i}`);
}