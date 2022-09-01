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

    res.send(result)

})


app.post('/printLabel',async function (req, res) {
    const { url, authorization, data } = req.body
    var result= await printLabel(url, authorization, data)
    res.send(result)
})

app.get('/estimate', function (req, res) {
    const { url, authorization, params } = req.query
    res.send(estimate(url, authorization, params))
})


app.listen(8090)
