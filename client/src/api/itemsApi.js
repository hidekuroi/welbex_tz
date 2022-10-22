import { $host } from "./index"


export const getItems = async (page = 1, limit = 10, key, condition, value) => {
    
    if(key && condition && value) {
        const response = await $host.get(`/?page=${page}&${limit}&key=${key}&condition=${condition}&value=${value}`)
        return(response.data)
    }
    else {
        const response = await $host.get(`/?page=${page}&limit=${limit}`)
        return(response.data)
    }

}