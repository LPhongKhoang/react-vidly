import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl+"/genres";
export function getGenres() {
  return http.get(apiEndPoint);
}
