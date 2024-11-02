import axios from 'axios';


export default function apiClient(){
    const baseURL = 'http://192.168.0.8:8000'
    let token = localStorage.getItem("token");
    let refresh = localStorage.getItem("refreshToken");


    let apiClient = axios.create({
        baseURL: baseURL, 
        headers: {Authorization: `Bearer ${token}`}
    });

    let verifyClient = axios.create({
        baseURL: baseURL
    });

    let refreshClient = axios.create({
        baseURL: baseURL
    });

    
    apiClient.interceptors.request.use( 
        async request => {
            let verifyResponse = await verifyClient.post('/api/auth/verify/', {
                token: token
            });
            if (verifyResponse.statusText == "REFRESHED"){
                request.headers.Authorization =  `Bearer ${verifyResponse.token}`;
            }            
            return request; 
        }
    );

    verifyClient.interceptors.response.use( 
        undefined,
         
        async (error) => {
            if (error.response.status == 401){
                let refreshResponse = await refreshClient.post('/api/auth/refresh/', {
                    refresh: refresh
                })
                let { access } = refreshResponse.data; 
                localStorage.setItem("token", access);
                return {
                    statusText:"REFRESHED", 
                    token: access,
                };
            }
            return Promise.reject(error)
        }
    );

    refreshClient.interceptors.response.use(
        undefined, 

        (error) => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.dispatchEvent(new Event('remove-tokens'));
            return Promise.reject(error)
        }
    );


    return apiClient;

};