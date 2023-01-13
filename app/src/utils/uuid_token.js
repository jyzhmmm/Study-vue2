import { v4 as uuiddv4 } from 'uuid'
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        uuid_token = uuiddv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}