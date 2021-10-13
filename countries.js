import request from '@/utils/request'

export function getCountries(data) {
  return request({
    url: '/countries/all',
    method: 'post',
    data
  })
}

export function addNewCountry(data) {
  return request({
    url: '/countries/',
    method: 'post',
    data
  })
}

export function deleteCountry(data) {
  return request({
    url: '/countries/',
    method: 'delete',
    data
  })
}