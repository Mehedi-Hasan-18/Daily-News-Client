import axios from 'axios'

const authApiClient = axios.create({
    baseURL: "https://daily-news-kcck.vercel.app/api/v1",
});

export default authApiClient

authApiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("authToken")
        if(token){
            config.headers.Authorization = `JWT ${JSON.parse(token).access}`
        }
        return config
    },
    error => Promise.reject(error)
)