import axios from 'axios'

export const $host = axios.create({
    baseURL: 'http://62.113.100.105:8081/api'
})
