import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
// Need to declare modules in swiper.d.ts for TypeScript because Swiper's CSS files do not have type definitions
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/swiper.min.css'; // Use the compiled main CSS file
import type { Testomonial } from '../../types/types';
interface SliderProps {
    data: Testomonial[],
    isLoading: boolean
}

interface CardProp {
    randval?: number,
    itemData?: Testomonial
}
const Slider: React.FC<SliderProps> = ({ data, isLoading }) => {
    return (
        <>
            {/* <style>{customSwiperStyles}</style> */}
            <div className="mx-auto max-w-fit mt-4">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    // spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                        },
                        1280: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                        },
                        1536: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                    }}
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
            <p className='p-6 text-center'>
                {itemData?.testimonial_text}
            </p>
            <div className="flex flex-col items-center mb-6">
                <img className="rounded-full ring-4 ring-white" src={itemData?.image_url} alt="Bonnie image" />
                <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">{itemData?.client_name}</h5>
                <span className="text-sm text-body">{itemData?.designation}</span>
            </div>
        </div>
    );
}

const SliderCardSkeleton: React.FC = () => {
    return (
        <div className="bg-neutral-primary-soft flex flex-col max-w-sm rounded-lg shadow-lg animate-pulse">
            {/* Content */}
            <div className="p-6">
                <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-300 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
        </div>
    );
};