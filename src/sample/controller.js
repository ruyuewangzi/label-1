import utils from '../utils'

import view from './view'
import model from './model'

const controller = {
  unSeelctLabel: function(){
    model.activeShape = null
    var activeLabelImageEl = view.labelImagesWrapEl.querySelector('.labelImage.active')

    if(activeLabelImageEl){
      activeLabelImageEl.classList.remove('active')
    }
  },
  getSourceImg: function(cb){
    utils.getImageBySrc(model.labelInfo.imageData, function(img){
      model.labelInfo.imageWidth = img.width
      model.labelInfo.imageHeight = img.height
      cb && cb(img)
    })
  },
  startDraw: function(point){
    controller.unSeelctLabel()

    model.isDrawing = true

    model.currentLabel = {
      left: point.x,
      top: point.y,
      width: 0,
      height: 0,
      timestamp: new Date().valueOf(),
      points: [
        [point.x, point.y],
        [point.x, point.y]
      ],
      imageData: null,
    }

    model.labelInfo.shapes.push(model.currentLabel)

    controller.renderLabelCanvas()

    controller.renderCurrentLabelExplore(model.currentLabel)
  },
  addPoint: function(point){
    var currentLabelPoints = model.currentLabel.points
    if(currentLabelPoints.length == 2 && currentLabelPoints[0][0] == point.x && currentLabelPoints[0][1] == point.y){
      return
    }

    currentLabelPoints[currentLabelPoints.length - 1] = [point.x, point.y]

    model.currentLabel.points.push([point.x, point.y])

    controller.calcCurrentLabeldimension()

    controller.renderLabelCanvas()

    controller.renderCurrentLabelExplore(model.currentLabel)
  },
  calcCurrentLabeldimension: function(){
    if(!model.currentLabel) return

    var currentLabel = model.currentLabel,
        currentLabelPoints = currentLabel.points

    if(currentLabelPoints.length <= 3) return

    var xP = [], yP = []

    currentLabelPoints.map(function(point, index){
      xP.push(point[0])
      yP.push(point[1])
    })

    var left = currentLabel.left = Math.min.apply(null, xP),
        top = currentLabel.top = Math.min.apply(null, yP),
        width = view.cacheCanvasEl.width = currentLabel.width = Math.max.apply(null, xP) - left,
        height = view.cacheCanvasEl.height = currentLabel.height = Math.max.apply(null, yP) - top

    model.cacheCtx.clearRect(0, 0, width, height)
    var imageData = model.imgCtx.getImageData(left, top, width, height)
    model.cacheCtx.putImageData(imageData, 0, 0)
    currentLabel.imageData = view.cacheCanvasEl.toDataURL()
  },
  getMaskImageData: function(){
    return
    var canvas = view.cacheCanvasEl,
        ctx = model.cacheCtx,
        shapes = model.labelInfo.shapes,
        width = canvas.width = model.labelInfo.imageWidth,
        height = canvas.height = model.labelInfo.imageHeight

    ctx.save()
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, width, height)
    for(var i=0; i<shapes.length; i++){
      var shape = shapes[i]

      var hex = Number((i+1)*1000).toString(16),
          hexLength = hex.length

      if(hexLength <= 6){
        var diff = 6 - hexLength,
            diffStr = '#'

        for(var h=0; h<diff; h++){
          diffStr += '0'
        }
        hex = diffStr + hex
      }

      // console.log(hex)

      shape.maskColor = hex

      for(var k=0; k<shape.points.length; k++){
        var point = shape.points[k]
        ctx.fillStyle = shape.maskColor
        if(k == 0){
          ctx.beginPath()
          ctx.moveTo(point[0], point[1])
          continue
        }
        ctx.lineTo(point[0], point[1])
      }
      ctx.fill()
    }
    ctx.restore()

    var imageData = ctx.getImageData(0, 0, width, height),
        data = imageData.data,
        points = [],
        rowPoints = []

    for(var i=0; i<data.length; i+=4){
      var r = data[i],
          g = data[i+1],
          b = data[i+2],
          a = data[i+3],
          str = `${r}${g}${b}`

      points.push(str)
    }

    var rowIndex = -1
    for(var i=0; i<points.length; i++){
      if(i%width == 0){
        rowIndex++
        rowPoints[rowIndex] = []
      }
      rowPoints[rowIndex].push(points[i])
    }

    console.log(rowPoints)


    view.maskImgEl.src = canvas.toDataURL()
  },
  uploadData: function(){
    var shapes = model.labelInfo.shapes
    for(var i=0; i<shapes.length; i++){
      var shape = shapes[i]
      shape.label = i+''
    }

    console.log(shapes)

    let str = JSON.stringify(model.labelInfo)

    let fd = new FormData()
    fd.append('data', str)
    fd.append('imagePath', model.labelInfo.imagePath)


    utils.ajax('/api/writefile/label', fd, function(client){
      var res = client.response,
          filename = res.filename
    })

    controller.getMaskImageData()
  },
  stopDraw: function(){
    if(!model.isDrawing) return

    var currentLabel = model.currentLabel,
        currentLabelPoints = currentLabel.points

    if(currentLabelPoints.length <= 3){
      model.labelInfo.shapes.splice(model.labelInfo.shapes.indexOf(currentLabel), 1)
      var labelImageEl = view.labelImagesWrapEl.querySelector('#label_' + currentLabel.timestamp)
      if(labelImageEl){
        labelImageEl.parentNode.removeChild(labelImageEl)
      }
      controller.renderLabelCanvas()
    }else{
      currentLabelPoints.splice(currentLabelPoints.length-1, 1)
      controller.renderLabelCanvas()
      controller.uploadData()
    }

    model.currentLabel = null

    model.isDrawing = false
  },
  unDoDraw: function(){
    if(!model.isDrawing) return

    var labelPoints = model.currentLabel.points

    if(labelPoints.length <= 2) return

    labelPoints.splice(labelPoints.length-2, 1)

    controller.renderLabelCanvas()
  },
  renderImgCanvas: function(sourceImg){
    var ctx = model.imgCtx

    ctx.save()
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(sourceImg, 0, 0)
    ctx.restore()
  },
  renderAllLabelExplore: function(){
    var html = ''
    model.labelInfo.shapes.forEach(function(label, index){
      html += '<div data-feat="selectLabel" data-label-timestamp="'+label.timestamp+'" class="labelImage" id="label_'+label.timestamp+'"><div class="label-img-wrap"><img src="'+label.imageData+'"/></div><div class="label-name" data-feat="showInput"><span>'+(label.name || '未命名')+'</span></div><div data-feat="deleteLabel" class="delete-label"><svg width="14" height="14" viewBox="0 0 20 20"><path fill="#000000" d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path><path fill="#000000" d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path></svg></div></div>'
    })
    view.labelImagesWrapEl.innerHTML = html
  },
  renderCurrentLabelExplore: function(label){
    if(!label) return

    var targetImgWrapEl = view.labelImagesWrapEl.querySelector('#label_'+label.timestamp)
    if(!targetImgWrapEl){
      targetImgWrapEl = document.createElement('div')
      targetImgWrapEl.setAttribute('data-feat','selectLabel')
      targetImgWrapEl.setAttribute('data-label-timestamp',label.timestamp)
      targetImgWrapEl.classList.add('labelImage')
      targetImgWrapEl.setAttribute('id', 'label_' + label.timestamp)
      targetImgWrapEl.innerHTML = '<div class="label-img-wrap"></div><div data-feat="showInput" class="label-name"><span>'+(label.name || '未命名')+'</span></div><div data-feat="deleteLabel" class="delete-label"><svg width="14" height="14" viewBox="0 0 20 20"><path fill="#000000" d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path><path fill="#000000" d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path></svg></div>'
      view.labelImagesWrapEl.appendChild(targetImgWrapEl)
    }

    if(!label.imageData) return

    utils.getImageBySrc(label.imageData, function(imageEl){
      var canvas = view.cacheCanvasEl,
          ctx = model.cacheCtx,
          points = label.points

      ctx.save()
      canvas.width = label.width
      canvas.height = label.height
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      for(var i=0; i<points.length; i++){
        var point = points[i],
            x = point[0]-label.left,
            y = point[1]-label.top

        if(i == 0){
          ctx.moveTo(x, y)
          continue
        }
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(imageEl, 0, 0)
      ctx.restore()

      var dataURL = canvas.toDataURL(),
          imageEl = targetImgWrapEl.querySelector('.label-img-wrap').querySelector('img')

      if(!imageEl){
        imageEl = targetImgWrapEl.querySelector('.label-img-wrap').innerHTML = '<img src="'+ dataURL +'"/>'
      }else{
        targetImgWrapEl.querySelector('img').src = dataURL
      }

      label.imageData = dataURL
    })
  },
  renderLabelCanvas: function(){
    var ctx = model.labelCtx

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.fillStyle = 'hsla(60, 100%, 50%, .1)'
    ctx.strokeStyle = 'hsla(60, 100%, 50%, 1)'

    var shapes = model.labelInfo.shapes
    for(var i=0; i<shapes.length; i++){
      var label = shapes[i]

      ctx.save()

      if(model.activeShape && model.activeShape === label){
        ctx.lineWidth = 2
        ctx.strokeStyle = 'hsla(0, 100%, 60%, 1)'
        ctx.fillStyle = 'hsla(0, 100%, 50%, .2)'
      }

      var points = label.points

      ctx.beginPath()
      for(var k=0; k<points.length; k++){
        var point = points[k]
        if(k == 0){
          ctx.moveTo(point[0], point[1])
        }else{
          ctx.lineTo(point[0], point[1])
        }
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }
    ctx.restore()
  },
  resetAllCanvasSize: function(canvasEl){
    var width = model.labelInfo.imageWidth,
        height = model.labelInfo.imageHeight

    var imgCanvasEl = view.imgCanvasEl,
        labelCanvasEl = view.labelCanvasEl,
        canvasWrapEl = view.canvasWrapEl,
        magnifierCanvasEl = view.magnifierCanvasEl

    imgCanvasEl.width = magnifierCanvasEl.width = labelCanvasEl.width = width
    imgCanvasEl.height = magnifierCanvasEl.height = labelCanvasEl.height = height

    imgCanvasEl.style.width = magnifierCanvasEl.style.width = canvasWrapEl.style.width = labelCanvasEl.style.width = width + 'px'
    imgCanvasEl.style.height = magnifierCanvasEl.style.height = canvasWrapEl.style.height = labelCanvasEl.style.height = height + 'px'
  },
  clearAllCanvas: function(){
    model.imgCtx.clearRect(0, 0, view.imgCanvasEl.width, view.imgCanvasEl.height)
    model.labelCtx.clearRect(0, 0, view.labelCanvasEl.height, view.labelCanvasEl.height)
  },
  initData: function(cb){
    view.labelImagesWrapEl.innerHTML = ''

    utils.readLabelFile(model.labelInfo.baseName+'.json', function(res){
      if(res.data){
        model.labelInfo = JSON.parse(res.data)
        model.labelInfo.baseName = res.filename.split('.')[0]
        controller.getSourceImg(function(sourceImg){
          cb && cb(sourceImg)
        })
      }else{
        utils.readSourceFile(model.labelInfo.baseName+'.jpg', function(res){
          if(!res.data) return

          model.labelInfo.imageData = 'data:image/jpeg;base64,'+res.data
          controller.getSourceImg(function(sourceImg){
            model.labelInfo.shapes = []
            cb && cb(sourceImg)
          })
        })
      }

    })
  },
  initView: function(){
    controller.initData(function(sourceImg){
      controller.resetAllCanvasSize()

      controller.clearAllCanvas()
      controller.renderImgCanvas(sourceImg)
      controller.renderLabelCanvas()
      controller.renderAllLabelExplore()

      controller.getMaskImageData()

      view.canvasWrapEl.classList.add('show')
    })
  }
}
export default controller