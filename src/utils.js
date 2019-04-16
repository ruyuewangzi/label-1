const utils = {
  ajax: function(url, data, cb){
    var client = new XMLHttpRequest()
    client.responseType = 'json'
    client.onreadystatechange = function(){
      if(client.status == 200 && client.readyState == 4){
        cb && cb(client)
      }
    }
    data ? client.open('POST', url, true) : client.open('GET', url, true)
    client.send(data)
  },
  getImageBySrc: function(src, cb){
    var img = new Image()
    img.src = src
    img.onload = function(){
      cb && cb(this)
    }
  },
  readFile: function(which, filename, cb){
    which = which || ''
    filename = filename || ''

    utils.ajax('/api/readfile/' + which + '/' + filename, null, function(client){
      cb && cb(client.response)
    })
  },
  readLabelFile: function(filename, cb){
    utils.readFile('label',  filename, function(res){
      cb && cb(res)
    })
  },
  readSourceFile: function(filename, cb){
    utils.readFile('source',  filename, function(res){
      cb && cb(res)
    })
  },

  readdir: function(which, cb){
    if(which != 'source' && which != 'label'){
     cb && cb(null)
     return
    }
    utils.ajax('/api/readdir/' + which, null, function(client){
      cb && cb(client.response)
    })
  },
}

export default utils