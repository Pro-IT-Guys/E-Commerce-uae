import Link from 'next/link'
import { Container } from '@mui/material'
import { CATEGORY_OPTION_ARRAY } from '../../../constant/product'
import { useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import { ContextData } from '../../../context/dataProviderContext'
import { set } from 'lodash'
const ProductFilterDrawer = dynamic(() =>
  import('../../components/Home/Products/ProductFilterDrawer'),
)
const Searchbar = dynamic(() => import('../dashboard/Searchbar'))

// ----------------------------------------------------------------------

export default function CategoryNav() {
  const [openFilter, setOpenFilter] = useState(false)

  const {
    category,
    setCategory,
  } = useContext(ContextData)

  const handleSetCategory = (data) => {
    setCategory([data])
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

  return (
    <>
      <div className="bg-[#fbfbfd] py-2 text-black border-y-[1px] border-gray-200 md:block hidden">
        <Container maxWidth="lg" className="text-black">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-10">
              <div className="flex gap-4 justify-center text-[14px]">
                {CATEGORY_OPTION_ARRAY?.map((category, index) => (
                  <Link

                    key={index}
                    href={`/category/${category}`}
                    passHref >
                    <span
                      onClick={()=> handleSetCategory(category)}
                      className="text-black hover:text-[#ff4d4f] hover:underline uppercase font-bold">
                      {category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
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
