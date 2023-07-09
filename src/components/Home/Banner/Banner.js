import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import React from 'react'
import Image from 'next/image'
import CategoryNav from 'src/layouts/main/CategoryNav'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
// import styles from "./Sidebar.module.css";
import 'swiper/css/autoplay'
import SwiperCore, { Pagination, Autoplay } from 'swiper'

const Banner = () => {
  const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(17),
    // [theme.breakpoints.up("md")]: {
    //   paddingBottom: theme.spacing(15),
    // },
    // paddingBottom: theme.spacing(5),
  }))

  return (
    <div className="bg-[#f7f7ff9c] pt-5 pb-10">
      <RootStyle>
        {/* <CategoryNav/> */}
        <Container maxWidth="lg">
          <div className="flex items-center md:gap-5 gap-2">
            <div className="md:w-[73%] w-[73%] ">
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
              </Swiper>
            </div>
            <div className="md:w-[27%] w-[27%] ">
              <div className=" ">
                <img
                  alt="banner"
                  src="https://i.ibb.co/8BbchCg/Save-Upto-80-AED-Side-Banner-AYMI-Fashion-custom-415x600.jpg"
                  className="w-full h-full md:rounded-lg rounded"
                />
              </div>
            </div>
          </div>
        </Container>
      </RootStyle>
    </div>
  )
}

export default Banner
