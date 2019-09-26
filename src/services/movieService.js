import http from "./httpService";

const apiEndpoint = "/movies";
export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(id) {
  return http.delete(apiEndpoint+"/"+id);
}

export function getMovie(id) {
  return http.get(apiEndpoint+"/"+id);
}

export function saveMovie(movie) {
  const id = movie._id;
  if(id) {
    delete movie._id;
    return http.put(apiEndpoint+"/"+id, movie);
  }
  return http.post(apiEndpoint, movie);
}