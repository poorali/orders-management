import type {PaginateType} from "@/types/ServiceTypes";
export const generateRowNumber = (paginate: PaginateType, index: number) => {
    return (index+1) + (paginate.currentPage - 1) * paginate.perPage
}