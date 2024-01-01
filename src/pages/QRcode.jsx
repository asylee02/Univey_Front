import React from 'react'
import { QRCode } from 'react-qrcode-logo';
import { IoSquareSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
export default function QRcode() {
  const [qrCode,setqrCode] = useState({
    size:'256',
    quietZone:'100',
    eyeColor:['black','black','black'],
    eyeRadius:0,
    logoWidth: '66',
    logoOpacity: '1',
    logoPadding: '10'
  });
  const [style,setStyle] =useState('squares')
  const [logoStyle, setLogoStyle] = useState('squares')
  const [img, setImg] = useState('');
  function handleStyle(e){
    e.preventDefault();
    setStyle(e.target.value)
  }

  function handleLogoStyle(e){
    e.preventDefault();
    setLogoStyle(e.target.value)
  }

  function handleImg(e){
    const reader = new FileReader();
    reader.onloadend = ()=>{
      setImg(reader.result)
      console.log(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]) 
  }

  function handleChange(e){
    const name = e.target.name
    setqrCode((prev)=>({
      ...prev,
      [name] : e.target.value
    }))
    console.log(e.target.value)
    console.log(qrCode)
  }

  useEffect(()=>{
    console.log('update')
  },[qrCode])
  
  return (
    <div>
      <div className='flex text-3xl items-center ml-80 mt-12 font-bold text-main_color'>
        <img src='https://url.kr/hkvjqz' className='ml-10 mt-1 mr-5 text-4xl'/>
        <h1 className=''>QR 생성</h1>
      </div>
        <p className='ml-leftxl mt-5'>설문조사 링크와 함께 제공되는 QR코드입니다. QR 코드를 예쁘게 꾸며보세요. 완성된 QR 코드는 SNS, 포스터 등에 사용하면 더욱 효과적이랍니다!</p>
        
        <section className='flex flex-col items-center mt-12'>
        <hr className='border-xs border-line_color w-line -mt-10 mb-10'/>
          
          <div className='w-80 h-80 bg-gray-400 flex justify-center items-center mb-12 overflow-hidden border-1 border-black'>
              <QRCode 
                  value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
                  size={qrCode.size}
                  quietZone={qrCode.quietZone}
                  fgColor={qrCode.fgColor}
                  bgColor={qrCode.bgColor}
                  qrStyle={style}
                  logoImage = {img} 
                  logoPaddingStyle = {logoStyle}
                  logoOpacity = {qrCode.logoOpacity/100}
                  logoWidth = {qrCode.logoWidth}
                  logoHeight = {qrCode.logoHeight}
                  logoPadding = {qrCode.logoPadding}
                  eyeRadius={qrCode.eyeRadius}
                  eyeColor={qrCode.first_color}
              />
          </div>
          <hr className='w-1/2 border-xs border-line_color mb-4'/>
            <p className='w-1/2 ml-20 mb-3 text-2xl text-main_color font-bold'>QR</p>
          <article className='w-screen flex flex-col items-center pl-20 mb-10 text-main_color'>

            <div className='flex w-1/2 mb-8'>
              <form action="" className=' w-1/2'>
                <label className='block mb-1 '>크기</label>
                <input name='size' onChange={handleChange} type="range" min={10} max={512} className='w-80 accent-main_color' value={qrCode.size} />
              </form>
              <form action="" className=' w-1/2'>
                <label className='block mb-1  '>배경 크기</label>
                <input name='quietZone' onChange={handleChange} type="range" min={10} max={60} className='w-80 accent-main_color' />
              </form>
            </div>

            <div className='flex w-1/2'>

              <div className='flex  w-1/2'>
                <form action="" className='mr-24'>
                  <label htmlFor="" className='block mb-1 '>색상</label>
                  <input type="color" name="fgColor" onChange={handleChange} className='w-20 rounded-md px-1 bg-white hover:cursor-pointer border-1 border-line_color'/>
                </form>
                <form action="">
                  <label htmlFor="" className='block mb-1 '>배경색상</label>
                  <input type="color" name='bgColor' onChange={handleChange} className='w-20 rounded-md border-1 px-1  bg-white border-line_color hover:cursor-pointer' />
                </form>
              </div>

              <div className='w-1/2'>
                <form action="">
                  <label htmlFor="">스타일</label>
                  <div className='flex mt-1'>
                    <button value={'squares'} onClick={handleStyle} className='w-24 h-8 justify-center flex items-center border-1 rounded-xl  border-main_color bg-main_color text-white font-thin pb-1'><IoSquareSharp className='text-sm mt-1 mr-2 '/> square</button>
                    <button value={'dots'} onClick={handleStyle} className='w-24 h-8 justify-center flex items-center border-1 rounded-xl  border-main_color bg-white text-main_color pb-1 ml-12'><FaCircle className='text-sm mt-1 mr-2 '/> dots</button>
                  </div>
                </form>
              </div>

            </div>

          </article>

          <hr className='w-qr_cutting  border-xs border-line_color mb-5'/>
          <p className='w-1/2 ml-20 mb-3 text-2xl text-main_color font-bold'>Logo</p>

          <article className='w-screen flex flex-col items-center pl-20 mb-10 text-main_color'>

            <div className='flex w-1/2 mb-8'>

              <div className='flex  w-1/2'>
                <form action="">
                  <label htmlFor="">이미지</label>
                  <input type="file" accept="image/*" className='w-20 h-8 justify-center flex  bg-white items-center border-1 rounded-xl border-main_color bg_wthie pb-1 mt-2 hover:bg-main_color  hover:text-white' onChange={handleImg}/>
                </form>
              </div>

              <div className='w-1/2'>
                <form action="">
                  <label htmlFor="">패딩 스타일</label>
                  
                  <div className='flex mt-1'>
                    <button onClick={handleLogoStyle} value='squares' className='w-24 h-8 justify-center flex items-center border-1 rounded-xl  bg_main  font-thin pb-1'><IoSquareSharp className='text-sm mt-1 mr-2 '/> square</button>
                    <button onClick={handleLogoStyle} value='circle' className='w-24 h-8 justify-center flex items-center border-1 rounded-xl  bg_white pb-1 ml-12'><FaCircle className='text-sm mt-1 mr-2 '/> circle</button>
                  </div>
                </form>
              </div>

            </div>

            <div className='flex w-1/2 mb-5'>
              <form action="" className=' w-1/2'>
                <label className='block mb-1 '>가로</label>
                <input type="range" min={0} max={256} className='w-80 accent-main_color' onChange={handleChange} name='logoWidth' value='66'/>
              </form>
              <form action="" className=' w-1/2'>
                <label className='block mb-1  '>세로</label>
                <input type="range" min={0} max={256} className='w-80 accent-main_color' onChange={handleChange} name='logoHeight'/>
              </form>
            </div>

            <div className='flex w-1/2'>
              <form action="" className=' w-1/2'>
                <label className='block mb-1 '>투명도</label>
                <input type="range" min={0} max={100} className='w-80 accent-main_color' onChange={handleChange} name='logoOpacity' value={qrCode.logoOpacity}/>
              </form>
              <form action="" className=' w-1/2'>
                <label className='block mb-1  '>패딩</label>
                <input type="range" min={10} max={20} className='w-80 accent-main_color' onChange={handleChange} name='logoPadding' 
                value={qrCode.logoPadding}/>
              </form>
            </div>
          </article>

          <div className='w-1/2 flex justify-end mb-24'>
            <button className='border-2 border-highligth text-highligth rounded-2xl w-36 h-12 font-bold '>설문생성</button>
          </div>
        </section>
    </div>
  )
}
