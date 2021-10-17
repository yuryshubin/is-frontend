import React from 'react';
import {render, fireEvent, screen, queryByAttribute} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from './SearchForm';

describe('<SearchForm />', () => {
   test('it should mount', () => {
      render(<SearchForm placeholder='test' search={(criteria) => {}} />);

      const searchForm = screen.getByTestId('SearchForm');
      expect(searchForm).toBeInTheDocument();
   });

   test('it should display empty placeholder', () => {
      const onChange = jest.fn();

      render(<SearchForm placeholder='' search={(criteria) => {}} />);

      const inputs = queryByAttribute('id', screen.getByTestId('SearchForm'), (content) => content === 'formSearch');
      const input = inputs as any as HTMLInputElement;
      input.addEventListener('change', onChange);

      const query = 'test';
      expect(input.value).toEqual('');
      fireEvent.change(input, {target: {value: query}});
      expect(onChange).toBeCalledTimes(1);
      expect(input.value).toEqual(query);
   });

   test('it should handle changes', () => {
      render(<SearchForm placeholder='' search={(criteria) => {}} />);

      const searchForm = screen.getByTestId('SearchForm');
      expect(searchForm).toBeInTheDocument();
   });
});
