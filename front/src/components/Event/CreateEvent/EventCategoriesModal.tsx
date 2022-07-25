import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import ConvertCategories, { ConvertCategoriesType } from '../../../util/ConvertCategories'
import { Checkbox } from '@mui/material'
import { eventCategory } from '../../../api/queries';
import { useQuery } from '@apollo/client';
import LoadingField from '../../../components/LoadingField/LoadingField'
import { toTitleCase } from '../../../util/FormatStringToTitle';

interface Props {
  selectedCategory: ConvertCategoriesType[];
  setActiveTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: (value: ConvertCategoriesType[]) => void;
}

const EventCategoriesModal: React.FC<Props> = ({ selectedCategory, setActiveTypeModal, setSelectedCategory }: Props): React.ReactElement => {
  const checkExistData = selectedCategory.length > 0 ? selectedCategory : []
  const [listCheckBox, setListCheckBox] = useState<ConvertCategoriesType[]>(checkExistData);
  const { loading, error, data } = useQuery(eventCategory);

  const confirmModal = (): void => {
    // update state category
    setSelectedCategory(listCheckBox)
    setActiveTypeModal(false);
  }

  const cancelModal = (): void => {
    setActiveTypeModal(false);
  }

  const updateCheckBox = (id: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const newValue = listCheckBox.map(ele => ele.id === id ? { ...ele, check: !ele.check } : ele)
    setListCheckBox(newValue)
  }

  useEffect(() => {
    if (data && checkExistData.length === 0) {
      setListCheckBox(ConvertCategories(data.EventCatogory))
    }
  }, [data])

  return (
    <section className='modal-wrap'>
      <div className='modal-bg' onClick={cancelModal}></div>
      <div className='fixed-comp modal'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-10/12 mt-12'>
          {
            loading &&
            <LoadingField />
          }
          {
            listCheckBox.map(category => (
              <div key={category.id} className=' items-center border-b border-solid mt-3 pb-3'>
                <button
                  className='w-full flex justify-between items-center'
                >
                  <p>
                    <Checkbox
                      checked={category.check}
                      onClick={(e) => updateCheckBox(category.id, e)}
                    />
                    {toTitleCase(category.name)}
                  </p>
                </button>

              </div>
            ))}
          <div className='footer-full-w-btn my-6'>
            <button className='primary-btn' onClick={confirmModal}>
              OK
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventCategoriesModal