import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  // 使用useFetch钩子获取数据
  const { loading, data } = useFetch()
  // 定义当前页数
  const [page, setPage] = useState(0)
  // 定义关注者列表
  const [followers, setFollowers] = useState([])

  // 当loading或page发生变化时，更新关注者列表
  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  // 下一页
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  // 上一页
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  // 点击页码按钮，跳转到对应页
  const handlePage = (index) => {
    setPage(index)
  }

  return (
    <main>
      {/* 分页标题 */}
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      {/* 粉丝列表 */}
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {/* 如果没有加载中，则显示分页按钮 */}
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App