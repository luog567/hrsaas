<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height:40px; width:100%"
  >
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
          <el-dropdown>
            <!-- 内容 -->
            <span>
              操作
              <i class="el-icon-arrow-down"></i>
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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
    isRoot:{
        type:Boolean,
        default:false
    }
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {}
}
</script>
<style scoped lang='less'>
</style>
