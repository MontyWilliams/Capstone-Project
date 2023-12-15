import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../styles/globals.css'
import campaignData from '../utils/campaigns.json'


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
      // pagination={{
      //     clickable: true,
      //   }}
      //   navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper profileCard"
    >
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src="/baseball.png" alt="baseball"/>
          <p className='p-4 '>"Summer kids Baseball league"</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src="/farmersMarket.png" alt="baseball"/>
          <p className='p-4 '>"Farmers Market Money Maker"</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src="/back to school.png" alt="baseball"/>
          <p className='p-4 '>"Back to School Special"</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src="/carpooling.png" alt="baseball"/>
          <p className='p-4 '>"Car-pool presents for parents"</p>
        </div>
      </SwiperSlide>
      
    </Swiper>
  );
};

export default SwiperComp;
