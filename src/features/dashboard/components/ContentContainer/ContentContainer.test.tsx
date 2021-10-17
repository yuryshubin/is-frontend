import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContentContainer from './ContentContainer';
import {Provider} from 'react-redux';
import store from '../../../../app/store';

describe('<ContentContainer />', () => {
   test('it should mount', () => {
      render(
         <Provider store={store}>
            <ContentContainer />
         </Provider>
      );

      const contentContainer = screen.getByTestId('ContentContainer');
      expect(contentContainer).toBeInTheDocument();
   });
});
