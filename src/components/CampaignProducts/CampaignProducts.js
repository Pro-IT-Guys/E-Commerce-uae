import styled from '@emotion/styled'
import { BASE_URL } from 'apis/url'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { InputBase, alpha } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function CampaignProducts({
  handleSelectedProducts,
  selectedProducts,
}) {
  const [products, setProducts] = useState([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/product?searchTerm=${filterName}`)
      .then(res => res.json())
      .then(data => setProducts(data?.data))
  }, [filterName])




  return (
    <>
      <div className="bg-white p-5 rounded shadow border mt-5 py-10">
        <div className="">
          <h1 className="mb-5 text-xl font-semibold ">Select Offer Product</h1>
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setFilterName(e.target.value)}
            />
          </Search>
        </div>
        <div className="h-[500px] overflow-y-scroll border-t pt-5">
          {products?.map(product => (
            <div
              onClick={() => handleSelectedProducts(product._id)}
              key={product._id}
              className="flex items-center justify-between border-b border-gray-200 py-2  hover:bg-[#e9e9e9] cursor-pointer rounded p-2 duration-200"
            >
              <div className="flex items-center">
                <img
                  src={product?.frontImage}
                  alt=""
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div className="ml-3">
                  <h1 className="font-semibold">{product?.name}</h1>
                  <h1 className="text-xs text-gray-500">{product?.category}</h1>
                </div>
              </div>
              <div className="flex items-center mr-5">
                <input
                  checked={selectedProducts?.includes(product._id)}
                  className="h-5 w-5 cursor-pointer"
                  type="checkbox"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
