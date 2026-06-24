import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatType = "time" | "date" | "datetime";

export const formatDate = (dateString: string, type?: FormatType) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  switch (type) {
    case "time":
      return date.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    case "date":
      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    case "datetime":
    default:
      return date.toLocaleString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  }
};

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