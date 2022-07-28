import FullBg from './imgPre.js'

function eventFunction(e) {
  const { src } = el
  // 生成一个容器，和遮罩
  const originElement = e.target
  const { left, top, width, height } = originElement.getBoundingClientRect()
  FullBg({
    originWidth: width,
    originHeight: height,
    originLeft: left,
    originTop: top,
    src
  })
}

const imgPre = {
  install(Vue, options) {
    Vue.directive('imgPre', {
      bind: function(el, binding, vnode) {
        if (el.nodeType * 1 === 1 && el.tagName === 'IMG') {
          // 必须为img标签
          if (typeof binding.value === 'boolean' && binding.value === true || binding.value === undefined) {
            // 有值，为true，或者没有值的时候才触发
            // const { src } = el
            el.addEventListener('click', eventFunction)
          }
        }
      },
      unbind: function (el) {
        el.removeEventListener('click', eventFunction)
      }
    })
  }
}

// 注意这里的判断，很重要
if(typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(imgPre)
}

export default imgPre
