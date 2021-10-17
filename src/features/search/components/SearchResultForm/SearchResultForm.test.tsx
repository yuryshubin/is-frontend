import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import SearchResultForm from './SearchResultForm';
import {generateSearchItem} from '../../types/BLSearchItemFake';

describe('<SearchResultForm />', () => {
   test('it should display no items', () => {
      render(<SearchResultForm items={[]} />);

      const searchResultForm = screen.getByTestId('SearchResultForm');
      expect(searchResultForm).toBeInTheDocument();
   });

   test('it should display one item', () => {
      render(<SearchResultForm items={[generateSearchItem(1)]} />);
      const searchResultForm = screen.getByTestId('SearchResultForm');
      expect(searchResultForm).toBeInTheDocument();
   });
});
