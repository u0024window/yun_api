import express, { json } from 'express'
import createOrder from './createOrder.mjs'
import printLabel from './printLabel.mjs'
import rateQuery from './rateQuery.mjs'
import tracking from './tracking.mjs'
var app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('web'));

app.post('/createOrder', async function (req, res) {
    try {
        const { url, authorization, data } = req.body
        var result = []
        while (data.length > 0) {
            var params
            if (data.length > 30) {
                params = data.splice(0, 30)
            }else{
                params = data.splice(0, data.length)
            }
            console.log(params)
            var resData = await createOrder(url, authorization, params)
            console.log('resData',resData)
            
            result.push(resData)
        }
        res.send({
            code: 0,
            result: result
        })
    } catch {
        res.send({
            code: 1,
            message: 'error'
        })
    }
})


app.post('/printLabel', async function (req, res) {
    try {
        const { url, authorization, data } = req.body
        var result = await printLabel(url, authorization, data)
        res.send({
            code: 0,
            result: result
        })
    } catch {
        res.send({
            code: 1,
            message: 'error'
        })
    }
})

app.post('/rateQuery', async function (req, res) {
    var rateRes = []
    try {
        const { url, authorization, query } = req.body
        for (var i = 0; i < query.length; i++) {
            var result = await rateQuery(url, authorization, query[i])
            rateRes.push(result)
        }
        var isSuccess = rateRes.map(it =>{
            if (it == '0000'){
                return 'success'
            }
        }
        )
        res.send({
            result: isSuccess,
            code: 0
        })
    } catch {
        res.send({
            message: 'error'
        })
    }
})

app.post('/tracking', async function (req, res) {
    var trankingres = []
    try {
        const { url, authorization, query } = req.body
        for (var i = 0; i < query.length; i++) {
            var result = await tracking(url, authorization, query[i])
            trankingres.push(result)
        }
        var isSuccess = trankingres.map(it => {
            if (it == '0000') {
                return 'success'
            }
        }
        )
        res.send({
            result: isSuccess,
            code: 0
        })
    } catch {
        res.send({
            message: 'error'
        })
    }
})

app.post('/login', (req, res) => {
    try {
        const { user, password } = req.body
        if (user == 'admin' && password == '8aW6ulnWBODgACm6') {
            res.send({
                code: 0,
                message: 'success'
            })
        }
        verfiy(user, password)
    } catch {
        res.send({
            code: 1,
            message: 'error'
        })
    }
})





app.listen(8080, () => {
    console.log('listen on 8080')
})
