import React from 'react'

// 定义一个名为Follower的函数组件，接收三个参数：avatar_url、html_url、login
const Follower = ({ avatar_url, html_url, login }) => {
  return (
    <article className='card'>
      <img src={avatar_url} alt={login} />
      <h4>${login}</h4>
      <a href={html_url} className='btn'>
        view profile
      </a>
    </article>
  )
}

export default Follower
