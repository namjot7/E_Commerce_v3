import ProductList from '@/components/shared/product/product-list'
// import sampleData from '@/db/sample-data'
import { getLatestProducts } from '@/lib/actions/product.actions'
import React from 'react'

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const metadata = {
  title: 'Home',
  description: "Modern E-commerce store",
};

const Home = async () => {
  const latestProducts = await getLatestProducts()
  // await delay(2000) // just for testing
  // console.log(sampleData)

  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
    </>
  )
}

export default Home