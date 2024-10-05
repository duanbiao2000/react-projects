// 导入useState和useEffect钩子
import { useState, useEffect } from 'react'
// 导入分页函数
import paginate from './utils'
// 定义GitHub用户关注者的API地址
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

// 定义useFetch函数
export const useFetch = () => {
  // 定义loading状态
  const [loading, setLoading] = useState(true)
  // 定义data状态
  const [data, setData] = useState([])

  // 定义异步函数getProducts，用于获取数据
  const getProducts = async () => {
    // 发送请求
    const response = await fetch(url)
    // 将响应转换为JSON格式
    const data = await response.json()
    // 调用分页函数，将数据分页
    setData(paginate(data))
    // 设置loading状态为false
    setLoading(false)
  }

  // 使用useEffect钩子，在组件加载时调用getProducts函数
  useEffect(() => {
    getProducts()
  }, [])
  // 返回loading和data状态
  return { loading, data }
}