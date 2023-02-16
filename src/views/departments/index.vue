<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <TreeTools :treeNode="company" :isRoot="true" @adddept="adddept" />
        <!-- 放置一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容  插槽内容 会循环多次  有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 -->
          <!-- 放置结构内容  -->
          <TreeTools
            slot-scope="{data}"
            :treeNode="data"
            @adddept="adddept"
            @delDepts="getDepartment"
          />
        </el-tree>
      </el-card>
      <Adddept :showDialog="showDialog" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import Adddept from './components/add-dept'
export default {
  components: {
    TreeTools,
    Adddept
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      // 头部数据结构
      company: {},
      departs: [],
      showDialog: false, //默认不显示dialog
      node: null //记录当前点击的node节点
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取企业部门
    async getDepartment() {
      let result = await getDepartments()
      console.log(result)
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '') //需要将其转化为树形结构
      console.log(departs)
    },
    // 监听 tree-tools中触发的点击添加部门的事件
    // node 是我们点击的部门
    adddept(node) {
      // 显示dialog
      this.showDialog = true
      this.node = node
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
