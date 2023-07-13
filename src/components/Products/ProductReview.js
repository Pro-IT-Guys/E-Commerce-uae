import React, { useContext, useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import { Box, Divider, Rating, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { getReviews, leaveReview } from 'apis/review.api'
import { toast } from 'react-hot-toast'
import { ContextData } from 'context/dataProviderContext'
import CustomLoadingScreen from '../CustomLoadingScreen'
import { reviewCount } from 'helpers/reviewCount'
const DynamicRating = dynamic(() => import('@mui/material/Rating'), {
  ssr: false,
})

export default function ProductReview({ product }) {
  const { currentlyLoggedIn } = useContext(ContextData)
  const { reviews, name } = product
  const [rating, setRating] = useState(0)
  const [reviewList, setReviewList] = useState({})
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    const _retriveReviews = async () => {
      setLoading(true)
      const response = await getReviews(product?._id)
      if (response?.statusCode === 200) {
        setReviewList(response?.data)
      }
      setLoading(false)
    }
    _retriveReviews()
  }, [product])

  console.log(reviewList, 'reviewList')

  const handleRatingChange = (event, newValue) => {
    setRating(newValue)
  }

  const onSubmit = async data => {
    if (!currentlyLoggedIn) return toast.error('Please login to leave a review')
    const { review } = data
    const dataToSubmit = {
      rating,
      comment: review,
      userId: currentlyLoggedIn?._id,
      productId: product?._id,
    }
    const response = await leaveReview(dataToSubmit)
    if (response?.statusCode === 200) {
      toast.success('Review submitted successfully')
      setRating(0)
    }
    reset()
  }

  if (loading) return <CustomLoadingScreen />

  return (
    <div>
      <h1 className="font-semibold">Rating & Reviews of {name}</h1>

      <div className="lg:flex items-center gap-5 mt-10 lg:mt-0 mb-10">
        <div className="sm:flex items-center gap-20 ">
          <div className="space-y-1 mb-5 sm:mb-0">
            <h1 className="text-4xl font-bold">
              {reviewList?.rating}
              <span className="text-[25px] text-[#8b8b8b]">/5</span>
            </h1>
            {/* <Rating name="size-large" readOnly value={5} size="large" /> */}
            <Rating
              name="text-feedback"
              value={5}
              readOnly
              precision={5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <p className="text-[#585858] text-sm">
              {reviewList?.review?.length} Ratings
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex  items-center gap-3">
              <Rating readOnly value={5} size="small" />
              <div className="w-[180px] flex items-center">
                <div
                  className=" bg-warning p-[5px]"
                  style={{
                    width: `${reviewCount(
                      reviewList?.review?.length,
                      reviewList?.fiveStar
                    )}%`,
                  }}
                ></div>
                <div
                  className=" bg-[#ddd]  p-[5px]"
                  style={{
                    width: `${
                      100 -
                      reviewCount(
                        reviewList?.review?.length,
                        reviewList?.fiveStar
                      )
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-[#535353]">{reviewList?.fiveStar}</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={4} size="small" />
              <div className="w-[180px] flex items-center">
                <div
                  className=" bg-warning p-[5px]"
                  style={{
                    width: `${reviewCount(
                      reviewList?.review?.length,
                      reviewList?.fourStar
                    )}%`,
                  }}
                ></div>
                <div
                  className=" bg-[#ddd]  p-[5px]"
                  style={{
                    width: `${
                      100 -
                      reviewCount(
                        reviewList?.review?.length,
                        reviewList?.fourStar
                      )
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-[#535353]">{reviewList?.fourStar}</p>
            </div>
            <div className=" flex  items-center gap-3">
              <Rating readOnly value={3} size="small" />
              <div className="w-[180px] flex items-center">
                <div
                  className=" bg-warning p-[5px]"
                  style={{
                    width: `${reviewCount(
                      reviewList?.review?.length,
                      reviewList?.threeStar
                    )}%`,
                  }}
                ></div>
                <div
                  className=" bg-[#ddd]  p-[5px]"
                  style={{
                    width: `${
                      100 -
                      reviewCount(
                        reviewList?.review?.length,
                        reviewList?.threeStar
                      )
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-[#535353]">{reviewList?.threeStar}</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={2} size="small" />
              <div className="w-[180px] flex items-center">
                <div
                  className=" bg-warning p-[5px]"
                  style={{
                    width: `${reviewCount(
                      reviewList?.review?.length,
                      reviewList?.twoStar
                    )}%`,
                  }}
                ></div>
                <div
                  className=" bg-[#ddd]  p-[5px]"
                  style={{
                    width: `${
                      100 -
                      reviewCount(
                        reviewList?.review?.length,
                        reviewList?.twoStar
                      )
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-[#535353]">{reviewList?.twoStar}</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={1} size="small" />
              <div className="w-[180px] flex items-center">
                <div
                  className=" bg-warning p-[5px]"
                  style={{
                    width: `${reviewCount(
                      reviewList?.review?.length,
                      reviewList?.oneStar
                    )}%`,
                  }}
                ></div>
                <div
                  className=" bg-[#ddd]  p-[5px]"
                  style={{
                    width: `${
                      100 -
                      reviewCount(
                        reviewList?.review?.length,
                        reviewList?.oneStar
                      )
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-[#535353]">{reviewList?.oneStar}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:px-5 mt-10">
          <h1 className="font-semibold mb-2">Leave a Review on this Product</h1>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 3,
            }}
          >
            <div>
              <DynamicRating
                name="feedback-rating"
                value={rating}
                onChange={handleRatingChange}
                size="medium"
              />
            </div>
            <Typography variant="h6">{rating || 0}</Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              placeholder="Write your review here..."
              type="textarea"
              className="border w-full h-32 text-black p-3"
              {...register('review')}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#f5c518] text-white px-5 py-1 text-end rounded mt-5"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <Divider />
      <div className="mt-10 space-y-5">
        {reviewList?.review?.map((review, index) => (
          <div key={index} className="border-b pb-5">
            <div className="flex items-center gap-2">
              <img
                src={
                  review?.userId?.image ||
                  'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'
                }
                alt=""
                className="rounded-full h-12 w-12 border"
              />

              <div>
                <h1 className="font-semibold text-sm">
                  {review?.userId?.name?.firstName}{' '}
                  {review?.userId?.name?.lastName}
                </h1>
                <Rating
                  name="size-large"
                  readOnly
                  value={review?.rating}
                  size="small"
                />
              </div>
            </div>
            <p className="text-sm text-[#616161] mt-2">{review?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
