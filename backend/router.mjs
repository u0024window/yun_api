import express, { json } from 'express'
import createOrder from './createOrder.mjs'
import printLabel from './printLabel.mjs'
import rateQuery from './rateQuery.mjs'

var app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('web'));

app.post('/createOrder', async function (req, res) {
    try {
        const { url, authorization, data } = req.body
        var result = []
        var resData = await createOrder(url, authorization, data)
        result.push(resData)
        res.send({
            code:0,
            result: result
        })
    } catch {
        res.send({
            code:1,
            message: 'error'
        })
    }
})


app.post('/printLabel', async function (req, res) {
    try {
        const { url, authorization, data } = req.body
        var result = await printLabel(url, authorization, data)
        res.send({
            code:0,
            result:result
        })
    } catch {
        res.send({
            code:1,
            message: 'error'
        })
    }
})

app.post('/rateQuery',async function (req, res) {
    var rateRes=[]
    try {
        const { url, authorization, query } = req.body
        for (var i = 0; i <query.length;i++){
            var result = await rateQuery(url, authorization, query[i])
            rateRes.push(result)
        }
        var isSuccess = rateRes.every(it=>it=='0000')
        res.send({
            result: rateRes,
            code:0
        })
    } catch {
        res.send({
            message: 'error'
        })
    }
})


app.listen(80)
