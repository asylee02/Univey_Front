import React from 'react'
import go_part from '../assets/go_part.svg'

export default function GoParticipate() {
  return (
    <div className='bg-box_color_2  
     h-48  rounded-3xl flex shadow-xl'>
      <div className='text-white ml-9 mt-10'>
        <h1 className='text-3xl mb-1 font-semibold'>
          <span className='text-sub_text_color_2'>설문조사&nbsp;</span>
          <span>참여</span>
        </h1>
        <p className='mb-6 w-72 text-sm'>원하는 설문조사를 생성하고 공유해보세요!</p>
        <p>설문 참여하기 &gt; </p>
      </div>
      <img src={go_part} className='h-28 mt-8 ml-16'/>
    </div>
  )
}
