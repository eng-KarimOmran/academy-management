import { type AxiosError } from "axios";

// ==========================================
// Base API Response
// ==========================================

export interface BaseResponse {
  message: string;
  success: boolean;
  statusCode: number;
}

// ==========================================
// Axios Error Type
// ==========================================

export type ErrorAxios = AxiosError<BaseResponse>;

// ==========================================
// Successful Response
// ==========================================

export type SuccessfulResponse<T> = BaseResponse & {
  data: T;
};

// ==========================================
// Pagination Meta
// ==========================================

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==========================================
// Paginated Response
// ==========================================

export interface PaginatedResponse<T> extends BaseResponse {
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
}