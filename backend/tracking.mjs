import axios from "axios"

export default async function tracking(url, authorization, params) {
    try {
        const res = await axios({
            method: 'get',
            url,
            params: {
                OrderNumber: params
            },
            headers:{
                Authorization: authorization,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
        return res.data.Code
    } catch {
        return {
            message: 'error',
            data: res.data
        }
    }

}
