import request from '@/utils/request'

// 查询企业的部门列表
export function getDepartments() {
    return request({
        url: '/company/department'
    })
}

// 根据ID删除部门
export let delDepartment = id => {
    return request({
        url: ` /company/department/${id}`,
        method:'delete'
    })
}