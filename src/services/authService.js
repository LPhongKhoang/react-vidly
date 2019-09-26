import http from "./httpService";
import jwtDecode from 'jwt-decode';

const apiEndpoint = "/auth";
const tokenKey = "token";

// append jwt to headers of all later request
// because, when we login or register, we reload whole page
// so, the <Layout> is re-render (reload), 
// "authService" is loaded --> "httpService" is loaded --> "axios" lib is loaded --> "axios" header is append with token

http.setTokenToHeaders(getJwt());

export async function login(email, password) {
  const { data } = await http.post(apiEndpoint, {email, password});
  loginWithJwt(data.token);
}

export function loginWithJwt(jwt) {
  // save jwt in localStorage
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  // clear localStorage
  localStorage.clear();
}

export function getCurrentUser() {
  try{
    // read user info from token in localStorage
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  }catch(ex){
    return null;
  }
}