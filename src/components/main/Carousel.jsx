import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useQuery} from '@tanstack/react-query'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import carouselImg from '../assets/carousel.svg'

export default function Carousel() {
    const {data, isLoading } = useQuery({ queryKey: ['Carousel'], queryFn: CarouselData })
    const slickRef = useRef(null);
    
    function CarouselData(){
        return axios('/data/Carousel.json')
            .then((res) => res.data.items)
    }
    
    console.log(data)

    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

        const settings = {
          arrows: false,
          dots: false,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
            }   
    return (
        
        <div className='border-b-1 border-line_color'>

            <article className=' h-carousel relative'>
                <Slider {...settings} ref={slickRef} >
                    <div className='relative h-carousel'>
                        <img src={carouselImg} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full'/>
                    </div>
                    <div className='relative h-carousel'>
                        <img src={carouselImg} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full'/>
                    </div>
                    <div className='relative h-carousel'>
                        <img src={carouselImg} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full'/>
                    </div>
                    <div className='relative h-carousel'>
                        <img src={carouselImg} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full'/>
                    </div>
                    <div className='relative h-carousel'>
                        <img src={carouselImg} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full'/>
                    </div>
                </Slider>
                <div>
                    <div onClick={previous} className='text-3xl absolute top-1/2 left-48 hover:cursor-pointer'>
                        <SlArrowLeft />
                    </div>
                    <div onClick={next} className='text-3xl absolute top-1/2 right-48 hover:cursor-pointer'>
                        <SlArrowRight />
                    </div>
                </div>
            </article>
        </div>

    );
        
    }
