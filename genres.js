import request from '@/utils/request'

export function getGenres(data) {
  return request({
    url: '/genres/all',
    method: 'post',
    data
  })
}

export function addNewGenre(data) {
  return request({
    url: '/genres/',
    method: 'post',
    data
  })
}

export function deleteGenre(data) {
  return request({
    url: '/genres/',
    method: 'delete',
    data
  })
}