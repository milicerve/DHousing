import React from 'react'
import 'react-bnb-gallery/dist/style.css'
import ReactBnbGallery from 'react-bnb-gallery'
import { useState } from 'react'
import './style/galleryPhotos.css'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"



const GalleryPhotos = ({item}) => {

    const [isOpen, setIsOpen] = useState(false);
    const fotos = []

    const imageMap = item.imagenes.map(item =>{
        fotos.push(item.urlImg)
    })

    return (
        <>
        <div className='galery'>
            <div className='container'>
                    <div className='photo-container'>
                        <div className='left-photo'>
                            <img src={fotos[0]} alt={item.titulo} />
                        </div>
                        <div className='rigth-photo'>
                            <img src={fotos[1]} alt={item.titulo} className='right-phot-individual'/>
                            <img src={fotos[2]} alt={item.titulo} className='right-phot-individual'/>
                            <img src={fotos[3]} alt={item.titulo} className='right-phot-individual'/>
                            <img src={fotos[4]} alt={item.titulo} className='right-phot-individual'/>
                            <div className='open-galery' onClick={() => setIsOpen(true)}>
                                <span >Ver más</span>
                            </div>
                        </div>
                    </div>
                    <ReactBnbGallery
                        show={isOpen}
                        photos={fotos}
                        onClose={() => setIsOpen(false)}
                    />
            </div>   
        </div>
        <div className='carrusel'>
                <Carousel  infiniteLoop autoPlay dynamicHeight stopOnHover>
                    {fotos.map((e, i) =>
                        <div key={"contenedor_" + i}>
                            <img src={e} key={"img_" + i} alt={e.titulo}/>
                        </div>)}
                </Carousel>
            </div>
        </>
    )
}

export default GalleryPhotos