import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import dynamic from 'next/dynamic'
import MainLayout from '../../src/layouts/main'

const Products = dynamic(
  () => import('../../src/components/Home/Products/Products'),
  { ssr: false },
)

export default function CategoryFilter() {
  const router = useRouter()
  const params = router.query.id

  //   console.log(router.pathname);
  return (
    <MainLayout>
      <div className="pt-36 bg-[#f7f7ff9c]">
        <Container maxWidth="lg">
          <div className="flex gap-2 text-sm mt-3 mb-5 text-[#636262]">
            <p
              onClick={() => router.push('/')}
              className="cursor-pointer hover:underline duration-200"
            >
              Home{' '}
            </p>{' '}
            <ChevronRightOutlinedIcon />
            <p>Category </p> <ChevronRightOutlinedIcon />
            <p className="font-semibold">{params}</p>
          </div>
        </Container>
        <Products />
      </div>
    </MainLayout>
  )
}
