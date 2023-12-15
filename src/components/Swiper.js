import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../styles/globals.css'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function SwiperComp () {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper card"
    >
      <SwiperSlide>
        <img src="/baseball.png" alt="baseball"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/farmersMarket.png" alt="baseball"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/back to school.png" alt="baseball"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/carpooling.png" alt="baseball"/>
      </SwiperSlide>
      
    </Swiper>
  );
};

export default SwiperComp;
