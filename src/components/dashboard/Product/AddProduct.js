import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CATEGORY_OPTION,
  STYLE_OPTION,
  FABRIC_OPTION,
  TAG_OPTION,
  TYPE_OPTION,
  COLOR_OPTION,
  SIZE_OPTION,
} from '../../../../constant/product'
import { QuillEditor } from '../../../../src/components/editor'
import { UploadMultiFile } from '../../../../src/components/upload'
import { BASE_URL } from '../../../../apis/url'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function AddProductForm() {
  const [typeValue, setTypeValue] = useState([])
  const [tagValue, setTagValue] = useState([])
  const [colorValue, setColorValue] = useState([])
  const [sizeValue, setSizeValue] = useState([])
  const [description, setDescription] = useState('')
  const [values, setFieldValue] = useState([])
  const router = useRouter()
  const [imagesUrl, setImagesUrl] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const handleDrop = useCallback(async acceptedFiles => {
    const formData = new FormData()
    acceptedFiles.forEach(file => {
      formData.append('image', file)
    })

    try {
      const response = await fetch(`${BASE_URL}/image/multi-image-upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (data?.status === 'success') {
          setImagesUrl(data?.imageURLs)
        }
      } else {
        toast.error('Image upload failed.')
      }
    } catch (error) {
      toast.error('Error occurred while uploading images:')
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

  const onSubmit = data => {
    const formData = new FormData()
    setLoading(true)

    formData.append('name', data.name)
    formData.append('path', data?.name?.replace(/\s+/g, '-').toLowerCase())
    formData.append('frontImage', data.frontImage[0])
    formData.append('backImage', data.backImage[0])
    formData.append('restImage', imagesUrl)
    formData.append('buyingPrice', data.buyingPrice)
    formData.append('sellingPrice', data.sellingPrice)
    formData.append('description', description)
    formData.append('metaDescription', data.metaDescription)
    formData.append('quantity', data.quantity)
    formData.append('category', data.category)
    formData.append('color', colorValue)
    formData.append('size', sizeValue)
    formData.append('tag', tagValue)
    formData.append('type', typeValue)
    formData.append('style', data.style)
    formData.append('fabric', data.fabric)

    fetch(`${BASE_URL}/product`, {
      method: 'POST',

      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data?.statusCode === 200) {
          router.push('/dashboard/app/product/all-products')
          reset()
          Swal.fire({
            icon: 'success',
            title: 'Product Created Successfully',
          })
        }
        setLoading(false)
      })
      .catch(err => {
        toast.error('Error occurred while creating product.')
        setLoading(false)
      })
  }

  return (
    <div className="flex justify-center bg-white rounded-xl shadow mt-5">
      <div className="w-full  sm:p-10 px-3 py-5">
        <div className=" rounded-lg w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:gap-5 gap-3">
                <div className="flex flex-col items-start">
                  <TextField
                    fullWidth
                    label="Product Name"
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Product Name is Required',
                      },
                    })}
                  />
                  <label className="label">
                    {errors.name?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      native
                      {...register('category', {
                        required: {
                          value: true,
                          message: 'Category is Required',
                        },
                      })}
                    >
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
                    <InputLabel>Style</InputLabel>
                    <Select
                      label="Style"
                      native
                      {...register('style', {
                        required: {
                          value: true,
                          message: 'Style is Required',
                        },
                      })}
                    >
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
                    <label className="label">
                      {errors.style?.type === 'required' && (
                        <span className="pl-2 text-xs mt-1 text-red-500">
                          {errors.style.message}
                        </span>
                      )}
                    </label>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth>
                    <InputLabel>Fabric</InputLabel>
                    <Select
                      label="fabric"
                      native
                      {...register('fabric', {
                        required: {
                          value: true,
                          message: 'Fabric is Required',
                        },
                      })}
                    >
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
                    <label className="label">
                      {errors.style?.type === 'required' && (
                        <span className="pl-2 text-xs mt-1 text-red-500">
                          {errors.style.message}
                        </span>
                      )}
                    </label>
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
                      startAdornment: (
                        <InputAdornment position="start">Pcs</InputAdornment>
                      ),
                      type: 'number',
                    }}
                    {...register('quantity', {
                      required: {
                        value: true,
                        message: 'Quantity is Required',
                      },
                    })}
                  />
                  <label className="quantity">
                    {errors.quantity?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.quantity.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <TextField
                    fullWidth
                    label="Buying Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: 'number',
                    }}
                    {...register('buyingPrice', {
                      required: {
                        value: true,
                        message: 'Buying Price is Required',
                      },
                    })}
                  />
                  <label className="label">
                    {errors.buyingPrice?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.buyingPrice.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <TextField
                    fullWidth
                    label="Selling Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: 'number',
                    }}
                    {...register('sellingPrice', {
                      required: {
                        value: true,
                        message: 'Selling Price is Required',
                      },
                    })}
                  />
                  <label className="label">
                    {errors.sellingPrice?.type === 'required' && (
                      <span className="pl-2 text-xs mt-1 text-red-500">
                        {errors.sellingPrice.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <h1 className="ml-1 text-sm mb-1">Description</h1>
                <QuillEditor
                  simple
                  id="product-description"
                  value={description}
                  onChange={val => setDescription(val)}
                />
              </div>

              <div>
                <h1 className="ml-1 text-sm mb-1">Meta Description</h1>
                <textarea
                  height={100}
                  className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Meta Description"
                  {...register('metaDescription', {
                    required: {
                      value: true,
                      message: 'Meta Description is Required',
                    },
                  })}
                ></textarea>
                <label className="label">
                  {errors.metaDescription?.type === 'required' && (
                    <span className="pl-2 text-xs mt-1 text-red-500">
                      {errors.metaDescription.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-2 sm:gap-5 gap-3">
                <div>
                  <h1 className="ml-1 text-sm mb-1">Front Image</h1>
                  <input
                    type="file"
                    // accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    {...register('frontImage', {
                      required: {
                        value: true,
                        message: 'Image is required',
                      },
                    })}
                  />
                  {errors.frontImage && (
                    <span className="pl-2 text-xs mt-1 text-red-500">
                      {errors.frontImage.message}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="ml-1 text-sm mb-1">Back Image</h1>
                  <input
                    type="file"
                    // accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    {...register('backImage', {
                      required: {
                        value: true,
                        message: 'Image is required',
                      },
                    })}
                  />
                  {errors.backImage && (
                    <span className="pl-2 text-xs mt-1 text-red-500">
                      {errors.backImage.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h1 className="ml-1 text-sm mb-1 mt-5">All Images</h1>
                <UploadMultiFile
                  showPreview
                  // maxSize={3145728}
                  accept="image/*"
                  files={values}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />

                <div className="flex items-center mt-5 gap-4">
                  {imagesUrl?.map((image, index) => (
                    <div key={index}>
                      {/* <span className="ml-2 mt-5 text-sm text-gray-500">
                      {++index}. {image}
                    </span> */}

                      <Image
                        src={image}
                        width={100}
                        height={100}
                        className="h-32 w-28 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-2">
                <Button sx={{width: '150px'}} type="submit" variant="contained" color="primary">
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    'Publish Product'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
