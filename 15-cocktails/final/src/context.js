import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

// 定义API地址
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
// 创建一个上下文对象
const AppContext = React.createContext()

// 创建一个提供者组件
const AppProvider = ({ children }) => {
  // 定义loading状态
  const [loading, setLoading] = useState(true)
  // 定义搜索词状态
  const [searchTerm, setSearchTerm] = useState('a')
  // 定义鸡尾酒状态
  const [cocktails, setCocktails] = useState([])

  // 定义一个异步函数，用于获取鸡尾酒数据
  const fetchDrinks = useCallback( async () => {
    setLoading(true)
    try {
      // 发送请求
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      console.log(data);
      // 解构数据
      const { drinks } = data
      if (drinks) {
        // 将数据转换为新的格式
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        // 更新鸡尾酒状态
        setCocktails(newCocktails)
      } else {
        // 如果没有数据，则清空鸡尾酒状态
        setCocktails([])
      }
      // 更新loading状态
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[searchTerm])
  // 当searchTerm变化时，重新获取数据
  useEffect(() => {
    fetchDrinks()
  }, [searchTerm,fetchDrinks])
  // 返回上下文提供者组件
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}
// 导出一个自定义hook，用于获取上下文
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
