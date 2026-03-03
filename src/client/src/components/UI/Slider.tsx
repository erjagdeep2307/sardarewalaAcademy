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
    // const dataCount = data ? data.length : 0;
    // console.log('Data Count:', dataCount);
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
                    autoplay={{
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
                            <SwiperSlide key={item.id} className="!h-auto">
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
    // console.log(itemData);
    return (
        <div className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-full flex-col items-center text-center">
                <img
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-md"
                    src={itemData?.image_url}
                    alt={`${itemData?.client_name} Image`}
                />
                <h5 className="mt-3 text-base font-bold tracking-tight text-heading line-clamp-1">
                    {itemData?.client_name}
                </h5>
                <span className="mt-1 text-sm font-medium text-body line-clamp-1">
                    {itemData?.designation}
                </span>
                <div className="mt-3 w-full rounded-xl bg-gray-50 px-3 py-3">
                    {/* <p className="text-3xl leading-none text-orange-400">"</p> */}
                    <p className="mt-1 min-h-[72px] text-sm leading-relaxed text-body line-clamp-3">
                        {itemData?.testimonial_text}
                    </p>
                </div>
            </div>
        </div>
    );
}
