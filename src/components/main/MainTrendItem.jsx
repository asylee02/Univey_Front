import React, { useEffect } from 'react'
import robot from '../assets/robot.svg'

export default function MainTrendItem({data}) {
  console.log(data);


  return (

    <div className='overflow-hidden border-t-2 border-main_color w-line h-full'>
      <div className='flex'>
        <img src={robot} alt="" />
        <div className='flex flex-col justify-center h-full mt-9'>
          <div className='text-3xl font-bold mb-4'>{data.topic}</div>
          <div className='font-semibold mb-6'>{data.description}</div>
          <div>
            <p>{`응답시간 : (3분 예상)`}</p>
            <p>대상: { 
             data.age[0]=="all" ?
             '전연령':
                data.age.length===1? `${data.age[0]}대`
             :`${data.age[0]}대~${data.age[data.age.length-1]}대`
            }</p>
            <p>실제 응답자 수 / 목표 응답자 수: {data.targetResponden}명 /{data.target_targetResponden}명</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}
