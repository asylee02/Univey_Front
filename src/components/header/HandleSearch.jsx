import React from 'react'
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router';

export default function HandleSearch() {
    const navigate = useNavigate()
    const [text,setText] = useState();
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/main/search/${text}`)
        setText('')
      }
      const handleChange =(e)=>{
        setText(e.target.value)
      }

  return (
    <form onSubmit={handleSubmit} className='relative w-10/12 h-10'>                             
        <input value={text} onChange={handleChange} className=' border-2 rounded-3xl border-main_color w-full h-full pl-4 focus:outline-none text-text_color' type="text"/>
        <button className=' text-main_color absolute text-4xl align-middle right-2'><CiSearch/></button>
    </form>
  )
}
