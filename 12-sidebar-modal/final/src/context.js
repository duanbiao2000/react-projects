import React, { useState, useContext } from 'react';

// 创建一个上下文对象
const AppContext = React.createContext();

// 创建一个提供者组件
const AppProvider = ({ children }) => {
  // 使用useState钩子来管理侧边栏和模态框的状态
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 打开侧边栏
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  // 关闭侧边栏
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 打开模态框
  const openModal = () => {
    setIsModalOpen(true);
  };
  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 返回一个提供者组件，将状态和方法传递给子组件
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 创建一个自定义钩子，用于在组件中获取上下文
export const useGlobalContext = () => {
  return useContext(AppContext);
};

// 导出上下文对象和提供者组件
export { AppContext, AppProvider };
