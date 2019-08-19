import view from "./view"
import model from "./model"
import controller from "./controller"

const eventHandler = {
  registEventHandler: function(){
    view.canvasWrapEl.addEventListener("mousedown", eventHandler.canvasWrapEl__onMouseDown)
    view.canvasWrapEl.addEventListener("mousemove", eventHandler.canvasWrapEl__onMouseMove)
    view.canvasWrapEl.addEventListener("mouseup", eventHandler.canvasWrapEl__onMouseUp)
    view.canvasWrapEl.addEventListener("contextmenu", eventHandler.canvasWrapEl__onContextMenu)

    view.fileWrapEl.addEventListener("click", eventHandler.fileWrapEl_onClick)
    view.labelImagesWrapEl.addEventListener("click", eventHandler.labelImagesWrapEl__onClick)

    window.addEventListener("keydown", eventHandler.window__onKeyDown)
  },



  // canvasWrapEl
  canvasWrapEl__onMouseDown: function(e){
    e.preventDefault()

    var point = { x: e.offsetX, y: e.offsetY }

    model.isMouseDown = true

    if(e.button == 0){
      !model.isDrawing ? controller.startDraw(point) : controller.addPoint(point)
    }

  },
  canvasWrapEl__onMouseMove: function(e){
    e.preventDefault()

    var point = { x: e.offsetX, y: e.offsetY }

    if(model.isDrawing){
      var labelPoints = model.currentLabel.points
      labelPoints[labelPoints.length-1] = [point.x, point.y]
      controller.renderLabelCanvas()
    }
  },
  canvasWrapEl__onMouseUp: function(e){
    e.preventDefault()

    model.isMouseDown = true
  },
  canvasWrapEl__onContextMenu: function(e){
    e.preventDefault()

    if(e.button == 2){
      controller.stopDraw()
    }
  },



  // window
  window__onKeyDown: function(e){
    var currKey = e.keyCode || e.which || e.charCode

    if(currKey == 81){
      // key -> q
      e.preventDefault()
      controller.stopDraw()
    }

    if(e.ctrlKey || e.metaKey && currKey == 90){
      // key -> ctrl + z
      e.preventDefault()
      controller.unDoDraw()
    }
  },



  // fileWrapEl
  fileWrapEl_onClick: function(e){
    var target = e.target,
        feats = {
          selectFile: function(e, target){
            var filename = target.dataset.filename
            if(!filename) return

            model.labelInfo.imagePath = filename
            model.labelInfo.baseName = model.labelInfo.imagePath.split(".")[0]

            view.fileWrapEl.querySelector(".file-name.active").classList.remove("active")
            target.classList.add("active")

            controller.initView()
          },
        }

    while(target !== this){
      if(!target) return
      var feat = target.dataset.feat
      var go = feat && feats.hasOwnProperty(feat) && feats[feat](e, target)
      if(go === false) return

      target = target.parentNode
    }
  },



  // labelImagesWrapEl
  labelImagesWrapEl__onClick: function(e){
    var target = e.target,
        feats = {
          deleteLabel: function(e, target){
            var labelImageEl = target.parentNode,
                labelTimestamp = labelImageEl.dataset.labelTimestamp

            model.labelInfo.shapes.forEach(function(label, index){
              if(label.timestamp == labelTimestamp){
                model.labelInfo.shapes.splice(index, 1)
                labelImageEl.parentNode.removeChild(labelImageEl)

                controller.renderLabelCanvas()
                controller.uploadData()
              }
            })
          },
          selectLabel: function(e, target){
            controller.unSeelctLabel()

            var labelTimestamp = target.dataset.labelTimestamp

            target.classList.add("active")

            model.labelInfo.shapes.forEach(function(label, index){
              if(label.timestamp == labelTimestamp){
                model.activeShape = label

                controller.renderLabelCanvas()
              }
            })
          },
          showInput: function(e, target){
            var input = window.prompt("输入标注内容：", target.innerText)
            if(!input) return

            input = input.replace(/^\s+|\s$/g,"")

            input = input.replace(/</g, "&lt;")

            var labelImageEl = target.parentNode,
                labelTimestamp = labelImageEl.dataset.labelTimestamp

            model.labelInfo.shapes.forEach(function(label, index){
              if(label.timestamp == labelTimestamp){
                label.name = input
                target.innerText = input
              }
            })

            controller.uploadData()

            return "stop"
          },
        }

    while(target !== this){
      if(!target) return
      var feat = target.dataset.feat
      var go = feat && feats.hasOwnProperty(feat) && feats[feat](e, target)
      if(go === "stop") return

      target = target.parentNode
    }
  },

}

export default eventHandler