import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function SwiperComp () {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
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
