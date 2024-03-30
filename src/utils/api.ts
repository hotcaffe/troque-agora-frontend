import axios from "axios";
import https from 'https'

const api = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: true,
        keepAlive: true
    }),
    baseURL: process.env.NEXT_PUBLIC_TA_API_URL,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    // }
})

export {api}