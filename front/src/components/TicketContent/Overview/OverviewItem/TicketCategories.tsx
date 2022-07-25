import React, { ReactElement, memo } from 'react'

import './OverviewItem.css'
import {toTitleCase} from '../../../../util/FormatStringToTitle'

interface Props {
  categories: [{
    category: {
      id: number;
      name: string;
    };
  }],
  isFull?: boolean,
}

const TicketCategories: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      {props.categories && props.categories.length > 0 && 
        <div>
          {props.isFull
          ? <>
            {props.categories.map(category => (
              <div key={category.category.id} className='ticket-category mr-2 my-1'
              >
                {toTitleCase(category.category.name)}
              </div>
            ))}
            </>
          : <>
              <div className='ticket-category mr-1 my-1'>
                {toTitleCase(props.categories[0].category.name)}
              </div>
              {props.categories.length > 1 &&
                <div className='ticket-category mr-1 my-1'>
                  +{props.categories.length - 1}
                </div>
              }
            </>
          }
        </div>
      }
    </>
  )
}

export default memo(TicketCategories)