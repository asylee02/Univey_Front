import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../components/icons/CheckIcon';
import HomeIcon from '../components/icons/HomeIcon';

export default function ParticipateComplete() {

  const navigate = useNavigate();

  const handleReturnClick = () => {
    // const newPath = '/'; 
    // navigate(newPath);
    console.log('move move')
  };

  const handleReturnMainClick = () => {
    navigate('/');
  };

  

  return (
    <div className='realative h-screen flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center mb-5'>
        <CheckIcon/> 
        <h1 className='ml-5 text-main_color text-4xl mb-1'>포인트 획득!</h1>
      </div>
      <div>
        <p className='flex justify-center text-l text-center'>
          설문 응답이 완료되었습니다! 획득한 포인트는 마이페이지에서 
          확인 가능합니다. <br />
          설문에 응해주셔서 감사합니다:)        
        </p>
      </div>
      <div className='flex justify-center space-x-8 mt-20'>
        <button onClick={handleReturnMainClick}>
          <HomeIcon />
        </button>
        <button 
          className='py-2 px-16 rounded-2xl bg-main_color text-white text-xl'
          onClick={handleReturnClick}>
          돌아가기
        </button>
      </div>
    </div>
  );
}

