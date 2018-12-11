<template>
  <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="运送时间"
            align="center"
            width="180">
            <template slot-scope="scope">
                <range-slider style="width: 63%;" :min="2" :max="5"/>
                <p class="date-text">2~5天</p>
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            align="center"
            label="星级评价">
            <template slot-scope="scope">
                <el-rate
                    v-model="value5"
                    disabled
                    void-color="#E78483"
                    score-template="{value}">
                </el-rate>
                <p class="rank-text">{{ value5 }}分</p>
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            align="center"
            label="物流公司">
            <template slot-scope="scope">
                <div>
                    <div style="max-width: 89px; height: 39px; margin: 0 auto;">
                        <img
                            src="1.png"
                            style="display: block;width: 100%; height: 100%;">
                    </div>
                    <p style="font-size: 12px; text-align: center;">US-DHL</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            align="center"
            label="关税">
            <template slot-scope="scope">
                <strong class="price-tariff">￥998</strong>
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            align="center"
            label="总运费">
            <template slot-scope="scope">
                <strong class="price-tariff">￥198</strong>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
                <el-checkbox class="opt-checkboc" name="type"></el-checkbox>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import RangeSlider from '@/components/common/progressBar/thickBar'
export default {
  components: {
    RangeSlider
  },
  data() {
    return {
         value5: 4,
         tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },

  methods: {}
}

</script>
<style scoped>
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
</style>