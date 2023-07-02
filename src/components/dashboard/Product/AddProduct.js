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
import { createProduct } from 'apis/product.api'
import { async } from 'react-input-emoji'
import { BASE_URL } from 'apis/url'

export default function AddProductForm() {
  const [typeValue, setTypeValue] = useState([])
  const [tagValue, setTagValue] = useState([])
  const [colorValue, setColorValue] = useState([])
  const [sizeValue, setSizeValue] = useState([])
  const [description, setDescription] = useState('')
  const [imagesArray, setImagesArray] = useState([])
  const [values, setFieldValue] = useState({ images: [] })

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

  const handleDrop = useCallback(
    acceptedFiles => {
      setImagesArray([...imagesArray, ...acceptedFiles])
      setFieldValue('images', [...values?.images, ...acceptedFiles])
    },
    [setFieldValue]
  )

  const handleRemoveAll = () => {
    setFieldValue('images', [])
  }

  const handleRemove = file => {
    const filteredItems = values?.images?.filter(_file => _file !== file)
    setFieldValue('images', filteredItems)
  }

  const onSubmit = data => {
    // console.log(data?.frontImage[0]);

    const productData = {
      name: data.name,
      path: data?.name?.replace(/\s+/g, '-').toLowerCase(),
      frontImage: data.frontImage[0],
      backImage: data.backImage[0],
      restImage: imagesArray,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      description: description,
      metaDescription: data.metaDescription,
      quantity: data.quantity,
      category: data.category,
      color: colorValue,
      size: sizeValue,
      tag: tagValue,
      brand: data.brand,
      type: typeValue,
      style: data.style,
      fabric: data.fabric,
    }
    const formData = new FormData()
    // const boundary = formData.getBoundary();
    formData.append('name', data.name)
    formData.append('path', data?.name?.replace(/\s+/g, '-').toLowerCase())
    formData.append('frontImage', data.frontImage[0])
    formData.append('backImage', data.backImage[0])
    formData.append('restImage', imagesArray)
    formData.append('buyingPrice', data.buyingPrice)
    formData.append('sellingPrice', data.sellingPrice)
    formData.append('description', description)
    formData.append('metaDescription', data.metaDescription)
    formData.append('quantity', data.quantity)
    formData.append('category', data.category)
    formData.append('color', colorValue)
    formData.append('size', sizeValue)
    formData.append('tag', tagValue)
    formData.append('brand', data.brand)
    formData.append('type', typeValue)
    formData.append('style', data.style)
    formData.append('fabric', data.fabric)

    console.log(formData, 'productFormData')

    fetch(`${BASE_URL}/product`, {
      method: 'POST',

      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  console.log(imagesArray, 'imagesArray');

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
                    <InputLabel>Brand</InputLabel>
                    <Select
                      label="Brand"
                      native
                      {...register('brand', {
                        required: {
                          value: true,
                          message: 'Brand is Required',
                        },
                      })}
                    >
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
                    <label className="label">
                      {errors.brand?.type === 'required' && (
                        <span className="pl-2 text-xs mt-1 text-red-500">
                          {errors.brand.message}
                        </span>
                      )}
                    </label>
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
                  maxSize={3145728}
                  accept="image/*"
                  files={imagesArray}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />

                {imagesArray?.map((image, index) => (
                  <div key={index} className="flex items-center">
                    <span className="ml-2 mt-5 text-sm text-gray-500">
                      {++index}. {image?.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative mt-2">
                <button
                  type="submit"
                  className=" py-2 px-5 rounded bg-primary text-white "
                >
                  Publish Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}