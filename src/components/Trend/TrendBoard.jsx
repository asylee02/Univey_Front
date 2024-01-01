import React from 'react';
import { Link } from 'react-router-dom';
import trend from '../assets/trend.svg'

export default function TrendBoard({data}) {


  return (
    <div className='w-1/3 border-1 border-main_color mx-5 rounded-2xl flex flex-col items-center'>
      <div className='h-1/2 pt-8'>
        <img src={trend} alt="" />
      </div>
      <hr className='border-1 border-line_color w-11/12 align-middle   '/>
      <main className='flex flex-col items-start h-1/2 pt-8 mr-10'>
          <p className='text-main_color text-3xl font-bold mt-5 mb-4'>{data.topic}</p>
          <p className='font-semibold mb-5'>{data.description}</p>
            <p className='mb-1'>대상: { data.age[0]=="all" ?'전연령':data.age.length===1? `${data.age[0]}대`
             :`${data.age[0]}대~${data.age[data.age.length-1]}대`}</p>
            <p className='mb-3'>실제 응답자 수 / 목표 응답자 수: {data.targetResponden}명 /{data.target_targetResponden}명</p>
          <p className='flex mb-2'>
            { data.hash && data.hash.map((item)=> <span className='mx-1'>#{item}</span>)}
          </p>
        </main>
        <div className='mb-6 font-semibold text-main_color w-full'>
          <span className='float-right mr-10'>트렌드 참여하기 &nbsp; &gt; </span> 
        </div>
    </div>
  );
}