import React, { ReactElement, memo } from 'react'

// import './OverviewItem.css'
import { EventCategory } from '../../api/queries';
import { toTitleCase } from '../../util/FormatStringToTitle';

interface Props {
  categories: EventCategory[],
  isFull?: boolean,
}

const EventCategories: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <div className='flex'>
        {props.isFull
          ? <>
            {props.categories.map(category => (
              <div key={category.eventCategory.id} className='ticket-category mr-2 my-1'
              >
                {toTitleCase(category.eventCategory.name)}
              </div>
            ))}
          </>
          : <>
            <div className='ticket-category mr-1 my-1'>
              {props.categories[0].eventCategory.name}
            </div>
            {props.categories.length > 1 &&
              <div className='ticket-category mr-1 my-1'>
                +{props.categories.length - 1}
              </div>
            }
          </>
        }
      </div>
    </>
  )
}

export default memo(EventCategories)