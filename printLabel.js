import fetch from "node-fetch";


export default async function printLabel(address, token, numbers) {
  var body = {
    "Numbers": number,
    "NumberType": 1
  }
  const res = await fetch('https://gapi.yunexpressusa.com/api/Label/Print', {
    method: 'post',
    headers: {
      Authorization: 'Basic' + token,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(body)
  })

  return res
}
