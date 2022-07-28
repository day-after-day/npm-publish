export function createAsyncLoading(oldMethods) {
  const newMethods = {}
  Object.keys(oldMethods).forEach(oldMethodName => {
    newMethods[oldMethodName] = function(...args) {
      const oldMethodReturn = oldMethods[oldMethodName].apply(this, args)
      if (oldMethodReturn instanceof Promise) {
        return new Promise((resolve, reject) => {
          this.$set(this.loadingPluginData_, oldMethodName, true)
          oldMethodReturn.then(resolve).catch(reject).finally(() => {
            this.$set(this.loadingPluginData_, oldMethodName, false)
          })
        })
      } else {
        return oldMethodReturn
      }
    }
  })
  return newMethods
}

export default (options) => {
  return {
    data() {
      return {
        loadingPluginData_: {}
      }
    },
    beforeCreate() {
      const methods = this.$options.methods

      if (methods) {
        this.$options.methods = createAsyncLoading(methods)

        if (options && options.loadingName) {
          // 代理 其他名称 至 loadingPluginData_
          Object.defineProperty(this, options.loadingName, {
            get() {
              return this.loadingPluginData_
            },
            set(val) {
              this.loadingPluginData_ = val
            }
          })
        }
      }
    }
  }
}

