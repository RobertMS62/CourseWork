import request from '@/utils/request'

export function getMovies(data) {
  return request({
    url: '/movies/all',
    method: 'post',
    data
  })
}

export function getMoviesByDirectorOrActor(data) {
  return request({
    url: '/movies/director-or-actor',
    method: 'post',
    data
  })
}

export function addNewMovie(data) {
  return request({
    url: '/movies/',
    method: 'post',
    data
  })
}


export function deleteMovie(data) {
  return request({
    url: '/movies/',
    method: 'delete',
    data
  })
}