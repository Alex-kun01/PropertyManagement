const publicFun = {
    /**
     *  分页过滤
     * @param {*} current 当前页码
     * @param {*} pageSize 一页条数
     * @param {*} showList  目标数组
     */
    filterList(current, pageSize, showList) {
        return showList.slice((pageSize * (current - 1)), current * pageSize)
    },
}


export default publicFun