<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px; width:100%">
    <!-- 左侧内容 -->
    <el-col>
      <span>{{treeNode.name}}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{treeNode.manager}}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>
              操作
              <i class="el-icon-arrow-down"></i>
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  name: '',
  components: {},
  props: {
    //   定义传入的属性
    treeNode: {
      type: Object,
      required: true
    },
    // 是不是根节点
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    // 点击 编辑 删除 添加时 触发
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
        this.$emit('adddept',this.treeNode) //告诉父组件显示dialog
      } else if (type === 'edit') {
        // 编辑部门
      } else if (type === 'add') {
        // 删除部门
        this.$confirm('你确定要删除该组织部门吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return delDepartment(this.treeNode.id)
          })
          .then(() => {
            // 只需要等到成功的时候  调用接口删除了  后端数据变化了 但前端数据没变 需要重新获取
            this.$emit('delDepts') //触发自定义事件  通知父组件
            this.$message.success('删除部门成功')
          })
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {}
}
</script>
<style scoped lang='less'>
</style>
