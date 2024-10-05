// 定义一个函数，用于将followers数组分页
const paginate = (followers) => {
  // 每页显示的条目数
  const itemsPerPage = 10
  // 计算总页数
  const numberOfPages = Math.ceil(followers.length / itemsPerPage)

  // 创建一个新的数组，长度为总页数
  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    // 计算每页的起始位置
    const start = index * itemsPerPage
    // 返回每页的followers数组
    return followers.slice(start, start + itemsPerPage)
  })

  // 返回新的followers数组
  return newFollowers
}

// 导出paginate函数
export default paginate