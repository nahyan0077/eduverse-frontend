// import axios from 'axios'

// // export const BASE_URL = "https://drop-ship.shop"
// // export const BASE_URL = "http://localhost:2001"
// export const BASE_URL = "https://eduverse-api.onrender.com"

// export const CLIENT_API = axios.create({
//     baseURL : BASE_URL
// })

import axios from 'axios'

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

export const BASE_URL = isDevelopment 
  ? "http://localhost:2001"
  : "https://eduverse-api.onrender.com"

  console.log(BASE_URL,"hee");
  

export const CLIENT_API = axios.create({
    baseURL: BASE_URL
})