import React from 'react'

/**
 * Photo组件用于渲染单张照片的信息
 * 包括照片的URL、描述、点赞数以及摄影师的信息
 * 
 * @param {object} props - 组件的props对象
 * @param {object} props.urls - 照片的URLs对象
 * @param {string} props.urls.regular - 中等尺寸的照片URL
 * @param {string} props.alt_description - 照片的描述文本
 * @param {number} props.likes - 照片的点赞数量
 * @param {object} props.user - 摄影师的信息对象
 * @param {string} props.user.name - 摄影师的名字
 * @param {string} props.user.portfolio_url - 摄影师的作品集URL
 * @param {object} props.user.profile_image - 摄影师的头像URLs对象
 * @param {string} props.user.profile_image.medium - 中等尺寸的摄影师头像URL
 */
const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className='photo'>
      <img src={regular} alt={alt_description} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt='' className='user-img' />
        </a>
      </div>
    </article>
  )
}

export default Photo