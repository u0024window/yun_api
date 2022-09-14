import axios from "axios"

export default async function printLabel(url, authorization, body) {
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
    console.log(res.data['Item'])
    return res.data['Item'] || []
  } catch {
    return {
      message: 'error',
      data: res.data
    }
  }

}
