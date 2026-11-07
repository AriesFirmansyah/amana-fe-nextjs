interface BasePagination {
  meta: {
    currentPage: number;
    perPage: number;
    totalItem: number;
    totalPage: number;
  };
}

interface BaseResponse<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

interface BasePaginationResponse {
  page: number;
  total_data: number;
  total_page: number;
}
