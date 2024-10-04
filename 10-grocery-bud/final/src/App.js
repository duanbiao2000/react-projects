import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
// 从localStorage中获取list
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  // 定义name状态，用于存储输入框的值
  const [name, setName] = useState('');
  // 定义list状态，用于存储列表数据
  const [list, setList] = useState(getLocalStorage());
  // 定义isEditing状态，用于判断是否处于编辑状态
  const [isEditing, setIsEditing] = useState(false);
  // 定义editID状态，用于存储当前编辑项的id
  const [editID, setEditID] = useState(null);
  // 定义alert状态，用于存储提示信息
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    // 如果输入框为空，则显示提示信息
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    // 如果输入框不为空且处于编辑状态，则更新列表数据
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    // 如果输入框不为空且不处于编辑状态，则添加新项到列表
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  // 显示提示信息
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  // 清空列表
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };
  // 删除列表项
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };
  // 编辑列表项
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  // 当list状态改变时，将list存储到localStorage中
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      {/* 表单部分 */}
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* 如果alert.show为true，则显示Alert组件 */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        {/* 表单标题 */}
        <h3>grocery bud</h3>
        {/* 表单控制部分 */}
        <div className='form-control'>
          {/* 输入框 */}
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* 提交按钮 */}
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {/* 如果list.length大于0，则显示grocery-container */}
      {list.length > 0 && (
        <div className='grocery-container'>
          {/* 显示list中的项目 */}
          <List items={list} removeItem={removeItem} editItem={editItem} />
          {/* 清空按钮 */}
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
