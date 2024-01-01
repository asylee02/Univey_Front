import React, { useEffect, useRef, useState } from 'react';
import BoardItem from '../components/Board/BoardItem';

export default function Board() {
  const [data,setData]=useState(null);
  const [status,setStatus]=useState(['전체','전체']);
  const [boardData, setboardData] = useState(data);

  useEffect(()=>{
    dataset()
  },[])

  useEffect(()=>{
    if(data){
      if(status[0]=='전체' && status[1]=='전체'){
        console.log(1)
        setboardData(data)
      }
      else if(status[0]=='전체' && status[1]!='전체'){
        console.log('2')
        setboardData(data.filter((item)=>item.category ==status[1]))
      }
      else if(status[0]!='전체' && status[1]=='전체'){
        setboardData(data.filter((item)=>item.status ==status[0]))
      }
      else if(status[0]!='전체' && status[1]!='전체'){
        setboardData(data.filter((item)=>(item.category ==status[1] && item.status ==status[0])))
      }
    }
    console.log(status)
  },[status,data])
  
  async function dataset(){
    await fetch('/data/Board.json')
    .then((res)=>res.json())
    .then((res)=>setData(res.surveyData))
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleStatus(state){
    const newstate = [...status]
    newstate[0]=state
    setStatus(newstate);
  }

  function handleItemClick(item){
    const newstate = [...status]
    newstate[1]=item
    setStatus(newstate);
  }


  return (
    <div>
      <nav>
        <div>
        <ul className='flex space-x-12 ml-left my-7'>
          {['전체','IT', '교육', '경제', '사회', '문화'].map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className={`click_highlight ${status[1]==item ? 'text-highligth' :''}`}
            >
              {item}
            </li>
          ))}
        </ul>
        </div>
        <div className='flex justify-between'>
        {/* onclick={()=>} */}
          <ul className='flex space-x-5 ml-left my-7'>
          <button onClick={()=>handleStatus('전체')} className={`${status[0] === "전체" ? 'select-list-item' : 'common-list-item'}`}>전체</button>
          <button onClick={()=>handleStatus('uncomplete')}className={`${status[0] === 'uncomplete' ? 'select-list-item' : 'common-list-item'}`}>진행중</button>
          <button onClick={()=>handleStatus('complete')}className={`${status[0] === "complete" ? 'select-list-item' : 'common-list-item'}`}>완료</button>
          </ul>
          <select name="" id="" className='h-10 mr-72 mt-5'>
            <option value="">최신순</option>
            <option value="">포인트순</option>
          </select>
        </div>
       
      </nav>    
     
      <main>
      <div className='w-screen flex flex-col items-center'>
        {(boardData) &&boardData.map((item) => <BoardItem key={item.id} data={item} />)}
        <hr className='  w-line border-1 border-main_color'/>
      </div>

      </main>
    </div> 
  );
}

