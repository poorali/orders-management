import type {PaginateType} from "@/types/ServiceTypes";

export type ConfigProps = {
    defaultPaginate: PaginateType;
};

const config: ConfigProps = {
    defaultPaginate: {currentPage:1, lastPage: 1, perPage: 10}
};

export default config;
