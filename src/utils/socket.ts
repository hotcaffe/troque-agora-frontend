import { io } from "socket.io-client";

const socket = io(String(process.env.NEXT_PUBLIC_TA_API_URL), {transports: ['websocket'], autoConnect: false, withCredentials: true});

// socket.onAny((event, ...args) => {
//     console.log('Socket event: ', event, args)
// })

socket.on('connect_error', (err) => {
    console.log('Socket error: ', err) 
})

socket.on('REVOKE_SESSION', () => {
    console.log('REVOKE_SESSION WS')
})

export default socket;