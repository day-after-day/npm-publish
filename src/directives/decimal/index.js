// import { Message } from 'element-ui'
import { debounce } from '../../utils'

// 闭包变量
let bindValue = 2
let autoNotice = true


// 提示信息
function notice(str) {
  debounce(() => {
    // Message.warning(str)
    console.log(str)
  }, 500)
}

function preventInput(e) {
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    e.returnValue = false
  }
}

function bindFunction(e) {
  e = e || window.event
  const valueText = e.target.value
  const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode

  const numReg = /[0-9]/
  const decimalReg = /[0-9.]/

  if (bindValue === 0) {
    if (!numReg.test(String.fromCharCode(charcode))) {
      autoNotice && notice('只允许输入整数')
      preventInput(e)
    }
  } else {
    if (decimalReg.test(String.fromCharCode(charcode))) {
      if (valueText.split('.')[1]) {
        if (valueText.split('.')[1].length >= bindValue) {
          autoNotice && notice(`最多只能输入${bindValue}位小数`)
          preventInput(e)
        }
      }
    } else {
      autoNotice && notice(`只允许输入数字和小数点`)
      preventInput(e)
    }
  }
}

export default {
  install(Vue, options) {
    Vue.directive('decimal', {
      bind: function(el, binding, vnode) {
        // 默认设置为： 可以输入数字和小数点，并且最多保留两位小数，并且自动弹出提示
        if (typeof binding.value === 'number') {
          bindValue = binding.value
        }

        if (el.tagName === 'DIV') {
          // 如果本元素不是input，则默认查找子元素中的第一个input元素
          const targetInput = Array.from(el.getElementsByTagName('INPUT'))[0]

          targetInput.addEventListener('keypress', bindFunction)
        } else if (el.tagName === 'INPUT') {
          el.addEventListener('keypress', bindFunction)
        }
      },
      unbind: function(el) {
        el.removeEventListener('keypress', bindFunction)
      }
    })
  }
}
