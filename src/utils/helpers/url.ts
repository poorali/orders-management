import router from "@/plugins/router";

export const push = (routeName: string,data: object) => {

    router.push({name: routeName, query: {...data}})
}