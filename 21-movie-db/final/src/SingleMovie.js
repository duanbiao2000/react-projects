// 导入React库中的useState和useEffect钩子，以及react-router-dom库中的useParams和Link组件
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
// 导入API_ENDPOINT常量
import { API_ENDPOINT } from './context'
// 导入自定义的useFetch钩子
import useFetch from './useFetch'
// 定义SingleMovie组件
const SingleMovie = () => {
  // 使用useParams钩子获取路由参数中的id
  const { id } = useParams()
  // 使用自定义的useFetch钩子获取电影数据
  const { isLoading, error, data: movie } = useFetch(`&i=${id}`)

  // 如果正在加载，则返回加载中的提示
  if (isLoading) {
    return <div className='loading'></div>
  }
  // 如果发生错误，则返回错误提示和返回按钮
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          back to movies
        </Link>
      </div>
    )
  }
  // 从电影数据中解构出海报、标题、剧情和年份
  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie
  // 返回电影详情页面
  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to='/' className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
}

// 导出SingleMovie组件
export default SingleMovie