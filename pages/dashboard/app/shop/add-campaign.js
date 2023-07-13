import { Container, InputAdornment, TextField } from '@mui/material'
import { BASE_URL } from 'apis/url'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import CampaignList from 'src/components/CampaignProducts/CampaignList'
import CampaignProducts from 'src/components/CampaignProducts/CampaignProducts'
import CustomLoadingScreen from 'src/components/CustomLoadingScreen'
import DashboardLayout from 'src/layouts/dashboard'
import Swal from 'sweetalert2'

export default function AddCampaign() {
  const [imageUrl, setImageUrl] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [campaign, setCampaign] = useState([])
  const [update, setUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    fetch(`${BASE_URL}/offer`)
      .then(res => res.json())
      .then(data => setCampaign(data.data))
  }, [update])

  const handleDeleteCampaign = id => {
    fetch(`${BASE_URL}/offer/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        if (result?.success) {
          setUpdate(Math.random())
          Swal.fire({
            title: 'Success!',
            text: 'Campaign deleted successfully!',
            icon: 'success',
            confirmButtonText: 'Ok',
          })
        } else {
          toast.error(result?.message)
        }
      })
      .catch(err => {
        toast.error('Something went wrong! please try again later!')
      })
  }

  const handleImageUpload = e => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image)

    fetch(`${BASE_URL}/image/single-image-upload`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(result => {
        setImageUrl(result?.url)
      })
      .catch(err => {
        toast.error('Something went wrong! please try again later!')
      })
  }

  const onSubmit = async data => {
    fetch(`${BASE_URL}/offer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        product: selectedProducts,
        image: imageUrl,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if (result?.success) {
          reset()
          setImageUrl('')
          setSelectedProducts([])
          setUpdate(Math.random())
          Swal.fire({
            title: 'Success!',
            text: 'Campaign added successfully!',
            icon: 'success',
            confirmButtonText: 'Ok',
          })
        } else {
          toast.error(result?.message)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Something went wrong! please try again later!')
      })
  }

  const handleSelectedProducts = id => {
    if (selectedProducts?.includes(id)) {
      setSelectedProducts(prev => prev.filter(item => item !== id))
    } else {
      setSelectedProducts(prev => [...prev, id])
    }
  }

  if (isLoading) return <CustomLoadingScreen />
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <h1 className="text-2xl font-semibold mb-8">Add Campaign</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-5 rounded shadow border py-10">
              <div className="grid grid-cols-2 sm:gap-5 gap-3 mb-5">
                <div className="flex flex-col items-start">
                  <TextField
                    fullWidth
                    label="Campaign Title"
                    {...register('title', {
                      required: {
                        value: true,
                        message: ' Title is Required',
                      },
                    })}
                  />
                  <label className="label">
                    {errors.title?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.title.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <TextField
                    fullWidth
                    label=" Discount Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Price</InputAdornment>
                      ),
                      type: 'number',
                    }}
                    {...register('discountPrice', {
                      required: {
                        value: true,
                        message: 'Discount Price is Required',
                      },
                    })}
                  />
                  <label className="quantity">
                    {errors.discountPrice?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.discountPrice.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:gap-5 gap-3">
                <div className="flex flex-col items-start">
                  <h1 className="text-xs font-semibold mb-1">Start Date</h1>
                  <TextField
                    fullWidth
                    // label="Start Date"
                    InputProps={{
                      type: 'date',
                    }}
                    {...register('startFrom', {
                      required: {
                        value: true,
                        message: 'Start Date is Required',
                      },
                    })}
                  />
                  <label className="quantity">
                    {errors.startFrom?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.startFrom.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-xs font-semibold mb-1">End Date</h1>
                  <TextField
                    fullWidth
                    // label="End Date"
                    InputProps={{
                      type: 'date',
                    }}
                    {...register('endAt', {
                      required: {
                        value: true,
                        message: 'End Date is Required',
                      },
                    })}
                  />
                  <label className="quantity">
                    {errors.endAt?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.endAt.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:gap-5 gap-3 mt-5">
                <div>
                  <h1 className="ml-1 text-sm mb-2 ">Campaign Image</h1>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    // accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  {imageUrl && (
                    <img src={imageUrl} alt="" className="w-40 h-40 rounded" />
                  )}
                </div>
              </div>
            </div>
            <CampaignProducts
              handleSelectedProducts={handleSelectedProducts}
              selectedProducts={selectedProducts}
            />
            <div className="flex justify-start mt-4 ml-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {campaign && (
          <div>
            <h1 className="text-2xl font-semibold mb-8 mt-10">Campaign List</h1>
            <CampaignList
              data={campaign}
              handleDeleteCampaign={handleDeleteCampaign}
            />
          </div>
        )}
      </Container>
    </DashboardLayout>
  )
}
