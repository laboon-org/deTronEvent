import React, { useState } from 'react'

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/Search/SearchBar/SearchBar';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import ModalUser from '../../components/Header/ModalUser';
import ModalWallet from '../../components/Header/ModalWallet';
import CategorySlider from '../../components/CategorySlider/CategorySlider';

const Search: React.FC = (): React.ReactElement => {
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const [categoryID, setCategoryID] = useState<number>(-1);
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [searchContent, setSearchContent] = useState<string>('');

  return (
    <div className='wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal}/>
      )}
      <div className='container'>
        <section id="header" className='fixed-comp fixed top-0 py-6'>
          <div className='w-11/12'>
            <Header setWalletModal={setWalletModal} setUserModal={setUserModal}/>
            <SearchBar searchContent={searchContent} setSearchContent={setSearchContent}/>
            <div className='mt-6'>
              <CategorySlider categoryID={categoryID} setCategoryID={setCategoryID} />
            </div>
          </div>
        </section>
        <section className='w-full mt-56'>
          {searchContent &&
            <SearchResult searchContent={searchContent} categoryID={categoryID}/>
          }
        </section>
        <section id="footer" className='fixed-comp fixed bottom-0 pt-4 pb-3 border-t border-solid border-gray-300 rounded-t-3xl'>
        <div className='w-11/12'>
          <Footer activePage='search'/>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Search