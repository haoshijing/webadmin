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

      <el-table-column min-width="200px" label="设备ID">
        <template scope="scope">
          <span>{{scope.row.devId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="序列码">
        <template scope="scope">
          <span>{{scope.row.serialNo}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="生成时间">
        <template scope="scope">
          <span>{{scope.row.logDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="设备id">
          <el-input v-model="temp.devId" > </el-input>
        </el-form-item>

        <el-form-item label="序列码">
          <el-input v-model="temp.serialNo"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
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
  import { queryList, queryCount, updateData } from '@/api/data'
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
        },
        temp: {
          id: undefined,
          devId: '',
          serialNo: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        downloadLoading: false
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
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          devId: '',
          serialNo: ''
        }
      },
      handleUpdate(row) {
        this.temp = {
          id: row.id,
          devId: row.devId,
          serialNo: row.serialNo
        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      updateData() {
        const tempData = Object.assign({}, this.temp)
        updateData(tempData).then(() => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
          this.handleFilter()
        })
      }
    }
  }
</script>
