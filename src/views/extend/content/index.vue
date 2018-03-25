<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                v-model="listQuery.menuName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">创建网站
      </el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
              style="width: 100%">

      <el-table-column min-width="50px" label="Id">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="网站标题">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="网站链接">
        <template scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="网站图片">
        <template scope="scope">
          <img :src="scope.row.image" height="80" width="80"></img>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="所属菜单">
        <template scope="scope">
          <span>{{scope.row.menuName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="位置排序">
        <template scope="scope">
          <span>{{scope.row.sort}}</span>
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
        <el-form-item label="网站标题">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="网站链接">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="后台链接">
          <el-input v-model="temp.adminUrl"></el-input>
        </el-form-item>

        <el-form-item label="排序号">
          <el-input v-model="temp.sort"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select class="filter-item" filterable v-model="temp.menuId" placeholder="请选择">
            <el-option v-for="item in  parentMenuList" :key="item.menuId" :label="item.menuName" :value="item.menuId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站图片">
          <el-upload ref = "upload" action="http://115.159.29.17:8123/admin/content/upload"
             name="image" drag :multiple="false"
                     :on-success="uploadOk">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
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
  import { queryContentList, queryContentCount, insertContent, updateContent } from '@/api/content'
  import { queryMenuListForContent } from '@/api/menu'
  import waves from '@/directive/waves'

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
          name: undefined
        },
        parentMenuList: [],
        temp: {
          id: undefined,
          name: '',
          parentId: -1,
          sort: 0,
          webPrice: 0,
          url: '',
          adminUrl:''
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
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryContentCount(this.listQuery).then(response => {
          this.total = response.data.data
        })
        queryContentList(this.listQuery).then(response => {
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
          menuId: '',
          sort: 0,
          parentId: '',
          image: '',
          url: '',
          webPrice: 0,
          adminUrl: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        queryMenuListForContent().then(response => {
          this.parentMenuList = response.data.data
        })
      },
      createData() {
        insertContent(this.temp).then(() => {
          this.handleFilter()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      uploadOk(response, file, fileList) {
        if (response.code === 200) {
          this.temp.image = response.data
        }
      },
      handleUpdate(row) {
        queryMenuListForContent().then(response => {
          this.parentMenuList = response.data.data
        })
        this.temp = {
          id: row.id,
          name: row.name,
          url: row.url,
          sort: row.sort,
          menuId: row.menuId,
          webPrice: row.webPrice,
          adminUrl: row.adminUrl
        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      updateData() {
        const tempData = Object.assign({}, this.temp)
        updateContent(tempData).then(() => {
          this.handleFilter()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      }

    }
  }
</script>
