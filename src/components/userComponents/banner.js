import { Carousel } from 'antd'
import './banner.css'
import { useEffect, useState } from 'react'
import { apiGetSlideshows } from '../../API/apiSlideshows';

export const Banner = () => {

    const [slides, setSlides] = useState([]);
    useEffect(() => {
        apiGetSlideshows()
            .then(res => {
                console.log(res.data.data)
                setSlides(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return <>
        <Carousel autoplay>
            {
                slides.length === 0 ? <>
                    <div className='banner'>
                        <img src='' />
                    </div>
                </> : slides.map(item => {
                    return <div className='banner'>
                        <img src={`http://localhost:8000/${item.name}`} />
                    </div>
                })
            }
        </Carousel>
    </>
}