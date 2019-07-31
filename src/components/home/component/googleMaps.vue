<template>
  <div class=" googles" id="map">
       <gmap-map
         :options="{styles: styles, disableDefaultUI: true, draggableCursor: 'crosshair'}"
         :center="center"
         :zoom="defaultZoom"
         style="width: 100%; height: 100%">
          <!-- <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
               <div class="country_info" style="font-size:14px;font-weight:600;">
                   <span>{{infoText.country_name}} </span>
                   <span> <span style="color:#2F9AC0;">{{infoText.lastmile_count}}</span>{{news.GFWS}}</span>
                   <span>{{news.ZDJ}}: <span style="color:#2F9AC0;"> {{infoText.currency}} {{infoText.starting_price}}</span></span>
               </div>
          </gmap-info-window>
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :icon="m.icon"
            :clickable="true"
            :draggable="true"
            :animation="2"
            @click="showCountry(m.content)"
            @mouseover="toggleInfoWindow(m.content)"
            @mouseout="closeInfoWindow()"
          >
            
          </gmap-marker> -->
          <div slot="visible" class="positionRight flexs a-center">
                 <span style="color:white;font-size:18px;padding:0 20px;" class="hiddenT">{{news.PSQY}}</span>
          </div>
          <gmap-polygon
             :key="poly.id + index"
             v-for="(poly, index) in pathArr"
             :paths="poly.paths"
             v-if="poly.next_level"
             :editable="false" 
             :options="{geodesic:true, strokeOpacity: 0.4, strokeColor:'#F4B33D', strokeWeight:0, fillColor:'#F4B33D', fillOpacity:0.4}"
          ></gmap-polygon>
          <gmap-polygon
             :key="poly.id + index"
             v-for="(poly, index) in pathArr"
             :paths="poly.paths"
             v-if="poly.next_level==false"
             :editable="false" 
             :options="{geodesic:true, strokeOpacity: 0.4, strokeColor:'#F4B33D', strokeWeight:0, fillColor:'#F4B33D', fillOpacity:0.4}"
          ></gmap-polygon>
          <!-- <gmap-polygon
             :key="poly.id + index"
             v-for="(poly, index) in pathArr"
             :paths="poly.paths"
             v-if="poly.next_level"
             :editable="false" 
             :options="{geodesic:true, strokeOpacity: 0.4, strokeColor:'#F4B33D', strokeWeight:0, fillColor:'#F4B33D', fillOpacity:0.4}"
             @click="showLastmileByRegion(poly.id,poly.name, poly.next_level,poly)"
          ></gmap-polygon>
          <gmap-polygon
             :key="poly.id + index"
             v-for="(poly, index) in pathArr"
             :paths="poly.paths"
             v-if="poly.next_level==false"
             :editable="false" 
             :options="{geodesic:true, strokeOpacity: 0.4, strokeColor:'#F4B33D', strokeWeight:0, fillColor:'#F4B33D', fillOpacity:0.4}"
             @click="showLastmileByRegion(poly.id,poly.name, poly.next_level,poly)"
          ></gmap-polygon> -->
       </gmap-map>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'googlemaps',
    props:{
      childProvince: {
            type: String,
            default: ''
      },
      childNameMap:{
        tyle:Object,
        default:{}
      }
    },
    data () {
      return {
         center: {lat: 0, lng : 0},
         defaultZoom:3,
         infoWinOpen:false,
         markers: [],
         infoText:{
           country_name:'',
           currency:'',
           lastmile_count:null,
           starting_price:null
         },
         infoOptions: {
            pixelOffset: {
              width: -5,
              height: -18
            }
         },
         
         pathArr:[],
         country:'',
         location_code:'',
         infoWindowPos:null,
         styles:      [
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
            'country_list','overview','lastmileList','regionLocation1','backGo'
        ]),
        news(){
       return this.$t('news')
      },
      // ...mapGetters('menu',[
      //                   'paths'
                        
      //   ]),
    },

    beforeMount() {},

    mounted() {
      this.ajaxOverviewCountry()
      this.ajaxCountrylist()
      this.getLastmileList( [] )
      if(this.$route.query.country){
        const _this=this;
          let obj={}
        obj['country']=_this.$route.query.country
        // this.ajaxLastmileList( this.$qs.stringify(obj) )
        // this.ajaxRegionLocation( _this.$route.query.code )
        // console.log(this.$route,'router')
      }
      
    },

    methods: {
      ...mapMutations('menu',[
          'getLastmileList','getRegionLocation1','setback'
      ]),
      ...mapActions('menu',[
          'ajaxOverviewCountry','ajaxLastmileList','ajaxRegionLocation','ajaxLastmileListRegion','ajaxCountrylist'
      ]),
      toggleInfoWindow(data){
        const _this=this;
        if(_this.overview){
           for(let key in _this.overview){
             if(data.country==key){
                _this.infoWindowPos={
                   lat:data.lat,
                   lng:data.lng
                 }
                _this.infoWinOpen=true;
                _this.infoText=_this.overview[key]
             }
           }
        }
          // console.log(this.infoText,'infoText')
      },
      closeInfoWindow(){
         this.infoWinOpen=false;
         this.infoText={
           country_name:'',
           currency:'',
           lastmile_count:null,
           starting_price:null
         }
         this.infoWindowPos=null
      },
      showCountry(data){
        // console.log(data,'data',this.markers)
        this.center={
                   lat:data.cnt_lat,
                   lng:data.cnt_lng
                 }
        this.defaultZoom=data.zoom
        // this.getLastmileList( [] )
        this.getRegionLocation1( [] )
        let obj={}
        obj['country']=data.country
        // this.ajaxLastmileList( this.$qs.stringify(obj) )
        // this.ajaxRegionLocation( data.location_code )
        this.country=data.country
        this.location_code=data.location_code
        this.setback(false)
        this.$emit('childPost',this.country)
        // console.log(this.country,'this.country')
      },
      showLastmileByRegion(id,name,level,poly){
          // console.log(id,name,level,poly,'location_code,has_next_level')
          if(id){
            // this.ajaxLastmileListRegion(id)
          }
          if(level){
            // this.ajaxRegionLocation( id )
          }else{
            this.pathArr=[]
            this.pathArr.push(poly)
          }
          this.setback(true)
          this.$emit('childPost',this.country)
          
      }

    },

    watch: {
      childProvince(newval,oldval){
          const _this=this;
          if(newval){
              // console.log(newval,oldval,'newval,oldval')

              _this.markers.forEach(el=>{
                if(el.content['country']==newval){
                    _this.showCountry(el.content);
                    return;
                }
                  
              })

          }
      },
      childNameMap(newval,oldval){
        const _this=this;
        // console.log(newval,'oldval','11')
        if(newval){
           _this.showCountry(newval);
        }
      },
      regionLocation1(newval,oldval){
         this.pathArr=this.regionLocation1
        //  console.log(newval,'newval1111111111111')
      },
      backGo(newval,oldval){
         if(!newval&&this.country&&this.location_code){
            //  this.ajaxLastmileList( this.country )
            //  this.ajaxRegionLocation( this.location_code )
         }
      },
      country_list:{
        handler:function(newval,oldval){
          this.$emit('childList',this.markers)
             const _this=this;
             this.country_list.forEach( (el,index) => {
               
               let data={}
                //  data.lastmile_count=''
                 if(_this.overview){
                     for(let key in _this.overview){
                       if(el.country==key){
                          data.lastmile_count=_this.overview[key].lastmile_count.toString()
                          data.country_name=_this.overview[key].country_name
                       }
                     }
                  }


                 if(index==0){
                   this.center={
                     lat:el.cnt_lat,
                     lng:el.cnt_lng
                   }
                   
                 }
                 
                 data.icon={
                    url: require("../../../assets/img/map-marker.png"),
                    scaledSize: { width: 28, height: 28, f: "px", b: "px" },
                    origin: { x: 0, y: 0 },
                    anchor: { x: 16, y: 16 },
                    color:'red'
                 }
                 data.position={
                   lat:el.lat,
                   lng:el.lng
                 }
                 data.content={
                   lat:el.lat,
                   cnt_lat:el.cnt_lat,
                   lng:el.lng,
                   cnt_lng:el.cnt_lng,
                   country:el.country,
                   location_code:el.location_code,
                   zoom:el.zoom
                 }
                //  console.log(_this.overview,'_this.overview')
                   if(_this.markers.length<_this.country_list.length&&data.lastmile_count){
                     _this.markers.push(data)
                   }
                 if(_this.$route.query){
                    if(_this.$route.query.country==el.country){
                        _this.center={
                                   lat:el.cnt_lat,
                                   lng:el.cnt_lng
                                 }
                        _this.defaultZoom=el.zoom
                    }
                 }
              })
             
        },
        deep:true,     
      }
    }

  }

</script>
<style lang='' scoped>
  .googles{
    height:100%;
  }
  .country_info>span{
    margin-left:20px;
  }
  .positionRight{
      position: absolute;
      top:10px;
      right:0;
      z-index:3000;
      
      height:50px;
      background:rgba(244,179,61,.6);
      border-radius:30px 0 0 30px;
  }
</style>