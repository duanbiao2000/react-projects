import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

// 定义一个SingleColor组件，用于显示单个颜色
const SingleColor = ({ rgb, weight, index, hexColor }) => {
  // 定义一个状态变量，用于控制是否显示提示信息
  const [alert, setAlert] = useState(false)
  // 将rgb数组转换为字符串，用于设置背景颜色
  const bcg = rgb.join(',')
  // 将rgb数组转换为hex颜色值
  const hex = rgbToHex(...rgb)
  // 将hex颜色值转换为字符串，用于显示
  const hexValue = `#${hexColor}`
  // 当alert状态改变时，设置一个定时器，3秒后隐藏提示信息
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])
  // 返回一个article元素，包含颜色值和百分比
  return (
    <article
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true)
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor