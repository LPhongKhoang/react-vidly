import axios from "axios";
import { toast } from 'react-toastify';
import logger from './logService';


// axios config defaults base api_url
axios.defaults.baseURL=process.env.REACT_APP_API_URL

// axios interceptors
axios.interceptors.response.use(null, error => {
  const isExpectedError = error.response && error.response.status >= 400
    && error.response.status < 500;
  if(!isExpectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

function setTokenToHeaders(jwt) {
  // set x-auth-token in headers of all http request
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

// export Interface
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setTokenToHeaders
}