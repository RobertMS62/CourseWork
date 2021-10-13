import request from '@/utils/request'

export function getDirectors(data) {
  return request({
    url: '/directors/all',
    method: 'post',
    data
  })
}

export function addNewDirector(data) {
  return request({
    url: '/directors/',
    method: 'post',
    data
  })
}

export function deleteDirector(data) {
  return request({
    url: '/directors/',
    method: 'delete',
    data
  })
}