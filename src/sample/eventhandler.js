import model from "./model";
import * as view from "./view";

const eventHandler = {
  registEventHandler: function(){
    view.els.canvasWrapEl.addEventListener("mousedown", eventHandler.canvasWrapEl__onMouseDown);
    
    view.els.canvasWrapEl.addEventListener("mousemove", eventHandler.canvasWrapEl__onMouseMove);
    
    view.els.canvasWrapEl.addEventListener("mouseup", eventHandler.canvasWrapEl__onMouseUp);
    
    view.els.canvasWrapEl.addEventListener("contextmenu", eventHandler.canvasWrapEl__onContextMenu);

    view.els.labelImagesWrapEl.addEventListener("click", eventHandler.labelImagesWrapEl__onClick);

    window.addEventListener("keydown", eventHandler.window__onKeyDown);
  },

  canvasWrapEl__onMouseDown: function(e){
    e.preventDefault()

    var point = { x: e.offsetX, y: e.offsetY }

    model.isMouseDown = true

    if(e.button == 0){
      !model.isDrawing ? view.startDraw(point) : view.addPoint(point)
    }

  },

  canvasWrapEl__onMouseMove: function(e){
    e.preventDefault()

    var point = { x: e.offsetX, y: e.offsetY }

    if(model.isDrawing){
      var labelPoints = model.currentLabel.points
      labelPoints[labelPoints.length-1] = [point.x, point.y]
      view.renderLabelCanvas()
    }
  },
  
  canvasWrapEl__onMouseUp: function(e){
    e.preventDefault()

    model.isMouseDown = true
  },
 
  canvasWrapEl__onContextMenu: function(e){
    e.preventDefault()

    if(e.button == 2){
      view.stopDraw()
    }
  },

  // window
  window__onKeyDown: function(e){
    var currKey = e.keyCode || e.which || e.charCode

    if(currKey == 81){
      // key -> q
      e.preventDefault()
      view.stopDraw()
    }

    if(e.ctrlKey || e.metaKey && currKey == 90){
      // key -> ctrl + z
      e.preventDefault()
      view.unDoDraw()
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

                view.renderLabelCanvas()
                view.uploadData()
              }
            })
          },
          selectLabel: function(e, target){
            view.unSeelctLabel()

            var labelTimestamp = target.dataset.labelTimestamp

            target.classList.add("active")

            model.labelInfo.shapes.forEach(function(label, index){
              if(label.timestamp == labelTimestamp){
                model.activeShape = label

                view.renderLabelCanvas()
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

            view.uploadData();

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
