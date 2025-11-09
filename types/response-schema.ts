export interface ResponseSchema {
  statusCode: number
  message: string
  data: any
}

export type PaginatedData<T> = {
  data: T
  pagination: { 
    pageNumber: number
    pageSize: number
    perPage: number
    total: number
  }
}