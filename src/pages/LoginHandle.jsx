import axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";

export default function LoginHandle() {
    const [userInfo,setUserInfo] = useRecoilState(userState)
    const location = useLocation();


        useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        axios.get(`https://c77c-222-108-73-38.ngrok-free.app/users/kakao/callback?code=${code}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
                'Accept': 'application/json'
            }
        })
        .then((res)=>{
            const userName = res.data.data.userName
            const point = res.data.data.point
            const accessToken = res.headers['authorization']
            console.log(res.headers)
            const info = {name:userName, point:point, accesstoken:accessToken}
            setUserInfo(info)
            console.log(userName)
        })
        .catch((error) => {
            console.error(error);
        }); 

      }, []);

      
  return (
    <div className='flex flex-col items-center h-3/5 justify-center'>
      <p className='text-4xl'>로그인 중입니다</p> 
    </div>
  )
}
