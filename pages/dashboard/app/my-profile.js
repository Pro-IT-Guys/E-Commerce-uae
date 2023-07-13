import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { getAllCountriesWithFees } from 'apis/fee.api'
import { BASE_URL } from 'apis/url'
import countries from 'constant/countries'
import { ContextData } from 'context/dataProviderContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Page from 'src/components/Page'
import { UploadAvatar } from 'src/components/upload'
import DashboardLayout from 'src/layouts/dashboard'
import { fData } from 'src/utils/formatNumber'
import Swal from 'sweetalert2'

export default function MyProfile() {
  const [image, setImage] = useState([])
  const [imgPath, setImgPath] = useState()
  const { currentlyLoggedIn, setUpdate } = useContext(ContextData)
  const { _id, name, phone, shippingAddress, zipCode, email } =
    currentlyLoggedIn || {}
  const [country, setCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const _retriveCountry = async () => {
      const result = await getAllCountriesWithFees()
      setCountry(result?.data)
    }
    _retriveCountry()
  }, [])

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
        console.log(result)
        setImageUrl(result?.url)
      })
      .catch(err => {
        setLoading(false)
        toast.error('Something went wrong! please try again later!')
      })
  }

  const handleCountryChange = e => {
    const countryId = e.target.value
    setSelectedCountry(countryId)
  }

  const handleStateChange = e => {
    if (!selectedCountry) return

    const stateId = e.target.value
    setSelectedState(stateId)
  }
  console.log(imageUrl, 'image url')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const handleDrop = useCallback(
    acceptedFiles => {
      setImgPath(acceptedFiles[0])
      const file = acceptedFiles[0]
      if (file) {
        setImage({
          ...file,
          preview: URL.createObjectURL(file),
        })
      }
    },
    [image]
  )

  const onSubmit = data => {
    const userData = {
      name: {
        firstName: data.firstName || name?.firstName,
        lastName: data.lastName || name?.lastName,
      },
      image: imageUrl || currentlyLoggedIn?.image,
      phone: data.phoneNumber || phone,
      shippingAddress: {
        country: selectedCountry || shippingAddress?.country,
        state: selectedState || shippingAddress?.state,
        city: selectedCity || shippingAddress?.city,
        address_line: data.address || shippingAddress?.address_line,
      },
      zipCode: data.zipCode || zipCode,
    }

    fetch(`${BASE_URL}/users/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data?.success) {
          setUpdate(Math.random())
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          reset()
        }
      })
  }

  console.log(selectedCountry, 'selected country')

  return (
    <DashboardLayout>
      <Page title="AYMi | My Profile">
        <Container maxWidth="lg">
          <h1 className="font-bold text-2xl">My Profile</h1>
          <div className="flex gap-2 text-sm mt-3 text-[#636262]">
            <p>Dashboard - </p>
            <p>Profile - </p>
            <p>Update </p>
          </div>
          <div className="flex justify-center items-center bg-white rounded-xl shadow mt-5">
            <div className="w-full  sm:p-10 px-3 py-5">
              <div className=" rounded-lg w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="md:flex gap-10">
                    <div className="md:w-[30%]">
                      {/* <Box sx={{ mb: 5 }}>
                        <UploadAvatar
                          accept="image/*"
                          file={imageUrl}
                          maxSize={3145728}
                          onChange={handleImageUpload}
                          caption={
                            <Typography
                              variant="caption"
                              sx={{
                                mt: 2,
                                mx: 'auto',
                                display: 'block',
                                textAlign: 'center',
                                color: 'text.secondary',
                              }}
                            >
                              Allowed *.jpeg, *.jpg, *.png, *.gif
                              <br /> max size of {fData(3145728)}
                            </Typography>
                          }
                        />
                      </Box> */}
                      <div>
                        <h1 className="mb-2 font-semibold">Profile Image</h1>
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          // accept="image/*"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />

                        <div className="p-5 ">
                          <img
                            src={imageUrl || currentlyLoggedIn?.image}
                            alt=""
                            className="rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" md:w-[70%]">
                      <h1 className="mb-2 font-semibold"> Your Personal Details</h1>
                      <div className="grid grid-cols-2 sm:gap-5 gap-3 mb-5">
                        <div className="flex flex-col items-start">
                          <TextField
                            fullWidth
                            label="First Name"
                            placeholder={name?.firstName}
                            {...register('firstName')}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <TextField
                            fullWidth
                            label="Last Name"
                            {...register('lastName')}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <TextField
                            className="select-none "
                            disabled
                            fullWidth
                            // label="Email"
                            value={email}
                            {...register('email')}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <TextField
                            fullWidth
                            label="Phone Number"
                            {...register('phoneNumber')}
                          />
                        </div>
                      </div>
                      <h1 className="font-semibold">Shipping Address :</h1>
                      <div className="grid grid-cols-2 sm:gap-5 gap-3 mt-3">
                        <div className="flex flex-col items-start">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Country
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedCountry || ''}
                              label="Country"
                              onChange={e => handleCountryChange(e)}
                            >
                              {country?.map(option => (
                                <MenuItem
                                  key={option.country_code}
                                  value={option?.country}
                                >
                                  <Typography
                                    onClick={() => setState(option.states)}
                                  >
                                    {option?.country}
                                  </Typography>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        {selectedCountry && (
                          <div>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                State
                              </InputLabel>
                              <Select
                                // disabled={!selectedCountry}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedState || ''}
                                label="Country"
                                onChange={e => handleStateChange(e)}
                              >
                                {state?.map(option => (
                                  <MenuItem
                                    style={{ display: 'block' }}
                                    key={option.state_code}
                                    value={option?.state_code}
                                  >
                                    <Typography
                                      style={{ display: 'block' }}
                                      onClick={() => setCity(option?.cities)}
                                    >
                                      {option?.state_name}
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        )}
                        {selectedState && (
                          <div className="flex flex-col items-start">
                            <FormControl fullWidth>
                              <InputLabel id="city-label">City</InputLabel>
                              <Select
                                labelId="city-label"
                                id="demo-simple-select"
                                value={selectedCity || ''}
                                label="City"
                                onChange={e => setSelectedCity(e.target.value)}
                              >
                                {city?.map(i => (
                                  <MenuItem
                                    key={i?.city_name}
                                    value={i?.city_name}
                                  >
                                    {i?.city_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        )}

                        <div className="flex flex-col items-start">
                          <TextField
                            fullWidth
                            label="Zip Code"
                            {...register('zipCode')}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start mt-4">
                        <h1 className="text-sm mb-1">Address Line</h1>
                        <textarea
                          placeholder="Azadi Bazar, Dharmapur, Fatikcchari, Chittagong, Bangladesh 4351"
                          className="border w-full h-20 p-2 text-sm rounded-md"
                          {...register('address')}
                        ></textarea>
                      </div>
                      <div className="relative mt-5">
                        <button
                          type="submit"
                          className=" py-2 px-5 rounded bg-primary text-white "
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Page>
    </DashboardLayout>
  )
}
