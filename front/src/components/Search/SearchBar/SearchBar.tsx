import React, { ReactElement, useState, memo } from 'react'
import { RiSearchLine } from 'react-icons/ri'

interface Props {
  searchContent: string,
  setSearchContent: React.Dispatch<React.SetStateAction<string>>,
}

const SearchBar: React.FC<Props> = ({setSearchContent}: Props): ReactElement => {
  const [value, setValue] = useState<string>('');
  const handleSearch = (): void => {
    setSearchContent(value);
  }
  return (
    <section id="search" className='mt-10'>
      <article id="search-bar" className='input'>
        <input 
          type="text" 
          placeholder='Search' 
          className='py-2 bg-transparent flex-1 min-w-0'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button 
          className='opacity-60 hover:opacity-100 focus:opacity-100 px-4'
          onClick={handleSearch}
        >
          <i className='text-primaryColor text-2xl'><RiSearchLine /></i>
        </button>
      </article>
    </section>
  )
}

export default memo(SearchBar)