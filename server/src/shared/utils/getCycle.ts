import dayjs from "dayjs";

export const getCycle = () => {
  const today = dayjs();
  const current28 = today.date(28);
  const from = today.date() >= 28
    ? current28
    : current28.subtract(1, "month");
  const to = from.add(1, "month");
  return {
    from: from.startOf("day").toDate(),
    to: to.startOf("day").toDate(),
  };
};