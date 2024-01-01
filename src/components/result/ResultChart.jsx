import React from 'react'
import { useState } from 'react';
import { PiUploadSimpleLight } from "react-icons/pi";
import BarChartModel from './BarChartModel';
import LineChartModel from './LineChartModel';
import PieChartModel from './PieChartModel';
export default function ResultChart() {
    const [graph,SetGraph] = useState('bar');

    const data = [
        {
          name: '거의 사용하지 않음',
            "응답 수": 20,
        },
        {
          name: '가끔',
            "응답 수": 30,
        },
        {
          name: '자주',
            "응답 수": 15,
        },
        {
          name: '매우 자주',
            "응답 수": 11,
        }
      ];
    function handleGraph(graph){
        SetGraph(graph)
    }
  return (
    <div className='h-96 w-4/5 bg-white rounded-xl mb-16 flex flex-col items-center '>
        <div className='h-12 w-11/12 border-b-1 border-sub_line_color mt-6 mb-4 flex justify-between font-semibold'>
            <p>1. 인공지능 사용 빈도가 어떻게 되나요?</p>
            <nav>
                <button className={`mr-10 ${graph=='bar'? 'text-highligth' : ''}`} onClick={()=>handleGraph('bar')}>막대 그래프</button>
                <button className={`mr-10 ${graph=='line'? 'text-highligth' : ''}`} onClick={()=>handleGraph('line')}>선 그래프</button>
                <button className={`mr-10 ${graph=='circle'? 'text-highligth' : ''}`} onClick={()=>handleGraph('circle')}>원 그래프</button>
            </nav>
            <button><PiUploadSimpleLight className='text-3xl'/></button>
        </div>

        <div>
            <div className={`${graph=='bar'? 'block' : 'hidden'}`}>
                <BarChartModel data={data}/>
            </div>
            <div className={`${graph=='line'? 'block' : 'hidden'}`}>
                <LineChartModel data={data} />
            </div>
            <div className={`${graph=='circle'? 'block' : 'hidden'}`}>
                <PieChartModel data={data}/>
            </div>
        </div>
    </div>
  )
}
