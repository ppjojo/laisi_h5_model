import request from "@/utils/request"
//新增分类
export function addItem(data) {
    return request({
        url: '/community/cCatalog/save',
        method: 'post',
        data
    })
}
//更新分类
export function updateItem(data) {
    return request({
        url: '/community/cCatalog/update',
        method: 'post',
        data
    })
}
//删除分类
export function deleteItem(data) {
    return request({
        url: '/community/cCatalog/delete',
        method: 'post',
        data
    })
}
//查询分类下的课程列表
export function queryAllBigByCatalogId(data) {
    return request({
        url: '/community/cCatalogBigClass/queryAllBigByCatalogId',
        method: 'post',
        data
    })
}
// 修改分类⼤课程下的排序
export function updateCatalogList(data) {
    return request({
        url: '/community/cCatalogBigClass/update',
        method: 'post',
        data
    })
}
