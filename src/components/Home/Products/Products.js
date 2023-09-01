import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  Slider,
  TextField,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import CloseIcon from '@mui/icons-material/Close'

const ProductCard = dynamic(() => import('./ProductCard'))
const PopularProducts = dynamic(() => import('./PopularProducts'))
const ShopProductSort = dynamic(() => import('../shop/ShopProductSort'))

import {
  CATEGORY_OPTION_ARRAY,
  FABRIC_OPTION_ARRAY,
  STYLE_OPTION_ARRAY,
  TYPE_OPTION,
} from '../../../../constant/product'
import { multiFilterProduct } from '../../../../apis/product.api'
import { ContextData } from '../../../../context/dataProviderContext'
import ProductLoader from './ProductLoader'
import { useRouter } from 'next/router'
import { convertCurrencyForCalculation } from '../../../../helpers/currencyHandler'
import dynamic from 'next/dynamic'
import { getALlOrders } from '../../../../apis/order.api'

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
    rateAEDtoUSD,
  } = useContext(ContextData)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadMode, setLoadMode] = useState(8)
  const [totalProduct, setTotalProduct] = useState(0)
  const [popularProducts, setPopularProducts] = useState([])

  const router = useRouter()
  const { pathname } = router

  const handlePriceRange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setLoading(true)
    const maxPrice =
      toCurrency === 'USD'
        ? convertCurrencyForCalculation('USD', 'AED', value[1], rateAEDtoUSD)
        : value[1]
    const minPrice =
      fromCurrency === 'USD'
        ? convertCurrencyForCalculation('USD', 'AED', value[0], rateAEDtoUSD)
        : value[0]
    const queryParams = {
      searchTerm,
      category,
      maxPrice,
      minPrice,
      type,
      style,
      fabric,
      limit: loadMode,
    }

    const retriveProduct = async () => {
      const response = await multiFilterProduct(queryParams)
      if (response?.statusCode === 200) {
        setProducts(response?.data)
        setTotalProduct(response?.meta?.total)
        setLoading(false)
      }
      handlePopularProduct()
    }
    retriveProduct()
  }, [searchTerm, category, value, type, style, fabric, loadMode])

  const handlePopularProduct = async () => {
    const orderList = await getALlOrders()
    if (orderList?.statusCode === 200) {
      const popularProduct = orderList?.data?.flatMap(order => {
        return order?.orderItems?.map(product => {
          if (product?.product !== null) {
            return product?.product
          }
        })
      })

      // Count the occurrences of each product
      const productCounts = popularProduct.reduce((acc, product) => {
        if (product !== undefined) {
          acc[product._id] = (acc[product._id] || 0) + 1
        }
        return acc
      }, {})

      // Sort products based on occurrence count
      const sortedProducts = popularProduct.sort((a, b) => {
        return productCounts[b._id] - productCounts[a._id]
      })

      // Remove duplicates while maintaining order
      const uniqueSortedProducts = Array.from(
        new Set(sortedProducts.map(product => product._id)),
      ).map(id => sortedProducts.find(product => product._id === id))

      setPopularProducts(uniqueSortedProducts)
    }
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
                <div className="flex gap-2 ml-2 "></div>
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
                {!pathname.includes('category') && (
                  <div className="bg-white shadow rounded">
                    <div className="  py-2 px-3 border-b">
                      <h1 className="font-semibold "> Filter by Categories</h1>
                    </div>
                    <div className=" py-3 pl-4 pr-3">
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
                                    prevValue?.filter(val => val !== option),
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
                )}
                <div className="bg-white shadow rounded">
                  <div className="  py-2 px-3 border-b">
                    <h1 className="font-semibold "> Filter by Fabrics</h1>
                  </div>
                  <div className=" py-3 pl-4 pr-3">
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
                                  prevValue.filter(val => val !== option),
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
                                  prevValue.filter(val => val !== option),
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
                                  prevValue.filter(val => val !== option),
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
              </div>
            </div>

            <div className=" md:w-[80%]">
              <div>
                {loading ? (
                  <ProductLoader />
                ) : (
                  <>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                      {products?.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {totalProduct > 8 && products?.length < totalProduct && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={() =>
                            setLoadMode(prevValue => prevValue + 8)
                          }
                        >
                          Load More
                        </Button>
                      </Box>
                    )}
                  </>
                )}

                {!pathname.includes('category') && (
                  <>
                    {products?.length ? (
                      <>
                        <div>
                          <h1 className="font-bold text-xl mt-7">
                            Popular Products
                          </h1>
                          <PopularProducts products={popularProducts} />
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
                  </>
                )}

                {pathname.includes('category') && (
                  <>
                    {!products?.length && (
                      <div className="flex justify-center items-center h-[50vh]">
                        <h1 className="text-xl font-semibold text-error">
                          No Product Found!
                        </h1>
                      </div>
                    )}
                  </>
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
