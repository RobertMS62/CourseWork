import request from '@/utils/request'

export function getCollectionsMovie(data) {
  return request({
    url: '/collectionsMovie/all',
    method: 'post',
    data
  })
}

export function addNewCollectionsMovie(data) {
  return request({
    url: '/collectionsMovie/',
    method: 'post',
    data
  })
}


export function deleteCollectionsMovie(data) {
  return request({
    url: '/collectionsMovie/',
    method: 'delete',
    data
  })
}