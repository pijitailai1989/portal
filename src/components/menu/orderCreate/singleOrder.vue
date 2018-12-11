<template>
  <div>
    <div>
        <PocessState :postNum="statusNum" :statusArr="statusArr" @postStatus="getStatus"/>
    </div>
    <div v-if="statusNum==1" style="width:100%;padding:20px 0;">
        <div class="flexs j-between a-center" style="height:80px;" v-if="GetRess.length>0">
            <h1 class="box-title" style="margin-bottom: 0;">
                {{menu.Confirm_address}}
            </h1>
            <div style="width:130px;">
                <span style="font-size:16px;color:#2F9AC0;cursor:pointer;" @click="routerLink('/menu/AccountSettings/AddressManagement')">
                      管理发货地址
                </span>
            </div>
        </div>
         <ul class="address" v-if="GetRess.length>0">
              <li  @mouseover="btnOver(index)" @mouseout="btnOut(index)" class="flexs a-center" @click="deliveryClick(item,index)" v-for="(item,index) in GetRess" :key="index" :class="[item.btnClick?'active':'']" >
                  <i v-if="item.btnClick" class="iconfont icon-dingweiweizhi" style="color: #2F9AC0;font-size: 18px"/>
                  <!-- <span v-if="index==0">{{menu.Send}}</span> -->
                  <i class="iconfont " :class="[item.btnClick?'icon-quan1':'icon-wo']" :style="{color: item.btnClick?'#2F9AC0':'#aaa',fontSize:item.btnClick?'15px':'18px'}"/>
                  <p class="hiddenT" :style="{color:item.btnClick?'':'#aaa'}" @mouseover="btnOver(index)">{{item.country}}{{item.city}}{{item.address}} ( {{item.name}} ) {{item.phone}}</p>

                  
                  <span class="flexs rows j-end">
                       <a v-show="item.is_default=='1'" style="color:#ccc;">默认地址</a>
                       <a v-if="item.btn" v-show="item.is_default=='0'" @click.stop="setDefault(item,'default')">{{menu.default_address}}</a>
                       <a v-show="item.btnClick" @click.stop="setDefault(item,'updata')">{{menu.Modify}}</a>
                  </span>
              </li>
              <!-- <li class="flexs a-center" style="padding-left:98px;">
                  <i class="iconfont icon-wo" style="color: #aaa;font-size: 18px"/>
                  <p class="hiddenT" style="color:#aaa;">中国广东省深圳市-南山区科苑北路南头街道-花样年华大厦8楼1302（李美丽收）1758-5865-6874</p>
                  <a>设为默认地址</a>
              </li> -->
         </ul>
         <div @click="addRessFn"  v-if="GetRess.length>0" class="flexs j-center a-center" style="cursor: pointer;height:40px;">
              <i class="iconfont icon-jiajianzujianjiahao" style="color: #F4B33D;font-size: 16px"/>
              <span style="color:#F4B33D;font-size:16px;margin-left:10px;">{{menu.Add_address}}</span>
         </div>
         <div v-else style="margin-top:30px;">
             <el-row class="from-row">
                    <el-col :span="2" class="label-title">
                        <label class="Mandatory">发货国</label> 
                    </el-col>
                    <el-col :span="7">
                        <el-select
                            v-model="defaultCountry"
                            filterable
                            class="custom-made"
                            >
                            <el-option v-for="(item,index) in GetAddress" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <div @click="addRessFn" class="flexs j-center a-center" style="cursor: pointer;height:40px;">
                           <i class="iconfont icon-jiajianzujianjiahao" style="color: #F4B33D;font-size: 16px"/>
                           <span style="color:#F4B33D;font-size:16px;margin-left:10px;">{{menu.Add_address}}</span>
                         </div>
                    </el-col>
             </el-row>
             
         </div>
         
    </div>
    <div v-if="statusNum==1" class="flexs columns" style="margin-top:30px;">
      <h1 class="box-title">{{menu.Shipping_address}}</h1>
      <div class="chart-container">
          <el-form ref="form"  @submit.native.prevent="postSingle">
             <el-row class="from-row">
                <el-col :span="2" class="label-title">
                    <label class="Mandatory">{{menu.contact}}</label> 
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text" :maxlength="20" pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,20}" title="长度不能超过20" :placeholder="menu.Please_person" required v-model="form.name"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="2" :offset="2" class="label-title">
                    <label class="Mandatory">{{menu.Contact_phone}}</label>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <div class="custom-made">
                            <i class="units1">+</i>
                            <el-input type="text" :maxlength="4" pattern="[0-9]{1,4}" title="长度不能超过4" style="width:70px;" :placeholder="menu.area_code" v-model="form.phone_district" required class="weight-input"></el-input>
                            <el-input type="tel" :maxlength="16" pattern="[0-9]{1,16}" title="长度不能超过16" style="width:160px;margin-left:10px;"
                             required v-model="form.phone"  :placeholder="menu.Please_contact"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="2" class="label-title">
                    <label>{{menu.zip_code}}</label>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input :placeholder="menu.Please_zipcode" type="text" :maxlength="15" pattern="[0-9]{1,15}" title="长度不能超过15" v-model="form.postcode"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="2" :offset="2" class="label-title">
                    <label>{{menu.Email}}</label>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input  :placeholder="menu.Please_email" type="email" :maxlength="100" v-model="form.email"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="2" class="label-title">
                    <label class="Mandatory">{{menu.destination}}</label>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-select
                            v-model="form.country"
                            filterable
                            class="custom-made"
                            @change="clearableFn('from');cityData(form.country,'from');"
                            >
                            <el-option v-for="(item,index) in GetDestination" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2" :offset="2" class="label-title">
                    <label class="Mandatory">{{menu.city}}</label>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-select
                            v-model="form.city"
                            filterable
                            class="custom-made">
                            <el-option v-for="(item,index) in GetDstCity" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="2" class="label-title">
                    <label  class="Mandatory">{{menu.Detailed_address}}</label>
                </el-col>
                <el-col :span="18">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input  pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,255}" title="不能超过255" :maxlength="255" :placeholder="menu.Please_address" v-model="form.address"  type="text" required class="weight-input1"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            
            
            <div style="margin-top:40px;text-align:center;">
                <button  type="submit" class="next-step" style="text-align:center">{{menu.next_step}}</button>
                <!-- <span @click="routerLink('/menu/logisticsService#calculator')" style="margin-left:20px;color:#2F9AC0;font-size:14px;cursor: pointer;" v-show="session">{{menu.previous_step}}</span> -->
            </div>  
                 
        </el-form>
      </div>
      
    </div>


    <div v-else-if="statusNum==2" class="rows flexs j-between" style="margin-top:30px;">
      <h1 class="box-title">{{menu.parcel_information}}</h1>
      <div class="chart-container">
          <el-form ref="form"  @submit.native.prevent="submitPackage">
            <el-row class="from-row">
                <el-col :span="2" class="label-title">
                    <label>{{menu.Package_size}}</label>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input type="number" min="1" v-if="form.width" required :placeholder="menu.length" v-model="form.length" class="weight-input"></el-input>
                            <el-input type="number" min="1" v-else-if="form.height" required :placeholder="menu.length" v-model="form.length" class="weight-input"></el-input>
                            <el-input type="number" min="1" v-else  :placeholder="menu.length" v-model="form.length" class="weight-input"></el-input>×

                            <el-input min="1" v-if="form.length" type="number" required :placeholder="menu.width" v-model="form.width" class="weight-input"></el-input>
                            <el-input min="1" v-else-if="form.height" type="number" required :placeholder="menu.width" v-model="form.width" class="weight-input"></el-input>
                            <el-input min="1" v-else type="number"  :placeholder="menu.width" v-model="form.width" class="weight-input"></el-input>×

                            <el-input min="1" type="number" v-if="form.length" required :placeholder="menu.highly" v-model="form.height" class="weight-input"></el-input>
                            <el-input min="1" type="number" v-else-if="form.width" :placeholder="menu.highly" required v-model="form.height" class="weight-input"></el-input>
                            <el-input min="1" type="number" v-else :placeholder="menu.highly" v-model="form.height" class="weight-input"></el-input>
                            <i class="units">cm</i>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="from-row">
                <el-col :span="2" class="label-title">
                    <label class="Mandatory">{{menu.parcel_weighs}}</label>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input v-model="form.weight" min="1" :placeholder="menu.Please_weight" type="number" required></el-input>
                            <i class="units">g</i>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="2" :offset="2" class="label-title">
                    <label class="Mandatory">{{menu.Monetary_unit}}</label>
                </el-col>
                <el-col :span="9">
                    <el-form-item>
                        <el-select
                            v-model="form.sensitive"
                            filterable
                            class="custom-made">
                            <el-option v-for="(item,index) in GetPackage.currency" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span=24>
                    <ul class="tableUl">
                        <li class="flexs">
                            <label class="Mandatory describe">{{menu.Description_goods}}</label>
                            <!-- <label class="Mandatory type">货物类型</label> -->
                            <label class="Mandatory price">{{menu.price}}</label>
                            <label class="Mandatory num">{{menu.number}}</label>
                            <label class="sku">SKU</label>
                            <label class="sensitive">{{menu.Sensitive_type}}</label>
                            <label class="del" v-show="desTable.length>1"></label>
                        </li>
                        <li class="flexs" v-for="(item,index) in desTable" :key="index">
                            <span class="describe custom-made1"><el-input type="text" required class="weight-input1" v-model="item.description"  :placeholder="menu.Please_describe"></el-input></span>
                            <!-- <span class="type custom-made1">
                                <el-select
                                    v-model="item.category"
                                    class="weight-input1"
                                    id="origin">
                                    <el-option v-for="(todo,index) in quoteSingle.items" :label="todo" :value="index" :key="index"></el-option>
                                </el-select>
                            </span> -->
                            <span class="price custom-made1"><el-input type="text" pattern="(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,2}" title="最多两位小数" required  class="weight-input1" v-model="item.unit_price"  :placeholder="menu.Please_fillprice"></el-input></span>
                            <span class="num custom-made1"><el-input type="number" min="1" required class="weight-input1" v-model="item.quantity" :placeholder="menu.Please_number"></el-input></span>
                            <span class="sku custom-made1"><el-input class="weight-input1" v-model="item.sku" placeholder="sku"></el-input></span>
                            <span class="sensitive">
                                  <span class="flexs j-between">
                                      <a v-for="(el,index) in GetPackage.sitems" :key="index">{{el}}</a>
                                  </span>
                                  <el-checkbox-group v-model="item.sensitive_code1" class="flexs j-between">
                                    <el-checkbox v-for="(el,index) in GetPackage.sitems" :label="index" :key="index"></el-checkbox>
                                  </el-checkbox-group>
                            </span>
                            <span class="del flexs a-center j-center"  v-show="desTable.length>1" @click="delTable(index)">
                                <i class="iconfont icon-shanchu" style="color: #2F9AC0;font-size: 28px"/>
                            </span>
                        </li>
                        
                    </ul>
                </el-col>
            </el-row>
            <div class="flexs a-center j-center" style="padding:40px 0;">
                <div @click="addTableFn" style="cursor: pointer;">
                     <i class="iconfont icon-jiajianzujianjiahao" style="color: #F4B33D;font-size: 16px"/>
                     <span style="color:#F4B33D;font-size:16px;">{{menu.Add_description}}</span>
                </div>
            </div> 
            <div :span="24" style="text-align:center;">
                <button type="submit" class="next-step">{{menu.next_step}}</button>
                <span @click="previousStep" style="margin-left:20px;color:#2F9AC0;font-size:14px;cursor: pointer;">{{menu.previous_step}}</span>
            </div>       
        </el-form>
      </div>
    </div>

    
    <div v-else-if="statusNum==3" style="margin-top:30px">
        <h1 class="box-title">{{menu.Logistics_service}}</h1>
        <LogisticsTable @posttoparent1="getfromchild1"/>
    </div>
    
    <MessageBox v-show="messageB" @posttoparent="getfromchild">
        <span v-if="updataRess" slot="header">{{menu.Add_address}}</span>
        <span v-else slot="header">{{menu.Revise_address}}</span>
        <div  v-if="updataRess" class="chart-container1">
          <el-form ref="shipper"  @submit.native.prevent="postAddress()">
             <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.contact}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text" pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,20}" title="长度不能超过20" :maxlength="20" required :placeholder="menu.Please_person" v-model="shipper.name"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.Contact_phone}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <i class="units1">+</i>
                            <el-input type="text"  pattern="[0-9]{1,4}" title="长度不能超过4" :maxlength="4" style="width:65px;" :placeholder="menu.area_code" v-model="shipper.phone_district" required class="weight-input"></el-input>
                            <el-input  type="text"  pattern="[0-9]{1,16}" title="长度不能超过16" :maxlength="16" style="width:140px;margin-left:10px;"
                             required :placeholder="menu.Please_contact" v-model="shipper.phone"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label>{{menu.zip_code}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text"  pattern="[0-9]{1,15}" title="长度不能超过15" :maxlength="15" :placeholder="menu.Please_zipcode" v-model="shipper.postcode"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label>{{menu.Email}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="email" :maxlength="100" :placeholder="menu.Please_email" v-model="shipper.email"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Point_origin}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-if="GetRess.length<=0&&disabledSelect"
                            v-model="shipper.country"
                            filterable
                            disabled
                            class="custom-made"
                            @change="clearableFn('shipper');cityData(shipper.country,'shipper');"
                            >
                            <el-option v-for="(item,index) in GetAddress" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                        <el-select
                            v-else
                            v-model="shipper.country"
                            filterable
                            class="custom-made"
                            @change="clearableFn('shipper');cityData(shipper.country,'shipper');"
                            >
                            <el-option v-for="(item,index) in GetAddress" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.city}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-model="shipper.city"
                            filterable
                            class="custom-made">
                            <el-option v-for="(item,index) in GetCity" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Detailed_address}}</label>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input type="text" pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,255}" title="不能超过255" :maxlength="255" required :placeholder="menu.Please_address" v-model="shipper.address" class="weight-input1"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        
            <div :span="24" style="text-align:center;margin-top:40px;">
                <button type="submit" class="next-step">{{menu.save}}</button>
            </div>       
         </el-form>
        </div>
        <div class="chart-container1" v-else>
          <el-form ref="shipper" @submit.native.prevent="ajaxUpdate(shipper.id,'updata')">
             <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.contact}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text"  pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,20}" title="长度不能超过20" :maxlength="20" required :placeholder="menu.Please_person" v-model="shipper.name"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.Contact_phone}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <i class="units1">+</i>
                            <el-input type="text"  pattern="[0-9]{1,4}" title="长度不能超过4" :maxlength="4" style="width:65px;" :placeholder="menu.area_code" v-model="shipper.phone_district" required class="weight-input"></el-input>
                            <el-input  type="text"  pattern="[0-9]{1,16}" title="长度不能超过16" :maxlength="16" style="width:140px;margin-left:10px;"
                             required :placeholder="menu.Please_contact" v-model="shipper.phone"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label>{{menu.zip_code}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text"  pattern="[0-9]{1,15}" title="长度不能超过15" :maxlength="15" :placeholder="menu.Please_zipcode" v-model="shipper.postcode"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label>{{menu.Email}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="email" :maxlength="100" :placeholder="menu.Please_email" v-model="shipper.email"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Point_origin}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-model="shipper.country"
                            filterable
                            class="custom-made"
                            @change="clearableFn('shipper');cityData(shipper.country,'shipper');"
                            >
                            <el-option v-for="(item,index) in GetAddress" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.city}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-model="shipper.city"
                            filterable
                            class="custom-made">
                            <el-option v-for="(item,index) in GetCity" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Detailed_address}}</label>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input type="text" pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,255}" title="不能超过255" required :maxlength="255" :placeholder="menu.Please_address" v-model="shipper.address" class="weight-input1"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            
            
            
            <div :span="24" style="text-align:center;margin-top:40px;">
                <button type="submit" class="next-step">{{menu.save}}</button>
            </div>       
         </el-form>
        </div>
    </MessageBox>
    <el-dialog
        :visible.sync="centerDialogVisible"
        :show-close="false"
        :lock-scroll="false"
        :close-on-click-modal="false"
        width="30%"
        style="border-radius:20px;"
        top="40vh"
        center>
        <div class="mainContent flexs a-center j-center"><i class="iconfont icon-chenggong2" style="color: #2F9AC0;font-size: 30px;margin-right:10px;"/>{{menu.Order_successfully}}</div>
        <span slot="footer" class="dialog-footer">
            <button class="confrimDialog" @click="submitOk()">{{menu.determine}}</button>
        </span>
    </el-dialog>
  </div>
</template>

<script>   
import DeliveryGoods from '../component/deliveryGoods.vue'     
import LogisticsTable from '../component/logisticsTable.vue'     
import PocessState from '../component/processState'
import RangeSlider from '@/components/common/progressBar/thickBar'
import MessageBox from '@/components/common/messageBox'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {  
  components: {
      RangeSlider,
      PocessState,
      MessageBox,
      DeliveryGoods,
      LogisticsTable
  },
  data() {
    return {
        centerDialogVisible:false,
        defaultBtn:false,
        messageB:false,
        desTable:[
            {
                description:'',
                quantity:'',
                sku:'',
                unit_price:'',
                sensitive_code1:[]
            }
        ],
        originList: [],
        destinationList: [],
        areaList: [],
        commodityList: [],
        form: {
          region: '',
          destination: '',
          area: '',
          district: '',
          cateogory: '',
          packgeValue: null,
          length: '',
          width: '',
          height: '',
          sensitive: '',

          name:'',
	      phone:'',
	      postcode:'',
	      email:'',
	      country:'',
	      city:'',
          address:'',
          phone_district:''
        },
        shipper:{
          name:'',
	      phone:'',
	      postcode:'',
	      email:'',
	      country:'',
	      city:'',
          address:'',
          phone_district:''
        },
        shipper1:{
          name:'',
	      phone:'',
	      postcode:'',
	      email:'',
	      country:'',
	      city:'',
          address:'',
          phone_district:''
        },
        productTable: [],
        isEmpty: false,
        loading: false,
        statusNum:1,
        updataRess:true,
        session:{},
        routerUrl:'',
        defaultCountry:'',
        product_id:'',
        rate_card_id:'',
        disabledSelect:false,
        statusArr:[
             {name:'Fill_address',status:1,color:false},
             {name:'Fill_order',status:2,color:false},
             {name:'Select_logistics',status:3,color:false},
             {name:'Order_successfully',status:4,color:false}
         ]
    }
  },

  
  computed:{
    // sellerInfo(){
    //   return this.$store.state.home.sellerInfo
    // },
    ...mapState('menu',[
                        'GetProductInfo',
                        'GetPackage',
                        'GetRess',
                        'GetAddress',
                        'GetCity',
                        'GetDestination',
                        'GetDstCity'
                        ]),
    menu(){
          return this.$t('menu')
          }
  },
  created(){
      
  },
  mounted() {
      this.ajaxGetress()
      this.ajaxAddress()
      if(this.GetRess.length>=1){
        //    this.ajaxGetDestination(this.GetRess[0].country)
           this.shipper1=this.GetRess[0]
      }
      
      this.session = JSON.parse( sessionStorage.getItem('params') )
      if(this.session&&this.GetRess.length>=1){
          this.ajaxGetCity1( this.session.dst )
          this.form.country= this.session.dst
          this.form.city= this.session.city
          sessionStorage.removeItem('params')
        // console.log(this.GetRess)
      }else if(this.session){
        //    this.ajaxGetCity1( Object.keys(this.GetDestination)[0] )
        //    this.form.country= Object.keys(this.GetDestination)[0]
        //    this.form.city= Object.values(this.GetDstCity)[0]
        sessionStorage.removeItem('params')
      }
    //   this.shipper.country= Object.keys(this.GetAddress)[0]
    //   this.ajaxGetCity( Object.keys(this.GetAddress)[0] )
    //   this.shipper.city= Object.values(this.GetCity)[0]

      
  },
  
  watch:{
      statusNum(curVal,oldVal){
          if(curVal==1){
             this.disabledSelect=false;
          }
      },
     messageB(curVal,oldVal){
         if(curVal==false){
              this.shipper={
              name:'',
	          phone:'',
	          postcode:'',
	          email:'',
              address:'',
              phone_district:''
            }
         }else{
             
         }
         
     },
     
     GetRess(curVal,oldVal){
        //  if(curVal!=oldVal){
            // this.ajaxGetCity1( Object.keys(this.GetDestination)[0] )
        //     this.form.country= Object.keys(this.GetDestination)[0]
        //     this.form.city= Object.values(this.GetDstCity)[0]
            
        //  }
          if(curVal.length<=0){
              let data={}
              data.dst={}
              this.getDestination(data)
              this.getDstCity()
              this.defaultCountry=Object.keys(this.GetAddress)[0]
              this.ajaxGetDestination(this.defaultCountry)
              this.shipper.country=this.defaultCountry
              console.log('watch监听--没有发货地址')
          }else{
              this.shipper1=this.GetRess[0]
              this.ajaxGetDestination(curVal[0].country)
              console.log('watch监听--有发货地址')
          }
        //  console.log(curVal,oldVal,'curVal,oldVal')
     },
     
  },
  updated(){
      
  },
  methods: {
    
    ...mapMutations('menu',[
                            'getCity',
                            'btnOver',
                            'btnClick',
                            'btnOut',
                            'getRess',
                            'getDestination',
                            'getDstCity'
                            ]),
    ...mapActions('menu', [
                           'ajaxUpdateAddress',
                           'ajaxGetPackage1',
                           'ajaxGetPackage',
                           'ajaxQuoteSingle',
                           'ajaxGetress',
                           'ajaxGetAddress',
                           'ajaxGetCity',
                           'ajaxGetCity1',
                           'ajaxPostAddress',
                           'ajaxGetDestination',
                           'ajaxStageProduct'
                           ]),
    async selectProduct(product_id,rate_card_id) {
        const _this = this;
        let data={}
        data.rate_card_id=rate_card_id;
        data.product_id=product_id
        if(_this.GetRess.length<=0){
            data.shipper={
                name:_this.shipper.name,
                phone:_this.shipper.phone,
                postcode:_this.shipper.postcode,
                email:_this.shipper.email,
                country:_this.shipper.country,
                city:_this.shipper.city,
                address:_this.shipper.address,
                phone_district:_this.shipper.phone_district
            }
        }
        let res = await this.ajaxStageProduct( _this.$qs.stringify(data) )
        if(res.status===200){
            this.statusNum=4;
            this.centerDialogVisible=true;
            if(_this.GetRess.length<=0){
               this.messageB=false;
            }
            
        }
        // console.log(res)
        return res
    },
    deliveryClick(data,index){
        this.btnClick(index);
        this.shipper1=data;
        // console.log(this.shipper1,'this.shipper1')
    },
                     
    routerLink(path){
       this.$router.push(path)
    },
    clearableFn(type){
       if(type==='shipper'){
        //    console.log(111111)
        //    this.shipper.city=''
           this.$set(this.shipper,'city','')
       }else if(type==='from'){
        //    console.log(2222222)
           this.$set(this.form,'city','')
        //    this.form.city=''
       }
    },
    async cityData(dst,type){
      let res=null
      if(type=='shipper'){
         let obj={}
         this.getCity(obj)
         res = await this.ajaxGetCity(dst)
        //  console.log(1111111111111111111111111111111111111)
        //  this.shipper.city=''
         
      }else{
          let obj={}
          this.getDstCity(obj)
          res = await this.ajaxGetCity1(dst)
        //   this.form.city=''
         
      }
      return res
    },
    getfromchild1(val){
        console.log(val,'选择物流服务')
       
       if(this.GetRess.length>=1){
           this.selectProduct(val.product_id,val.rate_card_id)
           
       }else{
           this.disabledSelect=true;
           this.shipper.country=this.defaultCountry;
           this.messageB=true
           this.updataRess=true;
           this.rate_card_id=val.rate_card_id;
           this.product_id=val.product_id

       }
    },
    async ajaxAddress() {
      let res = await this.ajaxGetAddress()
      
      return res
    },
    async submitPackage(){
        const _this = this ;
        _this.desTable.forEach(el=>{
            el.sensitive_code=el.sensitive_code1.join(",")
        })
        let data={}
        if(!_this.form.sensitive){
            this.$message({
                       showClose: true,
                       message: '请选择货币单位！',
                       type: 'warning'
            });
            return
        }
        data.currency=_this.form.sensitive;
        
        data.weight=_this.form.weight;
        if(_this.form.length&&_this.form.width&&_this.form.height){
           data.dim=`${_this.form.length},${_this.form.width},${_this.form.height}`;
        }
        data.items=_this.desTable;
        let res = await this.ajaxGetPackage1( _this.$qs.stringify(data) )
        if(res){
            _this.statusNum=3;
            document.documentElement.scrollTop=0
            document.body.scrollTop=0
            window.pageYOffset=0
        }
        // console.log(this.GetProductInfo)
        return res
    },
    async postSingle(){
        const _this=this;
        // if(!_this.shipper1.country){
        //     this.$message({
        //                showClose: true,
        //                message: '请选择发货地址！',
        //                type: 'warning'
        //     });
        //     return
        // }
        if(!_this.form.country){
            this.$message({
                       showClose: true,
                       message: '请选择目的地',
                       type: 'warning'
            });
            return
        }
        if(!_this.form.city){
            this.$message({
                       showClose: true,
                       message: '请选择城市',
                       type: 'warning'
            });
            return
        }
        // console.log(_this.shipper1,'_this.shipper1')
        let data={}
         data.consignee={
            name:_this.form.name,
            phone:_this.form.phone,
            postcode:_this.form.postcode,
            email:_this.form.email,
            country:_this.form.country,
            city:_this.form.city,
            address:_this.form.address,
            phone_district:_this.form.phone_district
          }
          if(_this.GetRess.length>=1){
                data.shipper={
                    name:_this.shipper1.name,
                    phone:_this.shipper1.phone,
                    postcode:_this.shipper1.postcode,
                    email:_this.shipper1.email,
                    country:_this.shipper1.country,
                    city:_this.shipper1.city,
                    address:_this.shipper1.address,
                    phone_district:_this.shipper1.phone_district
                }
          }else{
              data.shipper={
                  country:_this.defaultCountry
              }
              this.shipper.country=this.defaultCountry
          }
        let res = await this.ajaxQuoteSingle( _this.$qs.stringify(data) )
        // console.log(res,'res')
        if(res.status==200){
            document.documentElement.scrollTop=0
            document.body.scrollTop=0
            window.pageYOffset=0
            _this.statusNum=2;
            _this.ajaxGetPackage();
            _this.form.sensitive=Object.values( _this.GetPackage.currency )[0]
        }
        return res
    },
    async setDefault(item,type){
        const _this=this;
        let data={}
        
        if(type==='updata'){
           _this.updataRess=false;  
           _this.messageB=true;
           _this.shipper=item

        //    data={
        //     name:_this.shipper.name,
        //     phone:_this.shipper.phone,
        //     postcode:_this.shipper.postcode,
        //     email:_this.shipper.email,
        //     country:_this.shipper.country,
        //     city:_this.shipper.city,
        //     address:_this.shipper.address,
        //     phone_district:_this.shipper.phone_district,
        //     is_default:'1'
           
        //    }
        }else if(type==='default'){
           data={
            type:'shipper',
            name:item.name,
            phone:item.phone,
            postcode:item.postcode,
            email:item.email,
            country:item.country,
            city:item.city,
            address:item.address,
            phone_district:item.phone_district,
            is_default:'1',
            id:item.id
           }
           _this.ajaxUpdate(data,type)
        }
        
        
    },
    previousStep(){
        this.statusNum=1
    },
    submitOk(){
        this.centerDialogVisible = false
        this.statusNum=1
        this.ajaxGetress()
    },
    addRessFn(){
        this.messageB=true
        this.updataRess=true;
    },
    async ajaxUpdate(data,type){
        const _this=this;
        let res=null
        if(type==='default'){
            res = await this.ajaxUpdateAddress( _this.$qs.stringify(data) )
        }else if(type==='updata'){
            let date={
                    name:_this.shipper.name,
                    phone:_this.shipper.phone,
                    postcode:_this.shipper.postcode,
                    email:_this.shipper.email,
                    country:_this.shipper.country,
                    city:_this.shipper.city,
                    address:_this.shipper.address,
                    phone_district:_this.shipper.phone_district,
                    is_default:_this.shipper.is_default,
                    id:data,
                    type: 'shipper'
                     }
            res = await this.ajaxUpdateAddress( _this.$qs.stringify(date) )
        }
       
        if(res.status===200){
            this.ajaxGetress()
            
            this.messageB=false;
        }
        return res
    },
    async postAddress(){
        const _this=this;
        if(_this.GetRess.length<=0&&_this.disabledSelect){
            this.disabledSelect=false;
            _this.selectProduct(_this.product_id,_this.rate_card_id)
        }
        if(!_this.shipper.country){
            this.$message({
                       showClose: true,
                       message: '请选择发货地',
                       type: 'warning'
            });
            return
        }
        if(!_this.shipper.city){
            this.$message({
                       showClose: true,
                       message: '请选择城市',
                       type: 'warning'
            });
            return
        }

        let data={
            name:_this.shipper.name,
            phone:_this.shipper.phone,
            postcode:_this.shipper.postcode,
            email:_this.shipper.email,
            country:_this.shipper.country,
            city:_this.shipper.city,
            address:_this.shipper.address,
            phone_district:_this.shipper.phone_district,
            is_default:'0'
           
        }

        let res = await this.ajaxPostAddress( _this.$qs.stringify(data) )
        if(res.status===200){
            
            if(_this.GetRess.length>=1){
               this.messageB=false;
               this.ajaxGetress()
            }
            
            
        }

        return res
    },
    getStatus(val){
        this.statusNum=val
    },
    addTableFn(){
        let data={
                description:'',
                quantity:'',
                sku:'',
                unit_price:'',
                sensitive_code1:[]
            }
            this.desTable.push(data)
    },
    delTable(index){
          this.desTable.splice(index,1)
    },
    getfromchild(val){
       this.messageB=val
    }

    
  },
  updated(){
  },

}

</script>

<style scoped>
    .address{
        width:100%;
        
    }
    .address>li{
        margin-bottom:10px;
        height:40px;
        padding:0 10px 0 45px;
        cursor:pointer;
    }
    .address>li.active{
        padding:0 10px;
        height:54px;
        background:rgba(246,250,251,1);
        border-radius:27px;
        border:1px solid #2F9AC0;
    }
    .address>li>i{
        padding:0 8px;
    }
    .address>li>p,.address>li>span{
        font-size: 16px;
    }
    .address>li>span{
        width:180px;
        color:#2F9AC0;
    }
    .address>li>p{
        width:700px;
        color:#333;
        height: 54px;
        line-height: 54px;

    }
    .address>li>span>a{
        margin-right:10px;
        font-size: 16px;
        color:#2F9AC0;
        cursor:pointer;
    }
    .sensitive a{
        flex:1;
        text-align: center;
        font-size:14px;
        color:#333;
    }
    .sensitive a:last-child{
        text-align: right;
    }
    .sensitive a:first-child{
        text-align: left;
    }
    .sensitive .el-checkbox-group label{
        padding:0 5px
    }
    .tableUl{
        min-width: 860px;
    }
    .tableUl>li{
        border-bottom:1px dashed #eee;
        padding:20px 0;
    }
    .tableUl>li:last-child{
        border-bottom:0;
    }
    .tableUl>li:first-child{
        padding:10px 0;
    }
    li .describe{
      position: relative;
      width:320px;
    }
    li .type{
       position: relative;  
       width: 120px;
    }
    li .price{
      position: relative;  
      flex:1
    }
    li .num{
      position: relative; 
      flex:1
    }
    li .sku{
      position: relative;  
      flex:1
    }
    li .sensitive{
       position: relative; 
       width: 180px;
    }
    li .del{
       position: relative; 
       width: 40px;
       margin-left:20px;
       cursor:pointer;
    }
    .Mandatory::before{
        content:'*';
        color:red;
        margin-right:5px;
    }
    .box-title{
        font-size:18px;
        font-weight:600;
        color:#999;
        line-height:25px;
        margin-bottom: 30px;
    }
    .chart-container{
        width: 100%;
        min-height:300px;
        padding: 31px 38px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
        border-radius:7px;
    }
    .chart-container1{
        width: 100%;
        min-height:300px;
        padding: 40px 40px;
    }

    .blue-topBorder{
        border-top: 5px solid #2F9AC0;
    }

    .table-container{
        padding: 20px;
        height: auto;
    }

    .label-title{
        line-height: 40px;
        text-align: center;
    }

    .from-row{
        margin-bottom: 15px;
    }

    .custom-made{
        position: relative;
        width: 100%;
    }
    .custom-made1{
        position: relative;
        width: 100%;
    }
    .units{
        position: absolute;
        top: 0;
        right: 8px;
        color: #333333;
        font-weight: bold;
    }
    .units1{
        font-size:18px;
        color: #333333;
        font-weight: bold;
    }
    .weight-input{
        width: 28%;
    }
    .weight-input1{
        width: 100%;
    }
    .next-step{
        display: inline-block;
        outline: none;
        border: 0;
        width:260px;
        height:50px;
        line-height: 50px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
        font-size:20px;
        font-weight:500;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }
    .date-text{
        margin-top: 10px;
    }
    .rank-text{
        margin-top: 4px;
    }
    .price-tariff{
        font-size: 16px;
        color: #333333;
    }
    .selected-product{
        font-size:16px;
        color:rgba(47,154,192,1);
        cursor: pointer;
    }
    .success-icon{
        padding: 12px;
        color: #ffffff;
        border-radius: 50%;
        margin-right: 15px;
        background:rgba(47,154,192,1);
    }
    .mainContent{
        font-size:20px;
        font-weight:600;
        text-align: center;
        color:rgba(51,51,51,1);
        line-height:42px;
    }
    .confrimDialog{
        width:200px;
        height:50px;
        border: none;
        outline: none;
        color: #ffffff;
        font-size: 16px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
    }
</style>