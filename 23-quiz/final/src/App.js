import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  // 从context中获取全局状态
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  // 如果等待状态为true，则渲染SetupForm组件
  if (waiting) {
    return <SetupForm />
  }
  // 如果加载状态为true，则渲染Loading组件
  if (loading) {
    return <Loading />
  }

  // 获取当前问题的内容
  const { question, incorrect_answers, correct_answer } = questions[index]
  // const answers = [...incorrect_answers, correct_answer]
  // 将错误答案和正确答案合并为一个数组
  let answers = [...incorrect_answers]
  // 随机生成一个索引
  const tempIndex = Math.floor(Math.random() * 4)
  // 如果随机生成的索引为3，则将正确答案添加到数组的末尾
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    // 否则，将正确答案添加到随机生成的索引位置，并将原来的答案移动到末尾
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
  // 渲染App组件
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              // 渲染答案按钮
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App