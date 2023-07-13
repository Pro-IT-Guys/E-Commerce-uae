import styled from '@emotion/styled'
import {
  Autocomplete,
  Card,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  BRAND_OPTION,
  CATEGORY_OPTION,
  STYLE_OPTION,
  FABRIC_OPTION,
  TAG_OPTION,
  TYPE_OPTION,
  COLOR_OPTION,
  SIZE_OPTION,
} from '../../../../constant/product'
import { QuillEditor } from 'src/components/editor'
import { UploadMultiFile } from 'src/components/upload'
import { BASE_URL } from 'apis/url'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import CustomLoadingScreen from 'src/components/CustomLoadingScreen'
import { async } from 'react-input-emoji'

export default function EditProductForm({ productId }) {
  const [typeValue, setTypeValue] = useState([])
  const [tagValue, setTagValue] = useState([])
  const [colorValue, setColorValue] = useState([])
  const [sizeValue, setSizeValue] = useState([])
  const [description, setDescription] = useState('')
  const [imagesArray, setImagesArray] = useState([])
  const [values, setFieldValue] = useState([])
  const router = useRouter()
  const [imagesUrl, setImagesUrl] = useState([])
  const [productDetails, setProductDetails] = useState({})
  const [loader, setLoader] = useState(false)
  const [productName, setProductName] = useState('')
  const [buyingPriceValue, setBuyingPriceValue] = useState('')
  const [sellingPriceValue, setSellingPriceValue] = useState('')

  useEffect(() => {
    setLoader(true)
    fetch(`${BASE_URL}/product/${productId}`)
      .then(res => res.json())
      .then(data => setProductDetails(data?.data))
      .finally(() => setLoader(false))
  }, [productId])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const handleAdd = files => {
    setImagesArray([...imagesArray, ...files])
    setFieldValue('images', [...values?.images, ...files])
  }

  const handleDrop = useCallback(async acceptedFiles => {
    // console.log(acceptedFiles, 'acceptedFiles')

    const formData = new FormData()
    acceptedFiles.forEach(file => {
      console.log(file, 'files')
      formData.append('image', file)
    })

    // console.log(img, 'img')
    try {
      const response = await fetch(`${BASE_URL}/image/multi-image-upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        if (data?.status === 'success') {
          setImagesUrl(data?.imageURLs)
        }
      } else {
        console.error('Image upload failed.')
      }
    } catch (error) {
      console.error('Error occurred while uploading images:', error)
    }
  }, [])

  const handleRemoveAll = () => {
    setFieldValue('images', [])
  }

  const handleRemove = file => {
    const filteredItems = values?.images?.filter(_file => {
      return _file?.preview !== file?.preview
    })
    setFieldValue(filteredItems)
  }

  const onSubmit = async data => {
    const updatedRestImage = imagesArray.map(file => {
      const { name, lastModified, lastModifiedDate, size, type } = file
      return {
        name,
        lastModified,
        lastModifiedDate,
        size,
        type,
        webkitRelativePath: '',
      }
    })

    const convertedRestImages = updatedRestImage.map(image => {
      const { name, type, lastModified, size } = image
      const blob = image instanceof Blob ? image : new Blob([image], { type })
      const file = new File([blob], name, {
        type,
        lastModified,
        lastModifiedDate: new Date(lastModified),
        size,
      })
      return file
    })

    const formData = new FormData()
    formData.append('name', productName || productDetails?.name)
    formData.append(
      'path',
      productName
        ? productName.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now()
        : productDetails?.path.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now()
    )
    formData.append(
      'frontImage',
      data.frontImage[0] || productDetails?.frontImage
    )
    formData.append('backImage', data.backImage[0] || productDetails?.backImage)
    formData.append(
      'restImage',
      imagesUrl.length > 0 ? imagesUrl : productDetails?.restImage
    )
    formData.append(
      'buyingPrice',
      buyingPriceValue || productDetails?.buyingPrice
    )
    formData.append(
      'sellingPrice',
      sellingPriceValue || productDetails?.sellingPrice
    )
    formData.append('description', description || productDetails?.description)
    formData.append(
      'metaDescription',
      data.metaDescription || productDetails?.metaDescription
    )
    formData.append('quantity', data.quantity || productDetails?.quantity)
    formData.append('category', data.category || productDetails?.category)
    formData.append(
      'color',
      colorValue.length > 0 ? colorValue : productDetails?.color
    )
    formData.append(
      'size',
      sizeValue.length > 0 ? sizeValue : productDetails?.size
    )
    formData.append('tag', tagValue.length > 0 ? tagValue : productDetails?.tag)
    formData.append('brand', data.brand || productDetails?.brand)
    formData.append(
      'type',
      typeValue.length > 0 ? typeValue : productDetails?.type
    )
    formData.append('style', data.style || productDetails?.style)
    formData.append('fabric', data.fabric || productDetails?.fabric)

    console.log(productDetails?.restImage)

    fetch(`${BASE_URL}/product/${productId}`, {
      method: 'PATCH',

      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data?.statusCode === 200) {
          // router.push('/dashboard/app/product/all-products')
          reset()
          Swal.fire({
            icon: 'success',
            title: 'Product Updated Successfully',
          })
        }
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }

  // if (loader) return <CustomLoadingScreen />
  return (
    <div className="flex justify-center bg-white rounded-xl shadow mt-5">
      <div className="w-full  sm:p-10 px-3 py-5">
        <div className=" rounded-lg w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:gap-5 gap-3">
                <div className="">
                  <label htmlFor="title" className=" font-semibold ">
                    Product Name
                  </label>
                  <input
                    onChange={e => setProductName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    className="border px-2 py-3 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                    defaultValue={productDetails?.name}
                  />
                </div>
                <div className="flex flex-col items-start mt-2">
                  <h1 className="mb-2 text-sm font-semibold"></h1>
                  <FormControl fullWidth className="mt-2">
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" native {...register('category')}>
                      {CATEGORY_OPTION.map(category => (
                        <optgroup key={category.group} label={category.group}>
                          {category.classify.map(classify => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select label="Brand" native {...register('brand')}>
                      {BRAND_OPTION.map(brand => (
                        <optgroup key={brand.group} label={brand.group}>
                          {brand.classify.map(classify => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <InputLabel>Style</InputLabel>
                    <Select label="Style" native {...register('style')}>
                      {STYLE_OPTION.map(style => (
                        <optgroup key={style.group} label={style.group}>
                          {style.classify.map(classify => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <InputLabel>Fabric</InputLabel>
                    <Select label="fabric" native {...register('fabric')}>
                      {FABRIC_OPTION.map(fabric => (
                        <optgroup key={fabric.group} label={fabric.group}>
                          {fabric.classify.map(classify => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <Autocomplete
                      className="w-full"
                      multiple
                      freeSolo
                      value={typeValue}
                      onChange={(event, newValue) => {
                        setTypeValue(newValue)
                      }}
                      options={TYPE_OPTION}
                      getOptionLabel={option => option}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={params => (
                        <TextField label="Type" {...params} />
                      )}
                    ></Autocomplete>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <Autocomplete
                      className="w-full"
                      multiple
                      freeSolo
                      value={colorValue}
                      onChange={(event, newValue) => {
                        setColorValue(newValue)
                      }}
                      options={COLOR_OPTION}
                      getOptionLabel={option => option}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={params => (
                        <TextField label="Color" {...params} />
                      )}
                    ></Autocomplete>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <Autocomplete
                      className="w-full"
                      multiple
                      freeSolo
                      value={tagValue}
                      onChange={(event, newValue) => {
                        setTagValue(newValue)
                      }}
                      options={TAG_OPTION}
                      getOptionLabel={option => option}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={params => (
                        <TextField label="Tags" {...params} />
                      )}
                    ></Autocomplete>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <Autocomplete
                      className="w-full"
                      multiple
                      freeSolo
                      value={sizeValue}
                      onChange={(event, newValue) => {
                        setSizeValue(newValue)
                      }}
                      options={SIZE_OPTION}
                      getOptionLabel={option => option}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={params => (
                        <TextField label="Sizes" {...params} />
                      )}
                    ></Autocomplete>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <TextField
                    fullWidth
                    label=" Stock Quantity"
                    InputProps={{
                      defaultValue: productDetails?.quantity,
                      startAdornment: (
                        <InputAdornment position="start">Pcs</InputAdornment>
                      ),
                      type: 'number',
                    }}
                    {...register('quantity')}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="title" className=" font-semibold ">
                    Buying Price
                  </label>
                  <input
                    onChange={e => {
                      if (e.target.value < 0) {
                        toast('Please Select Positive value', { type: 'error' })
                        e.target.value = 0
                      } else {
                        setBuyingPriceValue(e.target.value)
                      }
                    }}
                    type="number"
                    required
                    id="buyingPrice"
                    defaultValue={productDetails?.buyingPrice}
                    min={0}
                    name="buyingPrice"
                    className="border px-2 py-3 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="title" className=" font-semibold ">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    required
                    id="sellingPrice"
                    defaultValue={productDetails?.sellingPrice}
                    onChange={e => {
                      if (e.target.value < 0) {
                        toast('Please Select Positive value', { type: 'error' })
                        e.target.value = 0
                      } else {
                        setSellingPriceValue(e.target.value)
                      }
                    }}
                    min={0}
                    name="sellingPrice"
                    className="border px-2 py-3 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <h1 className="ml-1 text-sm mb-1">Description</h1>
                <QuillEditor
                  simple
                  id="product-description"
                  value={description || productDetails?.description}
                  onChange={val => setDescription(val)}
                />
              </div>

              <div>
                <h1 className="ml-1 text-sm mb-1">Meta Description</h1>
                <textarea
                  height={100}
                  className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Meta Description"
                  defaultValue={productDetails?.metaDescription}
                  {...register('metaDescription')}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 sm:gap-5 gap-3">
                <div>
                  <h1 className="ml-1 text-sm mb-1">Front Image</h1>
                  <input
                    type="file"
                    // accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    {...register('frontImage')}
                  />

                  <div className="h-32 w-24 overflow-hidden mt-3">
                    <img
                      src={productDetails?.frontImage}
                      alt=""
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                </div>

                <div>
                  <h1 className="ml-1 text-sm mb-1">Back Image</h1>
                  <input
                    type="file"
                    // accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    {...register('backImage')}
                  />
                  <div className="h-32 w-24 overflow-hidden mt-3">
                    <img
                      src={productDetails?.backImage}
                      alt=""
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="ml-1 text-sm mb-1 mt-5">All Images</h1>
                <UploadMultiFile
                  showPreview
                  maxSize={3145728}
                  accept="image/*"
                  files={values}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
                {imagesUrl.length > 0 ? (
                  <>
                    <div className="mt-3 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
                      {imagesUrl?.map((image, index) => (
                        <div
                          key={index}
                          className="h-32 w-24 overflow-hidden mt-3"
                        >
                          <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
                      {productDetails?.restImage?.map((image, index) => (
                        <div
                          key={index}
                          className="h-32 w-24 overflow-hidden mt-3"
                        >
                          <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="relative mt-2">
                <button
                  type="submit"
                  className=" py-2 px-5 rounded bg-primary text-white "
                >
                  Edit Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
