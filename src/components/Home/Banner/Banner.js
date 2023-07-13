import { Checkbox, Container, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import CategoryNav from 'src/layouts/main/CategoryNav'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
// import styles from "./Sidebar.module.css";
import 'swiper/css/autoplay'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { BASE_URL } from 'apis/url'
import { ContextData } from 'context/dataProviderContext'

const Banner = () => {
  const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(17),
    // [theme.breakpoints.up("md")]: {
    //   paddingBottom: theme.spacing(15),
    // },
    // paddingBottom: theme.spacing(5),
  }))

  const {currentlyLoggedIn} = useContext(ContextData)
  const [offer, setOffer] = useState([])
  const { image, title, startFrom, endAt, isVisible } = offer || {}

  useEffect(() => {
    fetch(`${BASE_URL}/Offer`)
      .then(res => res.json())
      .then(data => {
        console.log(data, '=================================================================')
        setOffer(data.data)
      })
      .catch(err => console.log(err))
  }, [currentlyLoggedIn])

  // console.log(
  //   offer,
  //   '==============================================================='
  // )

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
                  modules={[Pagination, Autoplay]}
                  // className={styles}
                  autoplay={true}
                  navigation
                >
                  <SwiperSlide>
                    <div className=" ">
                      <img
                        alt="banner"
                        src="https://i.ibb.co/k6bPwrY/Delivery-within-48-Hours-Banner-AYMI-Fashion-1200x600.png"
                        className="w-full h-full object-cover md:rounded-lg rounded"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className=" ">
                      <img
                        alt="banner"
                        src="https://i.ibb.co/p3H86Hs/Free-Delivery-Banner-AYMI-Fashion-1200x600.png"
                        className="w-full h-full object-cover md:rounded-lg rounded"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className=" ">
                      <img
                        alt="banner"
                        src="https://i.ibb.co/k6bPwrY/Delivery-within-48-Hours-Banner-AYMI-Fashion-1200x600.png"
                        className="w-full h-full object-cover md:rounded-lg rounded"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {isVisible && (
              <div className="md:w-[27%] w-[27%] overflow-hidden">
                <div className=" ">
                  <img
                    alt="offer"
                    src={image}
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
