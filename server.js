const express = require('express'),
			http = require('http'),
			https = require('https'),
			path = require('path'),
			app = express(),
			server = http.createServer(app).listen(8080)


app.use(express.static(path.resolve(__dirname, 'www')))
