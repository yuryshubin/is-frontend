import React, {lazy, Suspense} from 'react';
import {SearchFormProps} from './SearchForm';

const LazySearchForm = lazy(() => import('./SearchForm'));

const SearchForm = (props: SearchFormProps & JSX.IntrinsicAttributes & {children?: React.ReactNode}) => (
   <Suspense fallback={null}>
      <LazySearchForm {...props} />
   </Suspense>
);

export default SearchForm;
