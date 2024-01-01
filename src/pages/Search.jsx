import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BoardItem from '../components/Board/BoardItem';

export default function Search() {  
    const [data,setData]=useState(null);
    const {value} = useParams();
    useEffect(()=>{
      dataset()
    },[])

    async function dataset(){
      await fetch('/data/Board.json')
      .then((res)=>res.json())
      .then((res)=>setData(res.surveyData))
      .catch((err)=>{
        console.log(err)
      })
    }
    console.log(value)
    
   data && console.log(data[0].topic.includes(value))


  return (
    <div className='item-center'>
      <div>{value}</div>
      <main className='w-screen flex flex-col items-center mt-3'>
          {(data) && data.map((item)=> (item.topic.includes(value) || item.description.includes(value)) && <BoardItem key={item.id} data={item}/>)}
      </main>
    </div>
  )
}
