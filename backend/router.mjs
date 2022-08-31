import express, { json } from 'express'
import createOrder from './createOrder.mjs'
import printLabel from './printLabel.mjs'
import estimate from './estimate.mjs'

var app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('web'));

app.post('/createOrder',async function (req, res) {
    const { url, authorization, data } = req.body
    var result=[]
    var resData = await createOrder(url, authorization, data)
    result.push(resData) 

    console.log('result',result)
    res.send(result)

})


app.post('/printLabel', function (req, res) {
    res.send('hello world')
    const { url, authorization, data } = req.body
    res.send(printLabel(url, authorization, body))
})

app.get('/estimate', function (req, res) {
    res.send('hello world')
    const { url, authorization, params } = req.query
    res.send(estimate(url, authorization, params))
})


app.listen(80)