import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductCard from './ProductCard'
import { useRef } from 'react'

const LatestCollection = ({ products }) => {
  const carouselRef = useRef()

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
    pauseOnHover: true,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0 80px',

    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  return (
      <Slider ref={carouselRef} {...settings}>
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Slider>
  )
}

export default LatestCollection
