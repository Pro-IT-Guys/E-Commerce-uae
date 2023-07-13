import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ColorManyPicker from '../common/ColorManyPicker'
import ShopProductSort from '../shop/ShopProductSort'
import ProductCard from './ProductCard'
import PopularProducts from './PopularProducts'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import CloseIcon from '@mui/icons-material/Close'

import {
  BRAND_OPTION,
  CATEGORY_OPTION,
  CATEGORY_OPTION_ARRAY,
  COLOR_OPTION,
  FABRIC_OPTION,
  FABRIC_OPTION_ARRAY,
  SIZE_OPTION,
  STYLE_OPTION,
  STYLE_OPTION_ARRAY,
  TYPE_OPTION,
} from 'constant/product'
import Image from 'next/image'
import { multiFilterProduct } from 'apis/product.api'
import { ContextData } from 'context/dataProviderContext'
import ProductLoader from './ProductLoader'
import { useRouter } from 'next/router'
import {
  convertCurrency,
  convertCurrencyForCalculation,
} from 'helpers/currencyHandler'

function valuetext(value) {
  return `${value}°C`
}

const Products = () => {
  const {
    searchTerm,
    category,
    setCategory,
    type,
    style,
    fabric,
    setType,
    setStyle,
    setFabric,
    value,
    setValue,
    handleClearFilter,
    fromCurrency,
    toCurrency,
  } = useContext(ContextData)
  const [openFilter, setOpenFilter] = useState(false)
  const [products, setProducts] = useState([])
  const [color, setColor] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const params = router.query.id

  const handlePriceRange = (event, newValue) => {
    setValue(newValue)
    // console.log(newValue, 'newValue')
  }

  useEffect(() => {
    setLoading(true)
    const maxPrice =
      toCurrency === 'USD'
        ? convertCurrencyForCalculation('USD', 'AED', value[1])
        : value[1]
    const minPrice =
      fromCurrency === 'USD'
        ? convertCurrencyForCalculation('USD', 'AED', value[0])
        : value[0]
    const queryParams = {
      searchTerm,
      category,
      maxPrice,
      minPrice,
      type,
      style,
      fabric,
    }

    const retriveProduct = async () => {
      const response = await multiFilterProduct(queryParams)
      if (response?.statusCode === 200) {
        setProducts(response?.data)
        setLoading(false)
      }
    }
    retriveProduct()
  }, [searchTerm, category, value, type, style, fabric])

  const handleSelectFilterOption = (e, callback) => {
    const { value } = e.target
    callback(value)
  }

  const handleOpenFilter = () => {
    setOpenFilter(true)
  }

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  const handleResetFilter = () => {
    handleSubmit()
    resetForm()
  }

  const handleChange = selectedColor => {
    setColor(selectedColor)
  }

  const handleChecked = selectedColor => {
    if (Array.isArray(color)) {
      return color.indexOf(selectedColor) !== -1
    }
    return false
  }

 

  return (
    <div className="bg-[#f7f7ff9c] ">
      <Container maxWidth="lg" className="pb-20 ">
        <Grid container>
          <div className="flex justify-between w-full mb-5">
            <div className="w-[20%] ">
              {router.pathname === '/' && (
                <h2 className="font-semibold text-xl  w-40">Just For You</h2>
              )}
            </div>
            <div className="flex md:justify-start justify-end w-[80%]">
              <div className="md:block hidden">
                <div className="flex gap-2 ml-2 ">
                  {/* {category && (
                    <div className="flex items-center bg-white border rounded-full text-sm py-1 px-3">
                      {category}
                    </div>
                  )}
                  {fabric && (
                    <div className="flex items-center bg-white border rounded-full text-sm py-1 px-3">
                      {fabric}
                    </div>
                  )}
                  {style && (
                    <div className="flex items-center bg-white border rounded-full text-sm py-1 px-3">
                      {style}
                    </div>
                  )}
                  {type && (
                    <div className="flex items-center bg-white border rounded-full text-sm py-1 px-3">
                      {type}
                    </div>
                  )} */}
                  {/* {value[0] > 0 && (
                  <div className="flex items-center bg-white border rounded-full text-sm py-1 px-3">
                    Min: {value[0]}
                  </div>
                )}
                {value[1] < 20000 && (
                  <div className="flex items-center bg-white border rounded-full text-sm py-1 px-3">
                    Max: {value[1]}
                  </div>
                )} */}
                </div>
              </div>
              {(category?.length ||
                type?.length ||
                style?.length ||
                fabric?.length ||
                value[0] !== 0 ||
                value[1] !== 1000) &&
                !router.pathname.includes('category') && (
                  <div
                    onClick={handleClearFilter}
                    className="text-sm flex items-center justify-center gap-1 cursor-pointer bg-orange-600 text-white py-1 px-3 ml-3 rounded-full"
                  >
                    <DeleteSweepOutlinedIcon /> Clear Filter
                  </div>
                )}
            </div>
            <div className="w-[80%] hidden">
              <div className="flex justify-between items-center">
                <div className="input-group relative flex  items-stretch w-[80%]">
                  <input
                    // onChange={(e) => {
                    //   setSrcValue(e.target.value);
                    // }}
                    type="search"
                    className="form-control  relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none rounded-r-0"
                    placeholder="Search Products"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                  />

                  <button
                    className="btn px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex items-center rounded-l-0"
                    type="button"
                    id="button-addon2"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <ShopProductSort />
                </div>
              </div>
            </div>
            {/* <div className="md:hidden block w-[80%] text-end">
              <ProductFilterDrawer
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
            </div> */}
          </div>

          <div className=" md:flex w-full gap-5">
            <div className="md:w-[20%] md:block hidden ">
              <div className="space-y-4 filter-sticky sticky top-20">
                <div className="bg-white shadow rounded">
                  <div className=" py-2 px-3 border-b">
                    <h1 className="font-semibold ">
                      {' '}
                      Filter by Price ({toCurrency})
                    </h1>
                  </div>
                  <div className=" py-3 px-3 bg-white ">
                    <Box>
                      <Slider
                        size="medium"
                        getAriaLabel={() => 'Price range'}
                        value={value}
                        onChange={handlePriceRange}
                        min={0}
                        max={2000}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                      />
                    </Box>

                    <div className="flex justify-between items-center">
                      <div className="border px-3 rounded shadow-sm">
                        <p>{value[0]}</p>
                      </div>
                      <div className="border px-3 rounded shadow-sm">
                        <p>{value[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {router.pathname.includes('category') && (
                  <div className="bg-white shadow rounded hidden">
                    <div className="  py-2 px-3 border-b">
                      <h1 className="font-semibold "> Filter by Category</h1>
                    </div>
                    <div className=" py-3 pl-4 pr-3">
                      <RadioGroup
                        value={category}
                        onChange={e => handleSelectFilterOption(e, setCategory)}
                      >
                        {CATEGORY_OPTION?.map(item =>
                          item?.classify?.map(item => (
                            <FormControlLabel
                              onClick={() => setCategory(item)}
                              key={item}
                              value={item}
                              control={<Radio />}
                              label={item}
                            />
                          ))
                        )}
                      </RadioGroup>
                    </div>
                  </div>
                )} */}
                <div className="bg-white shadow rounded">
                  <div className="  py-2 px-3 border-b">
                    <h1 className="font-semibold "> Filter by Categories</h1>
                  </div>
                  <div className=" py-3 pl-4 pr-3">
                    {/* <RadioGroup
                      value={fabric}
                      onChange={e => handleSelectFilterOption(e, setFabric)}
                    >
                      {FABRIC_OPTION.map(item =>
                        item?.classify?.map(item => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                        ))
                      )}
                    </RadioGroup> */}

                    <FormControl fullWidth>
                      <div>
                        <Autocomplete
                          size="small"
                          className="w-full"
                          multiple
                          freeSolo
                          value={category}
                          onChange={(event, newValue) => {
                            setCategory(newValue)
                          }}
                          options={CATEGORY_OPTION_ARRAY}
                          getOptionLabel={option => option}
                          renderTags={() => null}
                          renderInput={params => (
                            <TextField label="Category" {...params} />
                          )}
                        ></Autocomplete>

                        <div style={{ marginTop: '8px' }}>
                          {category?.map((option, index) => (
                            <Chip
                              key={option}
                              size="small"
                              label={option}
                              onDelete={() => {
                                setCategory(prevValue =>
                                  prevValue?.filter(val => val !== option)
                                )
                              }}
                              deleteIcon={<CloseIcon />}
                              style={{
                                marginRight: '8px',
                                marginBottom: '8px',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </FormControl>
                  </div>
                </div>
                <div className="bg-white shadow rounded">
                  <div className="  py-2 px-3 border-b">
                    <h1 className="font-semibold "> Filter by Fabrics</h1>
                  </div>
                  <div className=" py-3 pl-4 pr-3">
                    {/* <RadioGroup
                      value={fabric}
                      onChange={e => handleSelectFilterOption(e, setFabric)}
                    >
                      {FABRIC_OPTION.map(item =>
                        item?.classify?.map(item => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                        ))
                      )}
                    </RadioGroup> */}

                    <FormControl fullWidth>
                      <div>
                        <Autocomplete
                          size="small"
                          className="w-full"
                          multiple
                          freeSolo
                          value={fabric}
                          onChange={(event, newValue) => {
                            setFabric(newValue)
                          }}
                          options={FABRIC_OPTION_ARRAY}
                          getOptionLabel={option => option}
                          renderTags={() => null}
                          renderInput={params => (
                            <TextField label="Fabric" {...params} />
                          )}
                        ></Autocomplete>

                        <div style={{ marginTop: '8px' }}>
                          {fabric.map((option, index) => (
                            <Chip
                              key={option}
                              size="small"
                              label={option}
                              onDelete={() => {
                                setFabric(prevValue =>
                                  prevValue.filter(val => val !== option)
                                )
                              }}
                              deleteIcon={<CloseIcon />}
                              style={{
                                marginRight: '8px',
                                marginBottom: '8px',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </FormControl>
                  </div>
                </div>
                <div className="bg-white shadow rounded">
                  <div className="  py-2 px-3 border-b">
                    <h1 className="font-semibold "> Filter by Style</h1>
                  </div>
                  <div className=" py-3 pl-4 pr-3 ">
                    {/* <RadioGroup
                      value={style}
                      onChange={e => handleSelectFilterOption(e, setStyle)}
                    >
                      {STYLE_OPTION.map(item =>
                        item?.classify?.map(item => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                        ))
                      )}
                    </RadioGroup> */}

                    <FormControl fullWidth>
                      <div>
                        <Autocomplete
                          size="small"
                          className="w-full"
                          multiple
                          freeSolo
                          value={style}
                          onChange={(event, newValue) => {
                            setStyle(newValue)
                          }}
                          options={STYLE_OPTION_ARRAY}
                          getOptionLabel={option => option}
                          renderTags={() => null}
                          renderInput={params => (
                            <TextField label="Style" {...params} />
                          )}
                        ></Autocomplete>

                        <div style={{ marginTop: '8px' }}>
                          {style.map((option, index) => (
                            <Chip
                              key={option}
                              size="small"
                              label={option}
                              onDelete={() => {
                                setStyle(prevValue =>
                                  prevValue.filter(val => val !== option)
                                )
                              }}
                              deleteIcon={<CloseIcon />}
                              style={{
                                marginRight: '8px',
                                marginBottom: '8px',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </FormControl>
                  </div>
                </div>

                <div className="bg-white shadow rounded">
                  <div className="  py-2 px-3 border-b">
                    <h1 className="font-semibold "> Filter by Type</h1>
                  </div>
                  <div className=" py-3 pl-4 pr-3 ">
                    {/* <RadioGroup
                      className="text-xs"
                      value={type}
                      onChange={e => handleSelectFilterOption(e, setType)}
                    >
                      {TYPE_OPTION.map(item => (
                        <FormControlLabel
                          className="text-xs p-0 m-0"
                          key={item}
                          value={item}
                          control={<Radio />}
                          label={item}
                        />
                      ))}
                    </RadioGroup> */}

                    <FormControl fullWidth>
                      <div>
                        <Autocomplete
                          size="small"
                          className="w-full"
                          multiple
                          freeSolo
                          value={type}
                          onChange={(event, newValue) => {
                            setType(newValue)
                          }}
                          options={TYPE_OPTION}
                          getOptionLabel={option => option}
                          renderTags={() => null}
                          renderInput={params => (
                            <TextField label="Type" {...params} />
                          )}
                        ></Autocomplete>

                        <div style={{ marginTop: '8px' }}>
                          {type.map((option, index) => (
                            <Chip
                              key={option}
                              size="small"
                              label={option}
                              onDelete={() => {
                                setType(prevValue =>
                                  prevValue.filter(val => val !== option)
                                )
                              }}
                              deleteIcon={<CloseIcon />}
                              style={{
                                marginRight: '8px',
                                marginBottom: '8px',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </FormControl>
                  </div>
                </div>

                {/* <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Size
                  </Typography>
                  <RadioGroup className="text-xs">
                    {SIZE_OPTION.map(item => (
                      <FormControlLabel
                        className="text-xs p-0 m-0"
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </div> */}
              </div>

              {/* <div className=" mt-4 shadow">
                <div className="bg-[#f2f2f2] border py-2 px-3 rounded-t">
                  <h1 className="font-semibold text-xl">Best Selling</h1>
                </div>
                <div className="p-2 space-y-3 bg-white rounded overflow-hidden">
                  {products?.slice(0, 20)?.map(product => (
                    <>
                      <div className="flex gap-2 items-center">
                        <div className="w-[30%]">
                          <div className="w-full overflow-hidden">
                            <Image
                              src={product?.frontImage}
                              width={180}
                              height={180}
                              className="h-full w-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="w-[70%]">
                          <h1 className="text-xs font-semibold hover:text-secondary cursor-pointer">
                            {product?.name?.slice(0, 40)}
                          </h1>
                          <p className="text-xs text-secondary font-semibold mt-1">
                            {convertCurrency(
                              fromCurrency,
                              toCurrency,
                              product?.sellingPrice
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div> */}
            </div>

            <div className=" md:w-[80%]">
              <div>
                {loading ? (
                  <ProductLoader />
                ) : (
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                    {products?.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {products?.length ? (
                  <>
                    <div>
                      <h1 className="font-bold text-xl mt-7">
                        Popular Products
                      </h1>
                      <PopularProducts products={products} />
                      <h1 className="font-bold text-xl mt-7">
                        Latest Collection
                      </h1>
                      <PopularProducts products={products} />
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center h-[50vh]">
                    <h1 className="text-xl font-semibold text-error">
                      No Product Found!
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  )
}

export default Products
