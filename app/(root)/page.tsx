import ProductList from '@/components/shared/product/product-list'
import sampleData from '@/db/sample-data'
import React from 'react'

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const Home = async () => {
  // await delay(2000) // just for testing
  // console.log(sampleData)

  return (
    <>
      <ProductList data={sampleData.products} title='Newest Arrivals' limit={4} />
    </>
  )
}

export default Home