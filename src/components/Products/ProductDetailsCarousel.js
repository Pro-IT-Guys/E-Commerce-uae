import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CarouselControlsArrowsIndex } from '../carousel';
import ImageMagnify from 'react-image-magnify';

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: THUMB_SIZE,
  overflow: 'hidden',
  height: THUMB_SIZE,
  position: 'relative',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity')
  },
  '& .isActive': {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 3px ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.grey[900], 0.48)
  }
}));

const LargeImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const ThumbImgStyle = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

// ----------------------------------------------------------------------


ThumbnailItem.propTypes = {
  item: PropTypes.string
};

function ThumbnailItem({ item }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <ThumbImgStyle alt="thumb image" src={item} />
    </ThumbWrapperStyle>
  );
}

export default function ProductDetailsCarousel({ product, imagesArray }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [imgUrl, setImgUrl] = useState(imagesArray[0]);

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next)
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: imagesArray?.length > 3 ? 3 : imagesArray?.length
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [currentIndex]);

  const handlePrevious = () => {
    slider2.current.slickPrev();
  };

  const handleNext = () => {
    slider2.current.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            // overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <ReactSlick
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
              }}
              {...rsProps}
            >
              {imagesArray?.map((item, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <ImageMagnify
                    smallImage={{
                      alt: 'large image',
                      isFluidWidth: true,
                      src: item,
                      srcSet: item
                    }}
                    largeImage={{
                      alt: 'large image',
                      src: item,
                      width: 1200,
                      height: 1800,
                      srcSet: item,
                      className: 'absolute top-0 left-0 w-full h-full object-cover'
                    }}
                    isHintEnabled={true}
                  />
                </Box>
              ))}
            </ReactSlick>
          </Box>
          {/* <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {imagesArray?.map((item, index) => (
               <Box key={index} 
               sx={{
                position: 'relative',
               }}
               >
               <ImageMagnify
                 smallImage={{
                   alt: 'large image',
                   isFluidWidth: true,
                   src: item,
                   srcSet: item
                   
                 }}
                 largeImage={{
                    alt: 'large image',
                   src: item,
                   width: 1200, 
                   height: 1800 ,
                    srcSet: item,
                    className: 'absolute top-0 left-0 w-full h-full object-cover'

                 }}
                 isHintEnabled={true}
               />
             </Box>
            ))}
          </Slider> */}
          <CarouselControlsArrowsIndex
            index={currentIndex}
            total={imagesArray?.length}
            onNext={handleNext}
            onPrevious={handlePrevious}

          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(imagesArray?.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(imagesArray?.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(imagesArray?.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(imagesArray?.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(imagesArray?.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(imagesArray?.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0)} 0%, ${theme.palette.background.paper
                } 100%)`
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' }
          })
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {imagesArray?.map((item) => (
            <ThumbnailItem key={item} item={item} onClick={() => setImgUrl(item)} />
          ))}
        </Slider>
      </Box>
    </RootStyle>
  );
}
