import React, {useEffect} from 'react';
import SearchResultForm from '../../../search/components/SearchResultForm/SearchResultForm';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner} from 'react-bootstrap';
import SearchForm from '../../../search/components/SearchForm/SearchForm.lazy';
import {searchItems, searchSelector} from '../../../search/searchSlice';

function ContentContainer() {
   const dispatch = useDispatch();
   const {items, loading, criteria} = useSelector(searchSelector);

   const searchItemsCB = React.useCallback((criteria: string) => dispatch(searchItems(criteria)), [dispatch]);

   const isBottom = (element: HTMLElement) => {
      return element.getBoundingClientRect().bottom <= window.innerHeight;
   };

   const trackScrolling = React.useCallback(() => {
      const wrappedElement = document.getElementById('tracker');
      if (isBottom(wrappedElement!)) searchItemsCB(criteria!);
   }, [searchItemsCB, criteria]);

   useEffect(() => {
      document.addEventListener('scroll', trackScrolling);

      return () => {
         document.removeEventListener('scroll', trackScrolling);
      };
   }, [trackScrolling]);

   return (
      <div className='ContentContainer' data-testid='ContentContainer'>
         <div className='container-fluid'>
            <div className='row justify-content-center d-flex'>
               <div className='col-4'>
                  <SearchForm placeholder='Search Garment...' search={searchItemsCB} />
               </div>
            </div>
         </div>

         <div className='container-fluid'>
            <div className='row justify-content-center d-flex'>
               <div className='row col-12'>
                  <SearchResultForm items={items} />
               </div>
            </div>

            <div id='tracker' />

            {loading ? <Spinner className='loading' animation='border' variant='info' /> : ''}
         </div>
      </div>
   );
}

export default ContentContainer;
