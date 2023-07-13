// next
import NextLink from 'next/link'
import { useRouter } from 'next/router'
// material
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import useCategorySetTop from 'src/hooks/useCategorySetTop'
import { CATEGORY_OPTION, CATEGORY_OPTION_ARRAY } from 'constant/product'
import CategoryIcon from '@mui/icons-material/Category'
import Searchbar from '../dashboard/Searchbar'
import ProductFilterDrawer from 'src/components/Home/Products/ProductFilterDrawer'
import { useContext, useState } from 'react'
import { ContextData } from 'context/dataProviderContext'

// ----------------------------------------------------------------------

export default function CategoryNav() {
  const [openFilter, setOpenFilter] = useState(false)
  const { setCategory } = useContext(ContextData)

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

  return (
    <>
      <div className="bg-[#fbfbfd] py-2 text-black border-y-[1px] border-gray-200 md:block hidden">
        <Container maxWidth="lg" className="text-black">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-10">
              {/* <div className="flex gap-1 items-center">
                <CategoryIcon />
                <h1 className="uppercase font-semibold text-sm">Category</h1>
              </div> */}
              <div className="flex gap-4 justify-center text-[14px]">
                {CATEGORY_OPTION_ARRAY?.map((category, index) => (
                  <NextLink key={index} href={`/category/${category}`}>
                    <a
                      // onClick={() => setCategory(category)}
                      className="text-black hover:text-[#ff4d4f] hover:underline uppercase font-bold "
                    >
                      {category}
                    </a>
                  </NextLink>
                ))}
              </div>
            </div>
            {/* <Searchbar /> */}
          </div>
        </Container>
      </div>
      <div className="bg-white py-1 text-black border-y-[1px] md:hidden block">
        <Container maxWidth="lg">
          <div className="text-black flex justify-between">
            <Searchbar />
            <ProductFilterDrawer
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
          </div>
        </Container>
      </div>
    </>
  )
}
