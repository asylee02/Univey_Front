import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import {useQuery} from '@tanstack/react-query'
import trend_carousel from '../assets/trend_carousel.svg'

export default function TrendCarousel() {
    const slickRef = useRef();

    const {data, isLoading } = useQuery({ queryKey: ['TrendCarousels'], queryFn: CarouselData })

    async function CarouselData(){
        return await axios('/data/TrendCarousel.json')
        .then((res)=>res.data.items)
      }

    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

        const settings = {
          arrows: false,
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
            }   
    return (
        <div className=''>
            <article className=' h-carousel relative w-screen '>
                <Slider {...settings} ref={slickRef} >
                    <div className='relative h-trend_carousel  '>
                        <img src={trend_carousel} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full rounded-2xl shadow-2xl'/>
                    </div>
                    <div className='relative h-trend_carousel  '>
                        <img src={trend_carousel} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full rounded-2xl shadow-2xl'/>
                    </div>
                    <div className='relative h-trend_carousel  '>
                        <img src={trend_carousel} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full rounded-2xl shadow-2xl'/>
                    </div>
                    <div className='relative h-trend_carousel  '>
                        <img src={trend_carousel} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full rounded-2xl shadow-2xl'/>
                    </div>
                </Slider>
                <div>
                    <div onClick={previous} className='text-3xl absolute top-1/2 left-80 -translate-y-full hover:cursor-pointer'>
                        <SlArrowLeft />
                    </div>
                    <div onClick={next} className='text-3xl absolute top-1/2 right-80 -translate-y-full hover:cursor-pointer'>
                        <SlArrowRight />
                    </div>
                </div>
            </article>
        </div>

    );
        
    }
