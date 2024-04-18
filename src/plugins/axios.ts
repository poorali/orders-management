/**
 * axios setup to use mock service
 */

import axios from "axios";
const useAxios  = (options: Object = {}, withToken: string | null  = null) => {
    if(withToken){
        options = {...options,...{headers: {Authorization: 'Bearer ' + withToken}}}
    }
    const service = axios.create({baseURL : import.meta.env.VITE_API_URL, ...options});
    service.interceptors.response.use(
        (response) => response,
        (error) =>
            Promise.reject((error.response && error.response.data) || "Wrong Services")
    );
    return {service}

}

export default useAxios