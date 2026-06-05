export const getPaginationParams = ({
  limit,
  page,
  count,
}: {
  limit: number;
  page: number;
  count: number;
}) => {
  const totalPages = Math.max(1, Math.ceil(count / limit));
  const safePage = Math.max(1, page);

  return { totalPages, safePage };
};
