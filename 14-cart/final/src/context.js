import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  // 使用useReducer来管理状态
  const [state, dispatch] = useReducer(reducer, initialState)

  // 清空购物车
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  // 移除商品
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  // 增加商品数量
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }
  // 减少商品数量
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  // 获取数据
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  // 切换商品数量
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }
  // 组件挂载时获取数据
  useEffect(() => {
    fetchData()
  }, [])

  // 当购物车数据变化时，计算总金额和总数量
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }