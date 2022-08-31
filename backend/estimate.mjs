import axios from "axios"

export default async function estimate(url, authorization, params) {
    try {
        const res = await axios({
            method: 'get',
            url,
            params: params,
            headers:{
                Authorization: authorization,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
        return {
            message: 'success',
            data: res,
        }
    } catch {
        return {
            message: 'error',
            data: res,
        }
    }

}
