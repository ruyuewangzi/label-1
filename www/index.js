var app = {}

app.model = {
  imgCtx: null,
  labelCtx: null,

  sourceImgSize: null,

  currentLabel: null,
  label: [
    // {
    //   points: [
    //     [100, 100],
    //     [200, 100],
    //     [200, 200],
    //   ]
    // }
  ],

  isDrawing: false,
  isMouseDown: false,
}

app.view = {
  appEl: document.querySelector('#app'),
  sourceImgEl: document.querySelector('#sourceImg'),

  imgCanvasEl: document.querySelector('#imgCanvas'),
  labelCanvasEl: document.querySelector('#labelCanvas'),

  canvasWrap: document.querySelector('#canvasWrap'),
}

app.utils = {
  getSourceImgSize: function(cb){
    var view = app.view,
        model = app.model

    var img = new Image()
    img.src = view.sourceImgEl.src
    img.onload = function(){
      model.sourceImgSize = {
        width: this.width,
        height: this.height
      }
      cb(model.sourceImgSize)
    }
  },
  setBgImg: function(){

  },
}

app.controller = {
  eventHandler: {
    onMouseDown: function(e){
      var point = { x: e.offsetX, y: e.offsetY }

      app.model.isMouseDown = true

      if(!app.model.isDrawing){
        app.controller.startDraw(point)
      }else{
        app.controller.addPoint(point)
      }
    },
    onMouseMove: function(e){
      var point = { x: e.offsetX, y: e.offsetY }

      if(app.model.isDrawing){
        var labelPoints = app.model.currentLabel.points
        labelPoints[labelPoints.length-1] = [point.x, point.y]

        app.controller.renderLabelCanvas()
      }
    },
    onMouseUp: function(e){
      app.model.isMouseDown = true
    },
    onKeyDown: function(e){
      var currKey = e.keyCode || e.which || e.charCode

      if(currKey == 81){
        // key -> q
        e.preventDefault()
        app.controller.stopDraw()
      }

      if(e.ctrlKey || e.metaKey && currKey == 90){
        // key -> ctrl + z
        e.preventDefault()
        app.controller.unDoDraw()
      }
    }
  },
  startDraw: function(point){
    app.model.isDrawing = true

    app.model.currentLabel = {
      points: [
        [point.x, point.y],
        [point.x, point.y]
      ],
      label: 1
    }

    app.model.label.push(app.model.currentLabel)

    app.controller.renderLabelCanvas()
  },
  addPoint: function(point){
    var labelPoints = app.model.currentLabel.points

    labelPoints[labelPoints.length - 1] = [point.x, point.y]

    app.model.currentLabel.points.push([point.x, point.y])
    app.controller.renderLabelCanvas()
  },
  stopDraw: function(){
    app.model.isDrawing = false
    var labelPoints = app.model.currentLabel.points
    if(labelPoints.length <= 3){
      app.model.label.splice(app.model.currentLabel, 1)
      app.controller.renderLabelCanvas()
    }else{
      labelPoints.splice(labelPoints.length-1, 1)
      app.controller.renderLabelCanvas()
    }
    app.model.currentLabel = null

    app.controller.consoleLabel()
  },
  unDoDraw: function(){
    if(!app.model.isDrawing) return
    var labelPoints = app.model.currentLabel.points
    if(labelPoints.length <= 1) return
    labelPoints.splice(labelPoints.length-2, 1)
    app.controller.renderLabelCanvas()
  },
  renderImgCanvas: function(){
    var model = app.model,
        view = app.view,
        ctx = model.imgCtx

    ctx.save()
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(view.sourceImgEl, 0, 0)
    ctx.restore()
  },
  consoleLabel: function(){
    console.log(app.model.label)
  },
  renderLabelCanvas: function(){
    var model = app.model,
        ctx = model.labelCtx

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()
    ctx.fillStyle = 'hsla(0, 100%, 50%, .1)'
    ctx.strokeStyle = 'hsla(0, 100%, 50%, .5)'
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
    model.label.map(function(label, id){
      var points = label.points
      ctx.beginPath()
      for(var i=0; i<points.length; i++){
        var point = points[i]
        if(i == 0){
          ctx.moveTo(point[0], point[1])
        }else{
          ctx.lineTo(point[0], point[1])
        }
      }
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
    })
    ctx.restore()


  },
  init: function(cb){
    var utils = app.utils,
        view = app.view,
        model = app.model,
        controller = app.controller

    utils.getSourceImgSize(function(size){
      view.imgCanvasEl.width = view.labelCanvasEl.width = size.width
      view.imgCanvasEl.height = view.labelCanvasEl.height = size.height

      view.imgCanvasEl.style.width = view.labelCanvasEl.style.width = view.canvasWrap.style.width = size.width + 'px'
      view.imgCanvasEl.style.height = view.labelCanvasEl.style.height = view.canvasWrap.style.height = size.height + 'px'

      view.labelCanvasEl.addEventListener('mousedown', controller.eventHandler.onMouseDown)
      view.labelCanvasEl.addEventListener('mousemove', controller.eventHandler.onMouseMove)
      view.labelCanvasEl.addEventListener('mouseup', controller.eventHandler.onMouseUp)

      window.addEventListener('keydown', controller.eventHandler.onKeyDown)

      model.imgCtx = view.imgCanvasEl.getContext('2d')
      model.labelCtx = view.labelCanvasEl.getContext('2d')

      controller.renderImgCanvas()

      view.appEl.classList.add('show')

      cb()
    })
  }
}


app.controller.init(function(){

})
