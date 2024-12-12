import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect }  from 'react';
import Slider from 'react-slick';
import ResourceCard from './Card';

const ResourceCarousel = ({ resources }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);
    const cardWidth = 400;

    useEffect(() => {
        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setSlidesToShow(1);
            } else if (width <= 1440) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(4);
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);


    const getCarouselWidth = () => {
        return `${slidesToShow * cardWidth}px`; 
    };
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div style={{ margin: '20px', marginLeft: '0', maxWidth: getCarouselWidth() }}>
            <Slider {...settings}>
                {resources.map((resource, index) => (
                    <ResourceCard 
                        key={index} 
                        image_url={resource.image_url} 
                        name={resource.name}
                        description={resource.description}
                        address={resource.address}
                        website={resource.website}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default ResourceCarousel;
