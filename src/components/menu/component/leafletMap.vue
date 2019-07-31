<template>
  <div  class="container googles" id="map">
    <div slot="visible" class="positionRight flexs a-center">
                 <span style="color:white;font-size:18px;padding:0 20px;" class="hiddenT">{{news.PSQY}}</span>
    </div>
    <l-map style="width: 100%; height: 100%;" :zoom="defaultZoom" :center="centerData" @update:center="centerUpdated">
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
      <l-polygon
      :key="poly.id + index +index"
      v-for="(poly, index) in pathArr1"
      :lat-lngs="poly.paths"
      :color="color"
      :weight="weight"
      :opactiy="opactiyCity"
      :fillColor="color"
      :fillOpacity="opactiyCity"
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
      childCity: {
            type: Object,
            default:{}
      },
      childNameMap:{
            type: Object,
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
    LTooltip,
  },
  data () {
    return {
      centerData:[8, 110],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '',
      marker: L.latLng(8, 110),
      text: 'this is a marker',

      color:'#F4B33D',
      opactiy:0.1,
      opactiyCity:0.4,
      weight:.2,
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
      pathArr1:[],
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
      this.getLastmileList( [] )
      
      
      if(this.$route.query.country){
        const _this=this;
        this.ajaxLastmileListRegion( _this.$route.query.code )
        this.ajaxRegionLocation( _this.$route.query.code )
        this.country= this.$route.query.country
      }
      this.$emit('childList',this.markers)
      this.ajaxOverviewCountry()
      this.ajaxCountrylist()
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
        this.opactiy=0.1;
        this.pathArr1=[];
        
        // this.$set(this.centerData,'lat',data.lat)
        // this.$set(this.centerData,'lng',data.lng)
         _this.centerData=[
                   data.cnt_lat,
                   data.cnt_lng
        ]
        this.getLastmileList( [] )
        this.getRegionLocation( [] )
        // let obj={}
        // obj['country']=data.country
        // this.ajaxLastmileList( this.$qs.stringify(obj) )
        this.ajaxLastmileListRegion(data.location_code)
        this.ajaxRegionLocation( data.location_code )
        this.country=data.country
        this.location_code=data.location_code
        this.setback(false)
        

        setTimeout(() => {
           this.defaultZoom = data.zoom;
        }, 500);
        var date = { c:data.country,lc:data.location_code }
        this.$emit('childPost',date)
        // console.log(this.centerData,'this.center showCountry',this.defaultZoom,data)
      },
      showLastmileByRegion(id,name,level,poly){
          this.opactiy=0
          // console.log(id,name,level,poly,'location_code,has_next_level')
          if(id){
            this.ajaxLastmileListRegion(id)
          }
          if(level){
            this.ajaxRegionLocation( id )
          }else{
            this.pathArr1=[]
            this.pathArr1.push(poly)
          }
          this.setback(true)
          // console.log(this.pathArr,'pathArr')
          var data = { c:id,lc:this.$route.query.code }
          this.$emit('childPost',data)
          
      }
    },

    watch: {
      $route: {
        handler: function(val, oldVal){
          // console.log(val,oldVal,'$route1');
           if(val.fullPath!=oldVal.fullPath){
              // console.log(val,oldVal,'$route2');
           }
        },
        // 深度观察监听
        deep: true
      },
      childProvince(newval,oldval){
          const _this=this;
          if(newval){
              // console.log(newval,'newval,oldval',this.markers)

              _this.markers.forEach(el=>{
                if(el.content['country']==newval){
                    // console.log(el.content,'el.content')
                    _this.showCountry(el.content);
                    return;
                }
                  
              })

          }
      },
      childCity(newval,oldval){
          //  console.log(newval,'newval')
           const _this=this;
           if(newval.type==0){
               _this.markers.forEach(el=>{
                 if(el.content['location_code']==newval.c){
                     _this.showCountry(el.content);
                     return;
                 }
               })
           }else if(newval.type==1){
               _this.regionLocation.forEach(el => {
                 if(el.id==newval.c){
                   this.showLastmileByRegion(el.id,el.name,el.next_level,el) 
                 }
               })
           }
      },
      childNameMap(newval,oldval){
        const _this=this;
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
            //  this.ajaxLastmileList( this.country )
             this.ajaxRegionLocation( this.location_code )
         }
      },
      country_list:{
        handler:function(newval,oldval){
           const _this = this;
            this.country_list.forEach( (el,index) => {
              // console.log(this.country_list,'this.country_list')
               let data={}
               if(_this.$route.query){
                    if(_this.$route.query.country==el.country){
                        _this.centerData=[el.cnt_lat,el.cnt_lng]
                        // this.$set(_this.centerData,'lat',el.lat)
                        // this.$set(_this.centerData,'lng',el.lng)
                        
                        setTimeout(() => {
                           _this.defaultZoom = el.zoom;
                        }, 500);

                        
                    }
                 }
                 if(_this.overview){
                     for(let key in _this.overview){
                       if(el.country==key){
                          data.lastmile_count=_this.overview[key].lastmile_count.toString()
                          data.country_name=_this.overview[key].country_name
                       }
                     }
                  }

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
               

                if(_this.markers.length<_this.country_list.length&&data.lastmile_count){
                     _this.markers.push(data)
                   }
                 
                
            })
            

       },deep:true
       }
    }
}
</script>

<style scoped>
.googles{
    height:100%;
	width:100%;
	padding:0px;
  position: relative;
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