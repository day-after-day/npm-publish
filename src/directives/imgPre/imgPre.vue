<template>
  <transition name="img-slide">
    <div ref="imgBoxBg" class="img-full-bg" @click="close">
      <img ref="img" :src="src" :alt="alt" style="opacity:0;background:rgba(0,0,0,.0)" @click.prevent.stop>
      <img src="./rotate.png" alt="转向" class="rotate" @click.stop="rotateImg">
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      src: '',
      alt: '',
      originWidth: '',
      originHeight: '',
      originLeft: '',
      originTop: '',
      rotate: 0,
      limitContain: 0
    }
  },
  mounted() {
    const img = this.$refs.img
    img.onload = () => {
      this._initStyle()
    }
  },
  methods: {
    _initStyle() {
      const img = this.$refs.img

      // 添加class名，让其居中
      this.$refs.img.className = 'img-center'

      // 暂存图片居中时(动画最终状态)的宽高，位置
      // let imgWidth = img.getBoundingClientRect().height;
      // let imgHeight = img.getBoundingClientRect().width;
      const { left, top, width, height } = img.getBoundingClientRect()
      this.limitContain = Math.min(width, height)

      // 设置图片的宽高和位置
      this.$refs.img.style.width = this.originWidth + 'px'
      this.$refs.img.style.height = this.originHeight + 'px'
      this.$refs.img.style.position = `absolute`
      this.$refs.img.style.left = `${this.originLeft}px`
      this.$refs.img.style.top = `${this.originTop}px`

      // 确定动画的范围和时长
      this.$refs.img.style.transition = 'all .5s ease'
      this.$refs.imgBoxBg.style.transition = `all .5s ease`

      // 手动触发页面重绘
      const f = document && document.body.offsetHeight  // eslint-disable-line

      // 设置图片最终的宽高和位置
      this.$refs.img.style.width = `${width}px`
      this.$refs.img.style.height = `${height}px`
      this.$refs.img.style.left = `${left}px`
      this.$refs.img.style.top = `${top}px`
      this.$refs.imgBoxBg.style.background = `rgba(0,0,0,.5)`
      this.$refs.img.style.opacity = '1'
    },
    close(e) {
      // 设置图片的宽高和位置
      this.$refs.img.style.width = this.originWidth + 'px'
      this.$refs.img.style.height = this.originHeight + 'px'
      this.$refs.img.style.position = `absolute`
      this.$refs.img.style.left = `${this.originLeft}px`
      this.$refs.img.style.top = `${this.originTop}px`

      const ele = this.$refs.imgBoxBg
      setTimeout(() => {
        ele.parentNode.removeChild(ele)
      },600)
    },
    rotateImg() {
      this.rotate += 90
      const img = this.$refs.img
      // const imgBoxBg = this.$refs.imgBoxBg
      img.style.transform = `rotate(${this.rotate}deg)`
    }
  }
}
</script>

<style scoped>
.img-full-bg{
  position: fixed;
  left:0;right:0;top:0;bottom:0;
  padding-top: 10px;
  padding-bottom: 40px;
  background: rgba(0,0,0,.5);
  text-align: center;
  z-index: 9999;
}

.img-full-bg:after{
  content: ' ';
  width:0;
  height:100%;
  display: inline-block;
  vertical-align: middle
}

.img-full-bg .img-center{
  vertical-align: middle;
  max-height: 100%;
  max-width:100%;
}

.rotate{
  width: 30px;
  height: 30px;
  position: absolute;
  bottom:0;
  cursor: pointer;
}

</style>

