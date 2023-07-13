import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import EditProductForm from 'src/components/dashboard/Product/EditProductForm'
import DashboardLayout from 'src/layouts/dashboard'

export default function EditProduct() {
  const router = useRouter()
  const params = router.query.id
  return (
    <DashboardLayout> 
        <Container maxWidth="xl">
            <h1 className='font-semibold text-xl '>Update Product</h1>
            <EditProductForm productId={params}/>
        </Container>
    </DashboardLayout>
  )
}
