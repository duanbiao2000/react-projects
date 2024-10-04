import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';
import logo from './logo.svg';

// 导入React库，useState，useRef，useEffect钩子函数，FaBars图标，links和social数据，logo图片

const Navbar = () => {
  // 使用useState钩子函数，定义showLinks状态，初始值为false
  const [showLinks, setShowLinks] = useState(false);
  // 使用useRef钩子函数，定义linksContainerRef和linksRef引用
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  // 定义toggleLinks函数，用于切换showLinks状态
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  // 使用useEffect钩子函数，监听showLinks状态的变化
  useEffect(() => {
    // 获取linksRef引用的高度
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    // 如果showLinks为true，则设置linksContainerRef引用的高度为linksRef引用的高度
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      // 否则，设置linksContainerRef引用的高度为0
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  // 返回导航栏组件
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
// 导出Navbar组件
