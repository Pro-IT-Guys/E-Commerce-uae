import React from 'react'

export default function CampaignList({ data, handleDeleteCampaign }) {
  const startDate = new Date(data?.startFrom)
  const formattedDate = startDate.toLocaleDateString()

  const endDate = new Date(data?.endAt)
  const formattedEndDate = endDate.toLocaleDateString()

  return (
    <div className="bg-white p-4 rounded shadow relative">
      <div className="flex items-center gap-10 ">
        <div className="w-[30%]">
          <img src={data?.image} alt="" className='rounded' />
        </div>
        <div className="w-[70%] space-y-3">
          <h1 className="font-semibold text-xl">{data?.title}</h1>
          <h1 className="font-semibold">
            Discount Price :{' '}
            <span className="text-[#5c5c5c] font-medium">
              {data?.discountPrice}
            </span>
          </h1>
          <h1 className="font-semibold">
            Start Date :{' '}
            <span className="text-[#5c5c5c] font-medium">{formattedDate}</span>
          </h1>
          <h1 className="font-semibold">
            End Date :{' '}
            <span className="text-[#5c5c5c] font-medium">
              {formattedEndDate}
            </span>
          </h1>
        </div>
      </div>
      <div className="absolute top-5 right-5">
        <button
          onClick={() => handleDeleteCampaign(data?._id)}
          className="bg-[#ff4d4d] hover:bg-[#da2c2c] text-white px-3 py-1 rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
