import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/main/Carousel';
import {FiCheckSquare} from 'react-icons/fi'
import GoCreate from '../components/main/GoCreate';
import GoParticipate from '../components/main/GoParticipate';
import axios from 'axios';
import MainTrendItem from '../components/main/MainTrendItem';
import { useQuery } from '@tanstack/react-query';
import { RxDoubleArrowDown } from "react-icons/rx";

export default function Main() {
  const [main_data, SetMain_data] = useState();
  // const {data, isLoading } = useQuery({ queryKey: ['Trend'], queryFn: dataset })
  useEffect(()=>{
    dataset();
  },[])

  async function dataset(){
    await axios('/data/Board.json')
    .then((res)=>res.data.surveyData)
    .then((res)=>SetMain_data(res))
  }

  function test(){
    axios('')
  }

  return (
    <div >

      <article className='h-6/7'>
      <Carousel/>
        <div className='flex text-xl font-bold ml-left my-4'>
          <FiCheckSquare className='text-3xl text-main_color mt-1 '/>
          <div className='flex mt-1'> 
            <p className='text-sub_text_color '>&nbsp;&nbsp;설문조사를&nbsp;&nbsp;</p>
            <p className='text-main_color'>생성</p>
            <p className='text-sub_text_color '>하고&nbsp;&nbsp;</p>
            <p className='text-main_color'>참여 </p>
            <p className='text-sub_text_color '>해보세요!</p>
          </div>
        </div>
        <div className=''>
          <div className='flex w-screen justify-center'>
            <Link to='/main/create'><GoCreate/></Link>
            <a href="#Trend" className=''><RxDoubleArrowDown className='w-12 h-12 z-10 mt-32 ml-12  mr-12 hover:cursor-pointer custom-bounce'/></a>
            <Link to='/main/Board'><GoParticipate/></Link>
          </div>
        </div>
      </article>

      <article className='h-screen'>
        <div id='Trend' className='flex text-xl font-bold ml-left my-5'>
          <FiCheckSquare className='text-3xl text-main_color mt-4'/>
          <div className='flex mt-4'> 
            <p className='text-sub_text_color '>&nbsp;&nbsp;이 달의</p>
            <p className='text-main_color'>설문조사 트렌드</p>
            <p className='text-sub_text_color '>를 확인해보세요!</p>
          </div>
        </div>
      
        <div className=' w-full flex flex-col items-center h-full'>
            {main_data &&
            main_data.filter(item => item.trend === true).map((item)=>{
              return(
              <div className='w-screen flex flex-col items-center'>
              <MainTrendItem key={item.id} data={item}/>
            </div>
            )
            })
            }
          <hr className='  w-line border-1 border-main_color '/>
          <Link to='/main/trend' className='w-line relative'>
            <div className=' mt-8 float-right  text-center pt-2 font-semibold text-main_color w-56 h-12 border-1 border-main_color rounded-3xl'>트렌드 전체 보기 &nbsp;&nbsp;	&gt; </div>
          </Link>
        </div>
      </article>
    </div>
  )
}