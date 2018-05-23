<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.systemId" placeholder="系统名称">
        <el-option v-for="item in systemList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="payTime"
        type="daterange"
        align="right"
        placeholder="下单时间"
        class="filter-item"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      汇总:<span>{{totalMoney}}</span>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
              style="width: 100%">

      <el-table-column min-width="200px" label="系统名称">
        <template scope="scope">
          <span>{{scope.row.systemName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="支付金额">
        <template scope="scope">
          <span>{{scope.row.money}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="支付时间">
        <template scope="scope">
          <span>{{scope.row.payTime}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { queryList, queryCount } from '@/api/pay'
  import { getAll } from '@/api/system'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        totalMoney: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 50,
          systemId: undefined,
          start: undefined,
          end: undefined
        },
        systemList: [],
        payTime: ['', '']
      }
    },
    filters: {},
    created() {
      getAll().then(response => {
        this.systemList = response.data.data
      })
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const startTime = this.payTime[0]
        const endTime = this.payTime[1]
        if (startTime) {
          this.listQuery.start = startTime.getTime()
        }
        if (endTime) {
          this.listQuery.end = endTime.getTime() + 24 * 3600 * 1000
        }
        queryCount(this.listQuery).then(response => {
          this.total = response.data.data
        })
        queryList(this.listQuery).then(response => {
          this.list = response.data.data.payVoList
          this.totalMoney = response.data.data.totalAmount / 100
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }

  }
</script>
