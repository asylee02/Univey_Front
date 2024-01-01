import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import HandleSearch from './HandleSearch';
import Logo from './Logo';

export default function Header() {
  const [userInfo,setUserInfo] = useRecoilState(userState)
  const key = process.env.REACT_APP_REST_API_KEY
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=a7112c7855122c19ace78f063bcce15a&redirect_uri=http://localhost:3000/users/kakao/callback&response_type=code`

  

  function handleLogout(){
    setUserInfo('')
  }


  return (
    <nav className=' relative h-1/7  px-36 border-b-1 border-line_color'>
      <div className='text-sm absolute right-80 text-sub_text_color bottom-120 mt-3'>
        {userInfo.name ? <div> <span>{userInfo.name}</span> | <span className='mr-5'>{userInfo.point} point</span> <span className='hover:cursor-pointer' onClick={handleLogout}>로그아웃</span></div>: <a href={ url }>로그인</a>}
        
      </div>
      <div className=' flex justify-evenly h-28 items-center pt-4'>
        <div className='flex items-center'>
          <Link to='/main'>
            <Logo/>
          </Link>
        <ul className=' text-lg flex font-semibold text-text_color justify-around w-72 ml-16 mt-2'>
          <Link to='/main/create' className='click_highlight'>설문생성</Link>
          <Link to='/main/board' className='click_highlight'>설문보기</Link>
          <Link to='/main/trend'className='click_highlight'>트렌드</Link>
        </ul>
        </div>
        <div className='ml-36 flex w-1/3'>
          <HandleSearch/>
          <Link to='/main/my'><button className=' text-4xl text-main_color ml-4'><FaUserCircle/></button></Link>
        </div>
      </div>
    </nav>
  );
}