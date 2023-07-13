import { multiFilterProduct } from 'apis/product.api'
import React, { useEffect, useState } from 'react'
import ProductCard from '../Home/Products/ProductCard'

export default function RelatedProducts({ product }) {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  console.log(product, 'product')

  const { style, fabric, type, category, value } = product

  useEffect(() => {
    setLoading(true)
    const queryParams = {
      category,
      type,
      style,
      fabric,
    }

    const retriveProduct = async () => {
      const response = await multiFilterProduct(queryParams)
      if (response?.statusCode === 200) {
        setProductList(response?.data)
        setLoading(false)
      }
    }
    retriveProduct()
  }, [category, value, type, style, fabric])

  return (
    <>
      {productList?.length > 0 && (
        <>
          <h1 className="mt-10 font-semibold text-2xl mb-3">
            Related Products
          </h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {productList.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
