import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
// Need to declare modules in swiper.d.ts for TypeScript because Swiper's CSS files do not have type definitions
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/swiper.min.css'; // Use the compiled main CSS file
import type { Testomonial } from '../../types/types';
import { SliderCardSkeleton } from '../../pages/public/Skeltons/SliderCardSkelton';
interface SliderProps {
    data: Testomonial[],
    isLoading: boolean
}

interface CardProp {
    randval?: number,
    itemData?: Testomonial
}
const Slider: React.FC<SliderProps> = ({ data, isLoading }) => {
    const dataCount = data ? data.length : 0;
    console.log('Data Count:', dataCount);
    return (
        <>
            {/* <style>{customSwiperStyles}</style> */}
            <div className="mx-auto max-w-full mt-4">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    // spaceBetween={30}
                    loop={false}
                    slidesPerView={1}
                    centerInsufficientSlides={true}
                    // centeredSlides={true}
                    pagination={{ clickable: true }}
                    autoplay={ {
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1536: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                    }}
                    className="mySwiper !pb-12"
                // Tailwind class for height
                >
                    {isLoading ?
                        (Array.from({ length: 6 }).map((_, i) => (
                            <SwiperSlide key={`skeleton-${i}`}>
                                <SliderCardSkeleton />
                            </SwiperSlide>
                        )))
                        :
                        data && data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <SliderCard randval={1} itemData={item} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </>
    );
};

export default Slider;
const SliderCard: React.FC<CardProp> = ({ itemData }) => {
    console.log(itemData);
    return (
        <div className="bg-neutral-primary-soft block flex-col item-center max-w-sm rounded-lg shadow-lg">
            <div className="flex flex-col items-center my-3">
                <img className="rounded-full ring-4 ring-white" src={itemData?.image_url} alt="Bonnie image" />
                <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">{itemData?.client_name}</h5>
                <span className="text-sm text-body">{itemData?.designation}</span>
            <p className='p-6 text-center'>
                {itemData?.testimonial_text}
            </p>
            </div>
        </div>
    );
}

