import axios from 'axios'
import address from './address.js'

let baseURL = 'http://10.1.60.43:8008/api'
const request = axios.create({
  baseURL: baseURL
})

export default {
  seller: (params) => request.get(address.seller, {params: {id: params}}),
  goods: (params) => request.get(address.goods, {params: {id: params}}),
  ratings: (params) => request.get(address.ratings, {params: {id: params}})
}
