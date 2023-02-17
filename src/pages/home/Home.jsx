import React from 'react'
import Search from '../../components/Search'
import CardCategoryHomeList from '../../components/CardCategoryHomeList'
import ProductCardHomeList from '../../components/ProductCardHomeList'

const Home = () => {
        
    return (
        <>
            <Search/>
            <CardCategoryHomeList/>
            <ProductCardHomeList/>
        </>
    )
}

export default Home