<template>
  <div class="container">
    <div class="swiper-container">
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper1.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper2.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper3.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper4.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper5.png" alt=""></a></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  components: {},

  methods: {}
}

</script>

<style scoped>
    .swiper-container{
        min-height: 200px;
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        text-align: center;
    }
    .swiper-items{
        width: 20%;
    }

    .swiper-items img{
        margin: 0 auto;

    }

    @media screen and (max-width: 992px) {
     .swiper-items{
       width: 33.3%;
       padding: 10px;
     }
   }
   @media screen and (max-width: 768px) {
     .swiper-items{
       width: 50%;
       padding: 20px;

     }
     .swiper-items img{
       width:1.9rem;
       height:.64rem;

    }
   }
</style>