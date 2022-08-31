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
    for(var i=0;i<data.length;i++){
        var res = await createOrder(url, authorization, it.data[i])
        console.log(res)
        result.push(res) 
    }
  
    console.log('result',result)
    res.send(result)

})


app.post('/printLabel', function (req, res) {
    res.send('hello world')
    const { url, authorization, body } = req.body
    res.send(printLabel(url, authorization, body))
})

app.get('/estimate', function (req, res) {
    res.send('hello world')
    const { url, authorization, params } = req.query
    res.send(estimate(url, authorization, params))
})


app.listen(80)