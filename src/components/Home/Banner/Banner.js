
import { styled } from '@mui/material/styles'
// components
import Page from 'src/components/Page'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { BASE_URL } from 'apis/url'
import { ContextData } from 'context/dataProviderContext'
import { Container } from '@mui/material'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  paddingTop: theme => theme.spacing(17),
})

const Banner = () => {
  const { currentlyLoggedIn } = useContext(ContextData)
  const [offer, setOffer] = useState([])
  const { image, isVisible } = offer || {}

  useEffect(() => {
    fetch(`${BASE_URL}/Offer`)
      .then(res => res.json())
      .then(data => {
        setOffer(data.data)
      })
      .catch(err => console.log(err))
  }, [currentlyLoggedIn])

  // Lazy load the images
  const bannerImages = [
    'https://i.ibb.co/k6bPwrY/Delivery-within-48-Hours-Banner-AYMI-Fashion-1200x600.png',
    'https://i.ibb.co/p3H86Hs/Free-Delivery-Banner-AYMI-Fashion-1200x600.png',
    'https://i.ibb.co/k6bPwrY/Delivery-within-48-Hours-Banner-AYMI-Fashion-1200x600.png',
  ]

  SwiperCore.use([Pagination, Autoplay])

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
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={true}
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
