import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import SearchResultItem from './SearchResultItem';
import {generateSearchItem} from '../../types/BLSearchItemFake';

describe('<SearchResultItem />', () => {
   test('it should display an item', () => {
      render(<SearchResultItem item={generateSearchItem(1)} />);

      const snapshot = generateSearchItem(1);
      expect(screen.getByText(snapshot.title)).toBeInTheDocument();
      expect(screen.getByText(snapshot.description)).toBeInTheDocument();
      expect(screen.getByText(snapshot.brand)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${snapshot.price}`, 'g'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${snapshot.currency}`, 'g'))).toBeInTheDocument();

      expect(screen.getByRole('img')).toHaveAttribute('src', snapshot.image_urls[0]);
      expect(screen.getByText('Visit').closest('a')).toHaveAttribute('href', snapshot.url);
   });
});
