import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'

// 定义一个子菜单组件
const Submenu = () => {
  // 从全局上下文中获取isSubmenuOpen、page和location
  const {
    isSubmenuOpen,
    page: { page, links },
    location,
  } = useGlobalContext()
  // 创建一个ref，用于获取子菜单的DOM元素
  const container = useRef(null)
  // 定义一个状态变量columns，用于存储子菜单的列数
  const [columns, setColumns] = useState('col-2')
  // 当page、location或links发生变化时，执行useEffect中的代码
  useEffect(() => {
    // 将columns重置为col-2
    setColumns('col-2')
    // 获取子菜单的DOM元素
    const submenu = container.current
    // 获取location中的center和bottom
    const { center, bottom } = location
    // 设置子菜单的left和top属性
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
    // 打印links
    console.log(links)
    // 如果links的长度为3，将columns设置为col-3
    if (links.length === 3) {
      setColumns('col-3')
    }
    // 如果links的长度大于3，将columns设置为col-4
    if (links.length > 3) {
      setColumns('col-4')
    }
  }, [page, location, links])
  // 返回子菜单的DOM结构
  return (
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links.map((link, index) => {
            const { url, icon, label } = link
            return (
              <a key={index} href={url}>
                {icon}
                {label}
              </a>
            )
          })}
        </div>
      </section>
    </aside>
  )
}

export default Submenu