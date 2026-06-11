export const getTotalPages = ({ limit, count }: { limit: number; count: number; }) => {
  const totalPages = Math.max(1, Math.ceil(count / limit));
  return totalPages
};

export const getPagination = ({ page = 1, limit = 10 }: { page?: number; limit?: number; }) => ({
  take: limit,
  skip: Math.max(0, page - 1) * limit,
});