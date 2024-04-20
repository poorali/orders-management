import {defineStore} from 'pinia';
import router from '@/plugins/router';
import useAxios from "@/plugins/axios";
import {lang} from "@/locales/messages";
import type {EndpointResponseType} from "@/types/ServiceTypes";
const {service} = useAxios();

const baseUrl = '/auth';
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        token: localStorage.getItem('token'),
        returnUrl: null,
    }),
    actions: {
        async login(email: String, password: String) {
            const {data}: { data: EndpointResponseType & {token? : string} } = await service.post(
                `${baseUrl}/login`,
                {email, password}
            );
            if (data.status === 'error') {
                throw data.errors
            }
            if (!data.token) {
                throw {general: lang('NotHandledException')}
            }

            this.token = data.token;
            if(this.token){
                localStorage.setItem('token', this.token.toString())
            }
            router.push(this.returnUrl || {name: 'Orders'})
        },
        logout() {
            this.token = null;
            localStorage.removeItem('token');
            router.push({name: 'SignIn'});
        },
    }
});
