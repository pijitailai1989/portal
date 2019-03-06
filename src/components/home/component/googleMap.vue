<template>
  <div class="container googles" id="map">
    <div class="flexs ser j-center">
      <p>{{news.FG}}</p>
    </div>
    <gmap-map :options="{styles: styles, disableDefaultUI: true}" :center="center" :zoom="defaultZoom" style="width:100%;height:500px;">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :icon="m.icon" :clickable="true" :animation="2"  @click="backTo('/mapDetail',m.content.country,m.content.location_code)"></gmap-marker>
    </gmap-map>
    <div class="flexs j-center" style="padding:15px 0;">
      <p class="buttons" @click="backTo('/mapDetail')">{{news.CKGD}}</p>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'googlemap',
    props:[''],
    data () {
      return {
         center: {lat: 8, lng : 110},
         defaultZoom:4,
         markers: [],
         styles:   [
                        {
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "saturation": 70
                            },
                            {
                              "lightness": 45
                            }
                          ]
                        },
                        {
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "elementType": "labels.text.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative.country",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative.locality",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#fcfeed"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural.landcover",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#c1c713"
                            },
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural.landcover",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "visibility": "on"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural.landcover",
                          "elementType": "labels.text.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural.terrain",
                          "elementType": "labels.text",
                          "stylers": [
                            {
                              "color": "#c8e8f2"
                            },
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural.terrain",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural.terrain",
                          "elementType": "labels.text.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.line",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#fe8e02"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.line",
                          "elementType": "geometry.fill",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.line",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "water",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#2f9ac0"
                            },
                            {
                              "saturation": -20
                            },
                            {
                              "lightness": 55
                            }
                          ]
                        },
                        {
                          "featureType": "water",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "saturation": -5
                            },
                            {
                              "visibility": "on"
                            }
                          ]
                        },
                        {
                          "featureType": "water",
                          "elementType": "labels.text",
                          "stylers": [
                            {
                              "color": "#176478"
                            },
                            {
                              "lightness": 5
                            }
                          ]
                        },
                        {
                          "featureType": "water",
                          "elementType": "labels.text.stroke",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        }
                      ]
      };
    },

    components: {},

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

              //  data.icon={
              //     url: require("../../../assets/img/map-marker.png"),
              //     scaledSize: { width: 26, height: 26, f: "px", b: "px" },
              //     origin: { x: 0, y: 0 },
              //     anchor: { x: 16, y: 16 }
              //  }
          
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
<style lang='' scoped>
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
