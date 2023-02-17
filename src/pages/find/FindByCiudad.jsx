import React, { Fragment } from 'react'
import ProductCardCiudadList from '../../components/ProductCardCiudadList'
import { useParams } from 'react-router-dom'

const FindByCiudad = () => {

    const { id } = useParams()

    return (
        <>
            <ProductCardCiudadList item = {id} key = {id} />
        </>
    )
}

export default FindByCiudad