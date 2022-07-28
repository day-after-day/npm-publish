import getGlobalMixins, { createAsyncLoading } from './globalMixins';

const mixinsInstall = {
  install(Vue, options) {
    Vue.mixin(getGlobalMixins(options))
  }
}

export default mixinsInstall

export { createAsyncLoading }
