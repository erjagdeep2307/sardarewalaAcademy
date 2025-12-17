import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
// Need to declare modules in swiper.d.ts for TypeScript because Swiper's CSS files do not have type definitions
import 'swiper/css';
import 'swiper/css/pagination';
import type { Testomonial } from '../../types/types';
interface SliderProps {
    data: Testomonial[],
}

interface CardProp{
    randval?: number,
    itemData?: Testomonial
}
const Slider: React.FC<SliderProps> = ({ data }) => {
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
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        1536: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                // Tailwind class for height
                >
                    {data && data.map((item) => (
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


const SliderCard:React.FC<CardProp> = ({itemData}) => {
    return (
        <div className="bg-neutral-primary-soft block flex-col item-center max-w-sm rounded-lg shadow-lg">
            <p className='p-6 text-center'>
                {itemData?.content}
            </p>
            <div className="flex flex-col items-center mb-6">
                <img className="rounded-full ring-4 ring-white" src={itemData?.image} alt="Bonnie image" />
                <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">{itemData?.name}</h5>
                <span className="text-sm text-body">{itemData?.role}</span>
            </div>
        </div>
    );
}