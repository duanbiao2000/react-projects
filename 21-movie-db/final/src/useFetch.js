import React, { useState, useEffect } from 'react'
// 定义API_ENDPOINT常量，用于存储API的URL
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

// 定义useFetch函数，用于获取数据
const useFetch = (urlParams) => {
  // 定义isLoading状态，用于存储是否正在加载数据
  const [isLoading, setIsLoading] = useState(true)
  // 定义error状态，用于存储错误信息
  const [error, setError] = useState({ show: false, msg: '' })
  // 定义data状态，用于存储获取到的数据
  const [data, setData] = useState(null)
  // 定义fetchMovies函数，用于获取数据
  const fetchMovies = async (url) => {
    // 设置isLoading为true，表示正在加载数据
    setIsLoading(true)
    try {
      // 发送请求获取数据
      const response = await fetch(url)
      const data = await response.json()

      // 如果获取到的数据为真，则设置data状态
      if (data.Response === 'True') {
        setData(data.Search || data)

        // 设置error状态为假，表示没有错误
        setError({ show: false, msg: '' })
      } else {
        // 设置error状态为真，并设置错误信息
        setError({ show: true, msg: data.Error })
      }
      // 设置isLoading为假，表示数据加载完成
      setIsLoading(false)
    } catch (error) {
      // 如果发生错误，则打印错误信息
      console.log(error)
    }
  }

  // 使用useEffect钩子，在urlParams变化时，调用fetchMovies函数获取数据
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`)
  }, [urlParams])
  // 返回isLoading、error、data状态
  return { isLoading, error, data }
}

// 导出useFetch函数
export default useFetch