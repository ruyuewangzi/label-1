import './index.scss'

import utils from '../utils'

const model = {
  canContinue: true,
  currentDownloadIndex: 0,
  files: null,

  sectionWidth: 200,
}



getAllLabelFiles(function(){
  document.querySelector('#app').style.width = `${model.files.length * model.sectionWidth}px`;
  renderSinglePaperModel()
})


function getAllLabelFiles(cb){
  utils.readdir('label', function(res){
    model.files = res.data || []
    cb && cb()
  })
}

function renderSinglePaperModel(){
  utils.ajax(`/api/readfile/label/${model.files[model.currentDownloadIndex]}`, null, function(client){
    let res = client.response;
    if(!res.data) return
    const paperModel = JSON.parse(res.data)
    generatePaper(paperModel)
    model.currentDownloadIndex++

    if(model.currentDownloadIndex >= model.files.length){
      model.canContinue = false
    }else{
      renderSinglePaperModel()
    }
  })
}


function generatePaper(paperModel){
  const sectionEl = document.createElement('section')

  sectionEl.style.width = `${model.sectionWidth}px`

  let html = `<h2>${paperModel.imagePath}</h2>`

  let imgs = paperModel.shapes.map(function(shape, index){
    return `<div class="label-content">
      <img src="${shape.imageData}"/>
      <div class="label">${shape.label}</div>
    </div>`
  }).join('')

  html += `<div class="labels">${imgs}</div>`

  sectionEl.innerHTML = html
  document.querySelector('#app').append(sectionEl)
}