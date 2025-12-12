import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// NOTE: We still need to import base styles for functionality, but we override the look with Tailwind.

// Custom styles to integrate Tailwind color into the pagination dots
// This is often necessary because Swiper creates the pagination dots (bullets) itself.
const customSwiperStyles = `
  /* Use Tailwind's blue-600 color for active pagination dot */
  .swiper-pagination-bullet-active {
    background-color: #2563eb !important; /* Tailwind's blue-600 */
    opacity: 1;
  }
`;

const Slider: React.FC = () => {
    return (
        <>
            <style>{customSwiperStyles}</style>
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
                    	640:{
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        768:{
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024:{
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1280:{
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1536:{
                             slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                // className="h-80" // Tailwind class for height
                >
                    <SwiperSlide>
                        <SliderCard randval={1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderCard randval={2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderCard randval={3} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderCard randval={4} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default Slider;


const SliderCard = ({ randval }: { randval: number }) => {
    return (
        <div className="bg-neutral-primary-soft block max-w-sm border rounded-lg shadow-xs">
            <img className="rounded-t-lg" src={`https://picsum.photos/382/255.webp?random=${randval}`} alt="no-view" />
            <div className="p-6 text-center">
                <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">Name</h5>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
            </div>
        </div>
    );
}