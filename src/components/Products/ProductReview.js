import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import { Divider, Rating } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function ProductReview({ product }) {
  const { reviews, name } = product
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = data => {
    console.log(data)
    reset()
  }

  return (
    <div>
      <h1 className="font-semibold">Rating & Reviews of {name}</h1>

      <div className="lg:flex items-center gap-5 mt-10 lg:mt-0 mb-10">
        <div className="sm:flex items-center gap-20 ">
          <div className="space-y-1 mb-5 sm:mb-0">
            <h1 className="text-4xl font-bold">
              4.7<span className="text-[25px] text-[#8b8b8b]">/5</span>
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
            <p className="text-[#585858] text-sm">310 Ratings</p>
          </div>

          <div className="space-y-2">
            <div className="flex  items-center gap-3">
              <Rating readOnly value={5} size="small" />
              <div className="flex items-center">
                <div className="w-[160px] bg-warning p-[5px]"></div>
                <div className="w-[20px] bg-[#ddd]  p-[5px]"></div>
              </div>
              <p className="text-sm text-[#535353]">273</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={4} size="small" />
              <div className="flex items-center">
                <div className="w-[60px] bg-warning p-[5px]"></div>
                <div className="w-[120px] bg-[#ddd]  p-[5px]"></div>
              </div>
              <p className="text-sm text-[#535353]">160</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={3} size="small" />
              <div className="flex items-center">
                <div className="w-[30px] bg-warning p-[5px]"></div>
                <div className="w-[150px] bg-[#ddd]  p-[5px]"></div>
              </div>
              <p className="text-sm text-[#535353]">52</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={2} size="small" />
              <div className="flex items-center">
                <div className="w-[15px] bg-warning p-[5px]"></div>
                <div className="w-[165px] bg-[#ddd]  p-[5px]"></div>
              </div>
              <p className="text-sm text-[#535353]">23</p>
            </div>
            <div className="flex  items-center gap-3">
              <Rating readOnly value={1} size="small" />
              <div className="flex items-center">
                <div className="w-[10px] bg-warning p-[5px]"></div>
                <div className="w-[170px] bg-[#ddd]  p-[5px]"></div>
              </div>
              <p className="text-sm text-[#535353]">5</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:px-5 mt-10">
          <h1 className='font-semibold mb-2'>Leave a Review on this Product</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              placeholder="Write your review here..."
              type="textarea"
              className="border w-full h-32 text-black p-3"
              {...register('review')}
            />
            <div className='flex justify-end'>
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
        <div className="border-b pb-5">
          <div className="flex items-center gap-2">
            <img
              src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"
              alt=""
              className="rounded-full h-12 w-12 border"
            />

            <div>
              <h1 className="font-semibold text-sm">Imran Hossen</h1>
              <Rating name="size-large" readOnly value={5} size="small" />
            </div>
          </div>
          <p className="text-sm text-[#616161] mt-2">
            first time order korechilam voy chilo kmn hobe pabo ki na but hate
            peye onk khushi 😍😍holam khub e valo ekta nikab kapor khub valo
            aramdayok ar packaging o valo chilo selar o onk valo Thank you so
            much daraz and sellar🥰🥰 ❤️❤️
          </p>
        </div>
        <div className="border-b pb-5">
          <div className="flex items-center gap-2">
            <img
              src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"
              alt=""
              className="rounded-full h-12 w-12 border"
            />

            <div>
              <h1 className="font-semibold text-sm">Imran Hossen</h1>
              <Rating name="size-large" readOnly value={5} size="small" />
            </div>
          </div>
          <p className="text-sm text-[#616161] mt-2">
            first time order korechilam voy chilo kmn hobe pabo ki na but hate
            peye onk khushi 😍😍holam khub e valo ekta nikab kapor khub valo
            aramdayok ar packaging o valo chilo selar o onk valo Thank you so
            much daraz and sellar🥰🥰 ❤️❤️
          </p>
        </div>
      </div>
    </div>
  )
}
