import jwt, { sign } from 'jsonwebtoken'
import parseJwt from 'express-jwt'

const key='CTgX7ZUMOxhcT6Ei'

app.use(
    parseJwt({
        secret: key,
        algorithms: ['HS256'], 
    })
      .unless({ path: ['/login'] })
)

export function sign(username,password,key){
    const token = jwt.sign(
        { user: { name: username, password: password } },
        key,
        { expiresIn: '3h' }
      )
    return token
}


