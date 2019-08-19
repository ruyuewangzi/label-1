export let ajax = (url, data, cb) => {
  let client = new XMLHttpRequest()
  client.responseType = 'json'
  client.onreadystatechange = function(){
    if(client.status == 200 && client.readyState == 4){
      cb && cb(client)
    }
  }
  data ? client.open('POST', url, true) : client.open('GET', url, true)
  client.send(data)
};

export let getImageBySrc = (src, cb) => {
  var img = new Image()
  img.src = src
  img.onload = function(){
    cb && cb(this)
  }
};

export let readFile = (which, filename, cb) => {
  which = which || ''
  filename = filename || ''

  ajax('/api/readfile/' + which + '/' + filename, null, function(client){
    cb && cb(client.response)
  })
};

export let readLabelFile = (filename, cb) => {
  readFile('label',  filename, function(res){
    cb && cb(res)
  })
};

export let readSourceFile = (filename, cb) => {
  readFile('source',  filename, function(res){
    cb && cb(res)
  })
};

export let readdir = (which, cb) => {
  if(which != 'source' && which != 'label'){
   cb && cb(null)
   return
  }
  ajax('/api/readdir/' + which, null, function(client){
    cb && cb(client.response)
  })
};
