<template>
  <l-map
    :zoom="zoom"
    :center="center"
    style="height: 200px;width:695px;">
    <l-tile-layer
      :url="url"
      :attribution="attribution"/>
    <l-marker :lat-lng="marker">
      <l-popup :content="text"/>
    </l-marker>
  </l-map>
</template>

<script>
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from 'vue2-leaflet'
export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup
  },
  props: {
    latitude: {
      type: String,
      default: ''
    },
    longitude: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      zoom: 13,
      center: L.latLng(this.latitude, this.longitude),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: null,
      marker: L.latLng(this.latitude, this.longitude),
      currentZoom: 16,
      currentCenter: L.latLng(this.latitude, this.longitude),
      text: 'this is a marker'
    }
  },
  methods: {

  },
  mounted(){
    //  console.log(this.latitude,this.longitude,'jingde')
    //  console.log(L,'L')
  }
}
</script>
<style>
  /*@import "leaflet/dist/leaflet.css";*/
</style>
