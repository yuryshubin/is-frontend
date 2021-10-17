import React, {Component} from 'react';
import {BLSearchItem} from '../../types/BLSearchItem';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import noResults from '../../../../assets/icons/no-results.png';

export type SearchResultFormProps = {
   items: BLSearchItem[];
};

export class SearchResultForm extends Component<SearchResultFormProps> {
   render() {
      const items = this.props.items;
      let content;

      if (items.length) {
         content = (
            <div className='row'>
               {items.map((item) => (
                  <div key={item.id} id='cardItem' className='col-3'>
                     <SearchResultItem item={item} key={item.id} />
                  </div>
               ))}
            </div>
         );
      } else {
         content = <img src={noResults} alt='' />;
      }

      return (
         <div className='SearchResultForm' data-testid='SearchResultForm'>
            <div className='container'>{content}</div>
         </div>
      );
   }
}

export default SearchResultForm;
