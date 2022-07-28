import Vue from 'vue'
import imgPre from './imgPre.vue'

const FullBgConstructor = Vue.extend(imgPre)

let instance

const FullBg = function(options) {
  options = options || {}
  instance = new FullBgConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  window.document && window.document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el

  return instance.vm
}

export default FullBg
