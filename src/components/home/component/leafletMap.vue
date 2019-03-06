<template>
  <div  class="container googles" id="map">
    <div class="flexs ser j-center">
      <p>{{news.FG}}</p>
    </div>
    <l-map style="width: 100%; height: 500px;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :key="index" v-for="(m, index) in markers" :lat-lng="m.lat_lng"  @click="backTo('/mapDetail',m.content.country,m.content.location_code)">
        <l-icon
          :icon-url="m.icon.iconUrl"
          :icon-size="m.icon.iconSize"
          :icon-anchor="m.icon.iconAnchor"
          >
        </l-icon>
      </l-marker>
      
    </l-map> 
    <div class="flexs j-center" style="padding:15px 0;">
      <p class="buttons" @click="backTo('/mapDetail')">{{news.CKGD}}</p>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup ,LPolygon , LIcon} from 'vue2-leaflet';
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  name: 'leafletmap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolygon,
    LIcon
  },
  data () {
    return {
      zoom: 4,
      center: L.latLng(8, 110),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(8, 110),
      text: 'this is a marker',


      markers: [],
    }
  },
    computed: {
      ...mapState('menu',[
            'country_list','overview'
        ]),
        news(){
       return this.$t('news')
      },
      
    },

    beforeMount() {},
    created(){
      
    },
    mounted() {
      this.ajaxOverviewCountry()
      this.ajaxCountrylist()
    },

    methods: {
      ...mapMutations('menu',[
          'getLastmileList'
      ]),
      ...mapActions('menu',[
            'ajaxCountrylist','ajaxOverviewCountry'
        ]),
      backTo(url,country_name,country){
        this.$router.push({path: url, query: {country: country_name,code:country}})
      }
    },

    watch: {
      country_list(newval,oldval) {
           const _this = this;
            this.country_list.forEach( (el,index) => {
               let data={}
                 data.lastmile_count=''
                 if(_this.overview){
                     for(let key in _this.overview){
                       if(el.country==key){
                          data.lastmile_count=_this.overview[key].lastmile_count.toString()
                       }
                     }
                  }

               data.icon={
                  iconUrl: require("../../../assets/img/map-marker.png"),
                  iconSize: [32, 32],
                  iconAnchor: [16, 37]
                }
               
               data.lat_lng=[el.lat,el.lng]
               data.content={
                   
                   lat:el.lat,
                   cnt_lat:el.cnt_lat,
                   lng:el.lng,
                   cnt_lng:el.cnt_lng,
                   country:el.country,
                   location_code:el.location_code,
                   zoom:el.zoom
                 }
               data.position={lat:el.lat,lng:el.lng}
               this.markers.push(data)
              //  console.log(this.markers,'this.markers')
            })

       }
    }
}
</script>

<style scoped>
.googles{
    height:800px;
	width:100%;
	padding:0px;
  }
   .ser{
     margin-top:90px;
     margin-bottom:20px;
   }
   .ser p{
     font-size:34px;
     font-weight:600;
     color:#333;
   }

.buttons {
  background: rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
  color: white;
  width:160px;
  height:60px;
  text-align: center;
  line-height:60px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  cursor: pointer;
}
@media screen and (max-width: 768px) {
   .googles{
     height:700px;
   }
   .ser{
     margin-top:30px;
     margin-bottom:20px;
   }
}
</style>