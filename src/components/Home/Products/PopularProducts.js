import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles';
import { Box, CardHeader } from '@mui/material'
import { CarouselControlsArrowsBasic1 } from '../../carousel'
import Slider from 'react-slick'
const ProductCard = dynamic(() => import('./ProductCard'))


const PopularProducts = ({ products }) => {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    // rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (

    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Newest Booking"
        subheader="12 Booking"
        action={
          <CarouselControlsArrowsBasic1
            arrowLine
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{
              position: 'static',
              '& button': { color: 'text.primary' }
            }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

        <Slider ref={carouselRef} {...settings}>
          {products?.slice(0, 3).map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </Slider>
    </Box>
  )
}

export default PopularProducts
