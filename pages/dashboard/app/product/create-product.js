import { Container, Typography } from '@mui/material'
// layouts
import DashboardLayout from 'src/layouts/dashboard'
// hooks
import useSettings from 'src/hooks/useSettings'
// components
import Page from 'src/components/Page'
import AddProductForm from 'src/components/dashboard/Product/AddProduct'

// ----------------------------------------------------------------------

export default function CreateProduct() {
  const { themeStretch } = useSettings()

  return (
    <DashboardLayout>
      <Page title="AYMi | Add Product">
        <Container maxWidth="lg">
          <h1 className="font-bold text-2xl">Create Product</h1>
          <div className="flex gap-2 text-sm mt-3 text-[#636262]">
            <p>Dashboard - </p>
            <p>Product - </p>
            <p>Create </p>
          </div>
          <AddProductForm />
        </Container>
      </Page>
    </DashboardLayout>
  )
}
