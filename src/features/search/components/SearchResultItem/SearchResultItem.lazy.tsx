import React, {lazy, Suspense} from 'react';
import {SearchResultItemProps} from './SearchResultItem';

const LazySearchResultItem = lazy(() => import('./SearchResultItem'));

const SearchResultItem = (props: SearchResultItemProps & JSX.IntrinsicAttributes & {children?: React.ReactNode}) => (
   <Suspense fallback={null}>
      <LazySearchResultItem {...props} />
   </Suspense>
);

export default SearchResultItem;
