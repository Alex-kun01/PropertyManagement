const fun = {
    // 时间戳转换时间
    timeChange(time) {
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth()
        const data = date.getDate()
        const house = date.getHours()
        const min = date.getMinutes()
        const seconds = date.getSeconds()
        let str = `${year}-${month}-${data} ${house}:${min}:${seconds}`
        return str
    },
}

export default fun