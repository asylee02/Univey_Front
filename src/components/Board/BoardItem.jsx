import React, { useEffect } from 'react'
import { SlArrowRight } from "react-icons/sl";
import { Link } from 'react-router-dom';
import robot from '../assets/robot.svg'

export default function BoardItem({data}) {


  return (
    <div className='overflow-hidden border-t-2 border-main_color w-line h-full'>
      <div className=' flex justify-between ml-10'>
        <div className='flex flex-col justify-center h-full mt-9'>
          <div className='flex'>
          <div className='text-3xl font-bold mb-4'>{data.topic}</div>
          {
          data.status=='uncomplete'
          ?<div className='status bg-highligth'>진행중</div>
          :<div className='status bg-text_color'>완료</div>
          
          }
          
          </div>
          <div className='font-semibold mb-6'>{data.description}</div>
          <div>
            <p>{`응답시간 : ${data.question.length}문항 (3분 예상)`}</p>
            <p>대상: { 
             data.age[0]=="all" ?
             '전연령':
                data.age.length===1? `${data.age[0]}대`
             :`${data.age[0]}대~${data.age[data.age.length-1]}대`
            }</p>
            <p>실제 응답자 수 / 목표 응답자 수: {data.targetResponden}명 /{data.target_targetResponden}명</p>
          </div>
        </div>
        <div className='flex'>
          <Link to='../main/participate' className='h-full flex items-end pb-10'>
            <span>설문 참여하러 가기  &nbsp; </span> 
            <span className='mb-1'><SlArrowRight/></span> 
            </Link>
            <img className='float-right' src={robot} alt="" />
          </div>
      </div>
    </div>
  )
}
