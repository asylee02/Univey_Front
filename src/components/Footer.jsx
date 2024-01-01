import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import Logo from './header/Logo';

export default function Footer() {
  return (
    <div>
        <div className='flex w-full justify-evenly px-96 h-72 border-1 border-line_color pt-10'>
            <ul className='text-left pt-5 space-y-3'>
                <li className='mb-5'><Logo/></li>
                <li>Univey@naver.com</li>
                <li>이용약관</li>
                <li>전자금융거래약관</li>
            </ul>
            <ul className='text-center space-y-3'>
                <li className='text-xl font-bold mb-5'>서비스</li>
                <li>설문 생성</li>
                <li>설문 참여</li>
                <li>결과 보기</li>
                <li>트렌드</li>
            </ul>
            <ul className='text-center space-y-3'>
                <li className='text-xl font-bold mb-5'>문의</li>
                <li>1:1 문의</li>
                <li>고객센터</li>
            </ul>
            <ul className='text-main_color space-y-3'>
                <li><FaFacebook className='h-10 w-10'/></li>
                <li><FaGithub className='h-10 w-10'/></li>
                <li><FaSquareInstagram className='rounded-full w-10 h-10'/></li>
            </ul>
        </div>
    </div>
  )
}
