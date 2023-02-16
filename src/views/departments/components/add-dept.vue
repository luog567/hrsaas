<template>
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单数据  label-width设置label的宽度-->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          style="width:80%"
          placstyle="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    //    需要传入一个props变量来控制 显示或者隐藏dialog
      showDialog:{
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
