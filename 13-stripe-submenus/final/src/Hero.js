// 导入React库
import React from 'react';
// 导入图片
import phoneImg from './images/phone.svg';
// 导入全局上下文
import { useGlobalContext } from './context';

// 定义Hero组件
const Hero = () => {
  // 从全局上下文中获取closeSubmenu函数
  const { closeSubmenu } = useGlobalContext();
  // 返回Hero组件的JSX
  return (
    <section className='hero' onMouseOver={closeSubmenu}>
      <div className='hero-center'>
        <article className='hero-info'>
          <h1>
            Payments infrastructure <br />
            for the internet
          </h1>
          <p>
            Millions of companies of all sizes—from startups to Fortune 500s—use
            Stripe’s software and APIs to accept payments, send payouts, and
            manage their businesses online.
          </p>
          <button className='btn'>Start now</button>
        </article>
        <article className='hero-images'>
          <img src={phoneImg} className='phone-img' alt='phone' />
        </article>
      </div>
    </section>
  );
};

// 导出Hero组件
export default Hero;