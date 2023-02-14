//组织架构的路由规则
import Layout from '@/layout'
export default {
    // 路由规则
    path:'/departments', //路由地址
    name:'departments', //给模块的一级路由加一个name属性，这个属性 我们在后面做权限的时候会用到
    component:Layout, //一级路由
    children:[{
        // 二级路由的path什么都不用写的时候  ，此时他表示二级路由的默认路由
        path:'', //这里不用写  什么都不写表示 /departments   不但有布局 layout => 审批主页
        component:()=>import('@/views/departments'),
        // 路由元信息  其实就是一个存储数据的地方  可以放任何内容
        meta:{
            title:'组织架构'  //这里为什么要用title  因为左侧导航栏读取了这里的title属性
        }
    }]
}