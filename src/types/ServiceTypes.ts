type EndpointResponseType = {
    status: string;
    message?: string;
    errors: object;
}

type EndpointResponsePaginateType = EndpointResponseType & { paginate: PaginateType }

type PaginateType = {
    currentPage: number,
    lastPage: number,
    perPage: number
}
export type {EndpointResponseType, EndpointResponsePaginateType, PaginateType}