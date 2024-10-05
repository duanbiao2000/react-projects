// 定义一个reducer函数，用于处理不同的action
const reducer = (state, action) => {
  // 如果action的类型是CLEAR_CART，则清空购物车
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  // 如果action的类型是REMOVE，则从购物车中移除指定id的商品
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    }
  }
  // 如果action的类型是INCREASE，则增加指定id的商品数量
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }
  // 如果action的类型是DECREASE，则减少指定id的商品数量，如果数量为0，则从购物车中移除该商品
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }
  // 如果action的类型是GET_TOTALS，则计算购物车中商品的总价和总数量
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }
  // 如果action的类型是LOADING，则设置loading状态为true
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  // 如果action的类型是DISPLAY_ITEMS，则显示购物车中的商品，并将loading状态设置为false
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }
  // 如果action的类型是TOGGLE_AMOUNT，则根据type参数增加或减少指定id的商品数量
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }
  // 如果没有匹配的action类型，则抛出错误
  throw new Error('no matching action type')
}

// 导出reducer函数
export default reducer