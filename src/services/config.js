import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://unidac.herokuapp.com/api'
})