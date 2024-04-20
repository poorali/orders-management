/**
 * axios setup to use mock service
 */

import axios from "axios";
import router from "@/plugins/router";
const useAxios  = (options: Object = {}, withToken: string | null  = null) => {
    if(withToken){
        options = {...options,...{headers: {Authorization: withToken}}}
    }
    const service = axios.create({baseURL : import.meta.env.VITE_API_URL, ...options});
    service.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.response && (error.response.status  === 401 || error.response.status === 403)){
                localStorage.removeItem('token')
                router.push({name: 'SignIn'})
            }
            return Promise.reject((error.response && error.response.data) || "Wrong Services")
        }
    );
    return {service}

}

export default useAxios