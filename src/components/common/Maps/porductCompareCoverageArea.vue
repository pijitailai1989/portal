<template>
  <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%;">
    <l-tile-layer :url="url" :attribution="attribution"/>
    <l-geo-json v-for="(item,index) in fromComponentAMsg" :geojson="item.geo_json" :options="options" :key="index"/>
  </l-map>
</template>

<script>
import Bus from '@/assets/Bus'
import { LMap, LTileLayer, LGeoJson, LMarker } from 'vue2-leaflet'
export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      show: true,
      zoom: 1,
      center: [48, -1.219482],
      attribution: null,
      fromComponentAMsg: [],
      options: {
        style: function() {
          return {
            weight: 2,
            color: '#ECEFF1',
            opacity: 1,
            fillColor: '#e4ce7f',
            fillOpacity: .7
          }
        }
      },
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
  },
  mounted() {
    Bus.$on('inceptMessage',(msg) => {
      this.fromComponentAMsg = msg
      msg.forEach(item => {
        console.log(item)
      })
      // console.log(this.fromComponentAMsg)
    })
  }
}
</script>

<style scoped>

</style>
