// 导入actions中的常量
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

// 定义reducer函数，接收state和action作为参数
const reducer = (state, action) => {
  // 根据action.type的值，执行不同的操作
  switch (action.type) {
    // 设置加载状态为true
    case SET_LOADING:
      return { ...state, isLoading: true }
    // 设置故事列表和页数
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }
    // 移除指定id的故事
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      }
    // 设置搜索关键词和页数
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 }
    // 处理页数，增加或减少
    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage }
      }
      if (action.payload === 'dec') {
        let prevPage = state.page - 1
        if (prevPage < 0) {
          prevPage = state.nbPages - 1
        }
        return { ...state, page: prevPage }
      }
    // 默认抛出错误
    default:
      throw new Error(`no mathching "${action.type}" action type`)
  }
}
// 导出reducer函数
export default reducer