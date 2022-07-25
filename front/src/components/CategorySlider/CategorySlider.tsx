import React, { useState, memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { useQuery } from '@apollo/client';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import './CategorySlider.css'
import { getCategories, Category } from '../../api/queries';
import { toTitleCase } from '../../util/FormatStringToTitle';

interface Props {
  categoryID: number,
  setCategoryID: React.Dispatch<React.SetStateAction<number>>,
}

const CategorySlider: React.FC<Props> = ({categoryID, setCategoryID}: Props): React.ReactElement => {
  const [categories, setCategories] = useState<Category[] | undefined>();
  const { loading, error, data } = useQuery(getCategories, {
    onCompleted: (data) => {
      setCategories(data.categories);
    }
  });
  
  if (loading) return <p>Loading categories...</p>;

  if (error) {
    console.log(error);
    return <p>Cannot load categories!</p>;
  }
  
  const handleClick = (categoryID: number) :void => {
    setCategoryID(categoryID);
  }

  return (
    <div id="category-slider-wrap">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={15}
      >
        {/* Button: All */}
        <SwiperSlide 
          className={`category-btn ${categoryID === -1 ? 'active' : ''}`} 
          onClick={() => handleClick(-1)}
        >
          All
        </SwiperSlide>
        {/* Buttons: Categories */}
        {categories && categories.map(category => (
          <SwiperSlide key={category.id} 
            className={`category-btn ${categoryID === category.id ? 'active' : ''}`}
            onClick={() => handleClick(category.id)}
          >
            {toTitleCase(category.name)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default memo(CategorySlider)