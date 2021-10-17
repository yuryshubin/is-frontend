import React, {lazy, Suspense} from 'react';

const LazySearchResultForm = lazy(() => import('./SearchResultForm'));

const SearchResultForm = (props: JSX.IntrinsicAttributes & {children?: React.ReactNode}) => (
   <Suspense fallback={null}>
      <LazySearchResultForm {...props} items={[]} />
   </Suspense>
);

export default SearchResultForm;
