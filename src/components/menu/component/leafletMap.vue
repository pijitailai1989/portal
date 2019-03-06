<template>
  <div  class="container googles" id="map">
    <div slot="visible" class="positionRight flexs a-center">
                 <span style="color:white;font-size:18px;padding:0 20px;" class="hiddenT">{{news.PSQY}}</span>
    </div>
    <l-map style="width: 100%; height: 100%;" :zoom="defaultZoom" :center="centerData" :attributionControl="attributionControl" @update:center="centerUpdated">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :key="index" v-for="(m, index) in markers" :lat-lng="m.lat_lng" @click="showCountry(m.content)"  :draggable="draggable"
            @mouseover="toggleInfoWindow(m.content)"
            @mouseout="closeInfoWindow()">
        <l-icon
          :icon-url="m.icon.iconUrl"
          :icon-size="m.icon.iconSize"
          :icon-anchor="m.icon.iconAnchor"

          >
        </l-icon>
        <l-tooltip>
          <div class="country_info" style="font-size:14px;font-weight:600;">
                   <span>{{infoText.country_name}} </span>
                   <span> <span style="color:#2F9AC0;">{{infoText.lastmile_count}}</span>{{news.GFWS}}</span>
                   <span>{{news.ZDJ}}: <span style="color:#2F9AC0;"> {{infoText.currency}} {{infoText.starting_price}}</span></span>
               </div>
        </l-tooltip>
      </l-marker>
      <l-polygon
      :key="poly.id + index"
      v-for="(poly, index) in pathArr"
      :lat-lngs="poly.paths"
      :color="color"
      :weight="weight"
      :opactiy="opactiy"
      :fillColor="color"
      :fillOpacity="opactiy"
      @click="showLastmileByRegion(poly.id,poly.name, poly.next_level,poly)"
      >
      </l-polygon>
    </l-map> 
    
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup ,LPolygon , LIcon,LTooltip} from 'vue2-leaflet';
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  name: 'leafletmap',
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
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolygon,
    LIcon,
    LTooltip
  },
  data () {
    return {
      centerData: L.latLng(8, 110),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(8, 110),
      text: 'this is a marker',

      color:'#F4B33D',
      opactiy:0.4,
      weight:1,
      markers: [],
      defaultZoom:4,
      infoWinOpen:false,
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
      centerShow:true,
      draggable: false,
      attributionControl: true,

    }
  },
    computed: {
      ...mapState('menu',[
            'country_list','overview','lastmileList','regionLocation','backGo'
        ]),
        news(){
       return this.$t('news')
      }
    },

    beforeMount() {},
    created(){
      
    },
    mounted() {
      this.ajaxOverviewCountry()
      this.ajaxCountrylist()
      
      // console.log(this.markers,'this.markers')
      this.getLastmileList( [] )
      if(this.$route.query.country){
        const _this=this;
          let obj={}
        obj['country']=_this.$route.query.country
        this.ajaxLastmileList( this.$qs.stringify(obj) )
        this.ajaxRegionLocation( _this.$route.query.code )
        // console.log(this.$route,'router')
      }
      this.$emit('childList',this.markers)
    },

    methods: {
      ...mapMutations('menu',[
          'getLastmileList','getRegionLocation','setback'
      ]),
      ...mapActions('menu',[
          'ajaxOverviewCountry','ajaxLastmileList','ajaxRegionLocation','ajaxLastmileListRegion','ajaxCountrylist'
      ]),
      centerUpdated (center) {
        //  this.centerData = center; 
        //  console.log(center,'centerData')
      },
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
        // console.log(data,'data')
        const _this =this;
        this.defaultZoom = data.zoom > 7 ? 7 : data.zoom;
        this.getLastmileList( [] )
        this.getRegionLocation( [] )
        let obj={}
        obj['country']=data.country
        this.ajaxLastmileList( this.$qs.stringify(obj) )
        this.ajaxRegionLocation( data.location_code )
        this.country=data.country
        this.location_code=data.location_code
        this.setback(false)
        this.$emit('childPost',this.country)
        // console.log(this.country,'this.country')
        
        // console.log( _this.defaultZoom,' _this.defaultZoom')
        this.$set(this.centerData,'lat',data.lat)
        this.$set(this.centerData,'lng',data.lng)
        //  _this.centerData=[
        //            data.lat,
        //            data.lng
        // ]
        // console.log(this.centerData,'this.center showCountry')
      },
      showLastmileByRegion(id,name,level,poly){
          // console.log(id,name,level,poly,'location_code,has_next_level')
          if(id){
            this.ajaxLastmileListRegion(id)
          }
          if(level){
            this.ajaxRegionLocation( id )
          }else{
            this.pathArr=[]
            this.pathArr.push(poly)
          }
          this.setback(true)
          // console.log(this.pathArr,'pathArr')
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
        // console.log(newval,oldval,'11')
        if(newval){
           _this.showCountry(newval);
        }
      },
      regionLocation(newval,oldval){
         this.pathArr=this.regionLocation
        //  console.log(newval,'newval1111111111111')
      },
      backGo(newval,oldval){
         if(!newval&&this.country&&this.location_code){
             this.ajaxLastmileList( this.country )
             this.ajaxRegionLocation( this.location_code )
         }
      },
      country_list(newval,oldval) {
           const _this = this;
            this.country_list.forEach( (el,index) => {
              // console.log(this.country_list,'this.country_list')
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
                // if(index==0){
                //    this.center=[
                //      el.lat,
                //      el.lng
                //    ]
                   
                //  }

               data.icon={
                  iconUrl: require("../../../assets/img/map-marker.png"),
                  iconSize: [32, 32],
                  iconAnchor: [16, 16]
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
              //  this.markers.push(data)
              //  console.log(this.markers,'this.markers')

                if(_this.markers.length<_this.country_list.length&&data.lastmile_count){
                     _this.markers.push(data)
                   }
                 if(_this.$route.query){
                    if(_this.$route.query.country==el.country){
                        this.$set(_this.centerData,'lat',el.lat)
                        this.$set(_this.centerData,'lng',el.lng)
                  //       _this.centerData=[
                  //    el.lat,
                  //    el.lng
                  //  ]
                    //  console.log(el.zoom,this.centerData,'this.center11111111111')
                        
                        _this.defaultZoom = el.zoom > 7 ? 7 : el.zoom;
                        
                    }
                 }
                
            })

       }
    }
}
</script>

<style scoped>
.googles{
    height:100%;
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
.positionRight{
      position: absolute;
      top:20px;
      right:0;
      z-index:1000;
      
      height:50px;
      background:rgba(244,179,61,.6);
      border-radius:30px 0 0 30px;
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