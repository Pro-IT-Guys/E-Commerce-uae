import { Stack, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'
import ProductMoreMenu from '../list/ProductMoreMenu'
import { BASE_URL } from 'apis/url'
import Swal from 'sweetalert2'

export default function ProductTableRowItem({ row, setUpdate }) {
  const {
    _id,
    frontImage,
    name,
    quantity,
    buyingPrice,
    sellingPrice,
    isVerified,
    type,
    style,
    category,
    fabric,
    color,
    size,
  } = row
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleClickOpen = () => {
    setDeleteModalOpen(true)
  }

  const handleClose = () => {
    setDeleteModalOpen(false)
  }

  const handleDeleteProduct = productId => {
    console.log(productId)
    fetch(`${BASE_URL}/product/${productId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data?.success) {
          setUpdate(Math.random())
          setDeleteModalOpen(false)
          Swal.fire({
            icon: 'success',
            title: 'Product Deleted Successfully',
          })
        }
      })
  }

  return (
    <TableRow
      hover
      className="border"
      key={_id}
      tabIndex={-1}
      role="checkbox"
      // selected={isItemSelected}
      // aria-checked={isItemSelected}
    >
      <TableCell align="left" component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <div className="w-14 h-14 overflow-hidden my-2">
            <Image
              alt={frontImage}
              src={frontImage}
              height={60}
              width={60}
              className="h-full w-full object-cover rounded-full "
            />
          </div>
          <h1 variant="subtitle2" className="text-xs font-semibold">
            {name?.slice(0, 30) + '...'}
          </h1>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <h1 className="text-xs">{category}</h1>
      </TableCell>
      <TableCell align="left">
        <h1 className="text-xs">{style}</h1>
      </TableCell>
      <TableCell align="left">
        <h1 className="text-xs">{fabric}</h1>
      </TableCell>
      <TableCell align="left">
        {type?.map((item, index) => (
          <h1 key={index} className="text-xs w-16">
            {++index}. {item}
            
          </h1>
        ))}
      </TableCell>
      <TableCell align="left">
        {color?.map((item, index) => (
          <h1 key={index} className="text-xs w-14">
            {++index}. {item}
          </h1>
        ))}
      </TableCell>
      <TableCell align="left">
          {size?.map((item, index) => (
            <h1 key={index} className="text-xs w-10">
              {++index}. {item}
            </h1>
          ))}
      </TableCell>
      <TableCell align="left">
        {' '}
        <h1 className="text-xs">{quantity}</h1>
      </TableCell>
      <TableCell align="left">
        <h1 className="text-xs w-32"> Buying Price: {buyingPrice}</h1>
        <h1 className="text-xs"> Selling Price: {sellingPrice}</h1>
      </TableCell>
      {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

      <TableCell align="right">
        <ProductMoreMenu
          setDeleteModalOpen={setDeleteModalOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          deleteModalOpen={deleteModalOpen}
          onDelete={handleDeleteProduct}
          id={_id}
          // userName={row?.name?.firstName}
        />
      </TableCell>
    </TableRow>
  )
}
