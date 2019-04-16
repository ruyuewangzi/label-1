const fs = require('fs'),
			multer = require('multer'),
			jsonfile = require('jsonfile'),
			path = require('path')

const api = require('express').Router()

const currentSample = '2019-02-21'

api.get('/readdir/:which', (req, res) => {
	const which = req.params.which

	if(which != 'source' && which != 'label'){
		res.status(404).end()
		return
	}

	let	url = path.resolve(__dirname, 'sample', currentSample, which)

	fs.readdir(url, (e, r)=>{
		if(e){
			res.status(500).end()
			return
		}
		r = r.filter(function(filename){
			if(filename.search(/.DS_Store/g) !== -1) return false
			return true
		})
		res.json({
			data: r,
			sample: currentSample,
			which: which
		})
	})
})

api.get('/readfile/:which/:filename', (req, res) => {
	const which = req.params.which || '',
				filename = req.params.filename || ''

	if(which != 'source' && which != 'label'){
		res.status(404).end()
		return
	}

	let	url = path.resolve(__dirname, 'sample', currentSample, which, filename),
			options = {
				encoding: which == 'source' ? 'base64' : 'utf8'
			}

	fs.readFile(url, options, (e, r)=>{
		if(e){
			res.json({
				data: null,
				sample: currentSample,
				which: which,
				filename: filename,
			})
			return
		}
		res.json({
			data: r,
			sample: currentSample,
			which: which,
			filename: filename,
		})
	})
})

api.post('/writefile/label', multer().array(), (req, res) => {
	let filename = req.body.imagePath.split('.')[0] + '.json',
			url = path.resolve(__dirname, 'sample', currentSample, 'label', filename)

	jsonfile.writeFile(url, JSON.parse(req.body.data), { spaces: 2 }, function (e) {
		if(e){
			res.status(500).end()
			console.log(e)
			return
		}
		res.json({
			filename: filename
		})
	})
})


module.exports = api