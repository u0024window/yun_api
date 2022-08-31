import express from 'express'
import createOrder from './createOrder'
import printLabel from './printLabel'
import estimate from './estimate'

var app = express()

express.static('/web')


app.post('/createOrder', function (req, res) {
    res.send('hello world')
    const { url, authorization, body } = req.body
    return createOrder(url, authorization, body)
})


app.post('/printLabel', function (req, res) {
    res.send('hello world')
    const { url, authorization, body } = req.body
    return printLabel(url, authorization, body)
})

app.get('/estimate', function (req, res) {
    res.send('hello world')
    const { url, authorization, params } = req.query
    return estimate(url, authorization, params)
})


app.listen(80)