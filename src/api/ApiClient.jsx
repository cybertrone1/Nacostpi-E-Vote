import axios from "axios";

const BASE_URL = "https://nacos-voting-api.onrender.com/api";

const apiClient = {

    //api to login 
    LoginApi: async (level, nacosId, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {level, nacosId, password}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            return response
        } catch (error) {
            console.error('Failed to login', {
                message: error.message,
                code: error.code,
                config: error.config,
                request: error.request,
                response: error.response,
            });

            return error.response;
        }
    },
     
    //api to fetch list of candidates
    CandidateApi: async () => {
        try {
            
            const response = await axios.get(`${BASE_URL}/dashboard`);
            console.log(response);
            return response;

        } catch (error) {
            console.error('Failed fetch candidate details', {
                message: error.message,
                code: error.code,
                config: error.config,
                request: error.request,
                response: error.response,
            });

            return error.response;
        }
    },

    //voteing api
    VoteApi: async ({nacosId, votes}) => {
        try {
            const response = await axios.post(`${BASE_URL}/vote`, {nacosId, votes}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response;
        } catch (error) {
            console.error('Failed to cast vote', {
                message: error.message,
                code: error.code,
                config: error.config,
                request: error.request,
                response: error.response,
            });

            return error.response;
        }
    }
}

export default apiClient;