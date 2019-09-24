import axios from "axios";
import { toast } from 'react-toastify';
import logger from './logService';

// axios interceptors
axios.interceptors.response.use(null, error => {
  const isExpectedError = error.response && error.response.status >= 400
    && error.response.status < 5000;
  if(!isExpectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

// export Interface
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}