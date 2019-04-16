import './index.scss'

import utils from '../utils'

import view from './view'
import model from './model'
import controller from './controller'
import eventHandler from './eventhandler'

utils.readdir('source', function(res){
  model.sourceFiles = res.data
  model.labelInfo.imagePath = model.sourceFiles.length && model.sourceFiles[0]
  model.labelInfo.baseName = model.labelInfo.imagePath.split('.')[0]

  view.fileWrapEl.innerHTML = model.sourceFiles.map(function(filename, index){
    return '<div data-feat="selectFile" class="file-name ' + (index == 0 ? 'active' : '') + '" data-filename="'+filename+'"><svg width="20" height="20" viewBox="0 0 20 20"><path fill="#000000" d="M17.854 5.646l-4.5-4.5c-0.094-0.094-0.221-0.146-0.354-0.146h-9.5c-0.827 0-1.5 0.673-1.5 1.5v16c0 0.827 0.673 1.5 1.5 1.5h13c0.827 0 1.5-0.673 1.5-1.5v-12.5c0-0.133-0.053-0.26-0.146-0.354zM16.793 6h-3.293c-0.276 0-0.5-0.224-0.5-0.5v-3.293l3.793 3.793zM17 18.5c0 0.276-0.224 0.5-0.5 0.5h-13c-0.276 0-0.5-0.224-0.5-0.5v-16c0-0.276 0.224-0.5 0.5-0.5h8.5v3.5c0 0.827 0.673 1.5 1.5 1.5h3.5v11.5z"></path></svg></div>'
  }).join('')

  controller.initView()
  eventHandler.registEventHandler()
})
