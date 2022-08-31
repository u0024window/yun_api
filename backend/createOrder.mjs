import axios from "axios"

export default async function createOrder(url, authorization, body) {
    try {
        const res = await axios({
            method: 'post',
            url,
            data: body,
            headers: {
                Authorization: authorization,
                'Content-Type': 'application/json;charset=UTF-8'
            },

        });
        return res.data
    } catch {
        return {
            message: 'error',
        }
    }

}
