import React, { useEffect, useState } from 'react'
import ImageMagnify from 'react-image-magnify'
import CustomLoadingScreen from '../CustomLoadingScreen'

const ImageMagnifySection = ({ loader, images }) => {
  const [mainImage, setMainImage] = useState(null)
  useEffect(() => {
    setMainImage(images[0])
  }, [images])

  if (loader) return <CustomLoadingScreen />

  return (
    <div>
      <div>
        <div className="border p-2 z-50">
          <ImageMagnify
            {...{
              smallImage: {
                alt: 'Main Image',
                isFluidWidth: true,
                src: mainImage,
              },
              largeImage: {
                src: mainImage,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: '150%',
                height: '150%',
              },
              enlargedImageContainerStyle: {
                zIndex: 9999999,
              },
            }}
          />
        </div>
        <div className="flex overflow-scroll">
          {images.map((image, index) => (
            <div
              key={index}
              className="border p-2 cursor-pointer"
              onClick={() => setMainImage(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageMagnifySection
