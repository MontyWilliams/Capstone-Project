import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../styles/globals.css'
import campaignData from '../utils/campaigns.json'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../utils/campaigns';

function HomeSwiper () {
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
        className="mySwiper"
    >
      {campaignData.campaigns.map((campaign) => (
        <SwiperSlide key={campaign.Id}>
          <div>
            <h2>{campaign.name}</h2>
            <p>{campaign.description}</p>
            <img src={campaign.img} alt={campaign.name} />
            {/* Include other campaign details here as needed */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSwiper;
