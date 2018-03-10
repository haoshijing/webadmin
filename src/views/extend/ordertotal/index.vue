<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-date-picker
        v-model="orderTime"
        type="daterange"
        align="right"
        placeholder="下单时间"
        class = "filter-item"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>

      <el-button class="filter-item" type="primary"  @click="handlerQuery">查询</el-button>
    </div>

    <el-table :data="total"  border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="订单个数">
        <template scope="scope">
          <span>{{scope.row.pickCount}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="充值总额">
        <template scope="scope">
          <span>{{scope.row.pickMoney}}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import { obtainPickTotal } from '@/api/order/orderapi'
  export default {
    name: 'total',
    data() {
      return {
        total: [],
        orderTime: '',
        listLoading: true
      }
    },
    created() {
      this.handlerQuery()
    },
    methods: {
      handlerQuery() {
        let startTimestamp = 0
        let endTimestamp = 0
        this.listLoading = true
        const startTime = this.orderTime[0]
        const endTime = this.orderTime[1]
        if (startTime) {
          startTimestamp = startTime.getTime()
        }
        if (endTime) {
          endTimestamp = endTime.getTime() + 24 * 3600 * 1000
        }
        obtainPickTotal(startTimestamp, endTimestamp).then(response => {
          this.total = []
          this.total.push(response.data.data)
          this.listLoading = false
        })
      }
    }
  }
</script>
