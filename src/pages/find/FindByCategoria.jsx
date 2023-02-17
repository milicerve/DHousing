import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCardCategoryList from '../../components/ProductCardCategoryList'

const FindByCategoria = () => {

    const { id } = useParams()

    return (
        <>
            <ProductCardCategoryList item = {id} key = {id} />
        </>
    )
}

export default FindByCategoria