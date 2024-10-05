import React from 'react';
import logo from './logo.svg';
import { useGlobalContext } from './context';
import { FaTimes } from 'react-icons/fa';
import { social, links } from './data';

// 定义Sidebar组件
const Sidebar = () => {
  // 从全局上下文中获取isSidebarOpen和closeSidebar
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    // 根据isSidebarOpen的值，动态添加show-sidebar类名
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className='sidebar-header'>
        {/* 显示logo图片 */}
        <img src={logo} className='logo' alt='coding addict' />
        {/* 点击按钮关闭sidebar */}
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      {/* 显示links列表 */}
      <ul className='links'>
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
                {icon}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
      {/* 显示social-icons列表 */}
      <ul className='social-icons'>
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
