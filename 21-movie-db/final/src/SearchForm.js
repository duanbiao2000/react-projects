// 导入React库
import React from 'react'
// 导入useGlobalContext函数
import { useGlobalContext } from './context'
// 定义SearchForm组件
const SearchForm = () => {
  // 使用useGlobalContext函数获取query、setQuery、error
  const { query, setQuery, error } = useGlobalContext()
  // 返回一个表单，包含一个标题、一个输入框和一个错误信息
  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
      <h2>search movies</h2>
      <input
        type='text '
        className='form-input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error.show && <div className='error'>{error.msg}</div>}
    </form>
  )
}

// 导出SearchForm组件
export default SearchForm