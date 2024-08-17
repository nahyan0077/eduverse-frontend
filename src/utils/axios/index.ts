import axios from 'axios'

// export const BASE_URL = "https://drop-ship.shop"
export const BASE_URL = "http://localhost:2001"
// export const BASE_URL = "https://eduverse-api.onrender.com"

export const CLIENT_API = axios.create({
    baseURL : BASE_URL
})