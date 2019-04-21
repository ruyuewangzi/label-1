const express = require('express'),
			http = require('http'),
			path = require('path')

const api = require('./api')


const app = express()
const server = http.createServer(app).listen(80)


app.set('views', path.resolve(__dirname, 'templates'))
app.set('view engine', 'pug')

app.get('/$', (req, res)=>{
  res.render('sample', {

  })
})

app.use('/api', api)
app.use(express.static(path.resolve(__dirname, 'www')))
