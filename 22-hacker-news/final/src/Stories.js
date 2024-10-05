import React from 'react'

// 引入全局上下文
import { useGlobalContext } from './context'

// 定义Stories组件
const Stories = () => {
  // 从全局上下文中获取isLoading、hits、removeStory
  const { isLoading, hits, removeStory } = useGlobalContext()

  // 如果isLoading为true，则返回加载中的div
  if (isLoading) {
    return <div className='loading'></div>
  }
  // 否则，返回stories的section，其中包含hits数组中的每个story
  return (
    <section className='stories'>
      {hits.map((story) => {
        // 从story中解构出objectID、title、num_comments、url、points、author
        const { objectID, title, num_comments, url, points, author } = story
        // 返回每个story的article，其中包含title、info、read-link和remove-btn
        return (
          <article key={objectID} className='story'>
            {/* 为每个故事添加一个唯一的key值，用于React的渲染优化 */}
            <h4 className='title'>{title}</h4>
            {/* 显示故事的标题 */}
            <p className='info'>
              {points} points by <span>{author} | </span> {num_comments}{' '}
              comments
            </p>
            {/* 显示故事的分数、作者和评论数 */}
            <div>
              <a
                href={url}
                className='read-link'
                target='_blank'
                rel='noopener noreferrer'
              >
                read more
              </a>
              {/* 添加一个链接，用于阅读更多内容 */}
              <button
                className='remove-btn'
                onClick={() => removeStory(objectID)}
              >
                remove
              </button>
              {/* 添加一个按钮，用于删除故事 */}
            </div>
          </article>
        )
      })}
    </section>
  )
}

// 导出Stories组件
export default Stories