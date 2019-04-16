const express = require('express'),
			http = require('http'),
			path = require('path')

const api = require('./api'),
			config = require('./config')

console.log(config)

const app = express()
const server = http.createServer(app).listen(config.PORT || 80)


app.set('views', path.resolve(__dirname, 'templates'))
app.set('view engine', 'pug')

app.get('/$', (req, res)=>{
  res.render('sample', {

  })
})

app.use('/api', api)
app.use(express.static(path.resolve(__dirname, 'www')))
