import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'

import Image from 'next/image'
import { useContext } from 'react'
import { BASE_URL } from '../../../../apis/url'
import { ContextData } from '../../../../context/dataProviderContext'
import dynamic from 'next/dynamic'
import { getCurrentOffer } from '../../../../apis/offer.api'
const Container = dynamic(() => import('@mui/material/Container'), {
  ssr: false,
})

// ----------------------------------------------------------------------

const Banner = () => {
  const { currentlyLoggedIn } = useContext(ContextData)
  const [offer, setOffer] = useState(null)
  const { image, isVisible } = offer || {}

  useEffect(() => {
    const retriveOffer = async () => {
      const response = await getCurrentOffer()
      setOffer(response?.data)
    }
    retriveOffer()
  }, [currentlyLoggedIn])

  // Lazy load the images
  const bannerImages = [
    'https://i.ibb.co/1zWZkRp/Free-Delivery-Banner-AYMI-Fashion-1200x600.webp',
    'https://i.ibb.co/wK3HkcD/Delivery-within-48-Hours-Banner-AYMI-Fashion-1200x600.webp',
  ]

  return (
    <div className="bg-[#f7f7ff9c] pt-5 pb-10">
      <div className="pt-32">
        {/* <CategoryNav/> */}
        <Container maxWidth="lg">
          <div className={`${isVisible && 'flex'} items-center md:gap-5 gap-2`}>
            <div
              className={`${isVisible && 'md:w-[73%] w-[73%]'} w-full h-full`}
            >
              <div>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2300,
                  }}
                  modules={[Autoplay]}
                >
                  {bannerImages.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <div className=" ">
                        <Image
                          alt={`banner-${index}`}
                          src={imageUrl}
                          layout="responsive"
                          width={1200}
                          height={600}
                          className="w-full h-full object-cover md:rounded-lg rounded"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            {isVisible && (
              <div className="md:w-[27%] w-[27%] overflow-hidden">
                <div className=" ">
                  <Image
                    alt="offer"
                    src={image}
                    layout="responsive"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Banner
