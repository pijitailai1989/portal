<template>
  <div class="bar-container">
    <div id="bar1" ref="slider1"></div>
    <!-- <div id="bar2" ref="slider2"></div> -->
  </div>
</template>

<script>
export default {
  name: 'RangeSlider',
  props:{
    min: Number,
    max: Number
  },
  data() {
    return {
      leftData: '',
      widthData: ''
    }
  },
  mounted() {
    // this.leftData = this.min/45
    this.widthData = this.max/30
    this.$refs.slider1.style.width= this.widthData*100 + '%';
    // this.$refs.slider2.style.width= this.widthData*100 + '%';
  }
}
</script>

<style lang="" scoped>
  .bar-container{
    position: relative;
    margin: 0 auto;
    height: 14px;
    border-radius: 5px;
    background: #F1F1F1;
  }
  #bar1{
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    border-radius: 7px;
    background: #2F9AC0;
  }
</style>

