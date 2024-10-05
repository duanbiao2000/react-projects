import React from 'react'
import { useGlobalContext } from './context'
// 导入全局上下文
const CartItem = ({ id, img, title, price, amount }) => {
  // 解构出全局上下文中的方法
  const { remove, increase, decrease, toggleAmount } = useGlobalContext()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */} {/* 移除按钮 */}
        <button className='remove-btn' onClick={() => remove(id)}>
          remove
        </button>
      </div>
      <div>
        {/* increase amount */} {/* 增加数量 */}
        <button className='amount-btn' onClick={() => toggleAmount(id, 'inc')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
          </svg>
        </button>
        {/* amount */} {/* 数量 */}
        <p className='amount'>{amount}</p>
        {/* decrease amount */} {/* 减少数量 */}
        <button className='amount-btn' onClick={() => toggleAmount(id, 'dec')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default CartItem
// 导出CartItem组件