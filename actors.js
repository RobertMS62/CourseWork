import request from '@/utils/request'

export function getActors(data) {
  return request({
    url: '/actors/all',
    method: 'post',
    data
  })
}

export function addNewActor(data) {
  return request({
    url: '/actors/',
    method: 'post',
    data
  })
}


export function deleteActor(data) {
  return request({
    url: '/actors/',
    method: 'delete',
    data
  })
}