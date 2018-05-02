<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="listQuery.devId">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>

    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
              style="width: 100%">

      <el-table-column min-width="100px" label="Id">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="支付金额">
        <template scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="序列码">
        <template scope="scope">
          <span>{{scope.row.serialNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
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
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 50,
          devId: undefined
        }
      }
    },
    filters: {
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryCount(this.listQuery).then(response => {
          this.total = response.data.data
        })
        queryList(this.listQuery).then(response => {
          this.list = response.data.data
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
