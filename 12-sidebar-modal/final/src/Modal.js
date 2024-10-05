// 导入React库
import React from 'react';
// 导入全局上下文
import { useGlobalContext } from './context';
// 导入关闭按钮图标
import { FaTimes } from 'react-icons/fa';
// 定义Modal组件
const Modal = () => {
  // 从全局上下文中获取isModalOpen和closeModal
  const { isModalOpen, closeModal } = useGlobalContext();
  // 返回Modal组件
  return (
    <div
      // 根据isModalOpen的值来决定是否显示Modal
      className={`${
        isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
    >
      <div className='modal-container'>
        <h3>modal content</h3>
        {/* 点击关闭按钮时调用closeModal函数 */}
        <button className='close-modal-btn' onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  );
};

// 导出Modal组件
export default Modal;