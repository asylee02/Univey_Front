import React from 'react'
import go_create from '../assets/go_create.svg'

export default function GoCreate() {
  return (
    <div className='bg-box_color_1
   h-48 rounded-3xl flex shadow-xl'>
      <div className='text-white ml-9 mt-10'>
        <h1 className='text-3xl mb-1 font-semibold'>
          <span className='text-sub_text_color_2'>설문조사&nbsp;</span>
          <span>생성</span>
        </h1>
        <p className='w-72 mb-8 text-sm'>원하는 설문조사를 생성하고 공유해보세요!</p>
        <p>설문 생성하기 &gt; </p>
      </div>
      <img src={go_create} className='h-28 mt-8  z-10 ml-16 '/>
    </div>
  )
}
