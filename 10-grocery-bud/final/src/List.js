import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
// 导入React和react-icons/fa中的FaEdit和FaTrash图标
const List = ({ items, removeItem, editItem }) => {
  // 定义List组件，接收items、removeItem和editItem作为props
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        // 遍历items数组，将每个item作为参数传入
        const { id, title } = item;
        // 解构item，获取id和title
        return (
          <article className='grocery-item' key={id}>
            {/* 商品项 */}
            <p className='title'>{title}</p>
            {/* 按钮容器 */}
            <div className='btn-container'>
              {/* 编辑按钮 */}
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              {/* 删除按钮 */}
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
// 导出List组件
