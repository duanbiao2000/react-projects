import React, { useContext, useEffect, useReducer } from 'react'

// 导入actions和reducer
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

// 定义API_ENDPOINT
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

// 定义初始状态
const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
}

// 创建AppContext
const AppContext = React.createContext()

// 创建AppProvider
const AppProvider = ({ children }) => {
  // 使用useReducer来管理状态
  const [state, dispatch] = useReducer(reducer, initialState)

  // 定义fetchStories函数，用于获取故事
  const fetchStories = async (url) => {
    // 发送请求前，设置isLoading为true
    dispatch({ type: SET_LOADING })
    try {
      // 发送请求
      const response = await fetch(url)
      const data = await response.json()
      // 发送请求后，设置isLoading为false，并设置hits和nbPages
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 定义removeStory函数，用于删除故事
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }
  // 定义handleSearch函数，用于处理搜索
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }
  // 定义handlePage函数，用于处理分页
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }
  // 使用useEffect来监听query和page的变化，当变化时，重新获取故事
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])

  // 返回AppContext.Provider，将state和函数作为value传递给子组件
  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  )
}
// 确保使用useGlobalContext来获取AppContext
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }