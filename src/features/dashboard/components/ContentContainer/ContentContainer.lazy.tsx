import React, {lazy, Suspense} from 'react';

const LazyContentContainer = lazy(() => import('./ContentContainer'));

const ContentContainer = (props: JSX.IntrinsicAttributes & {children?: React.ReactNode}) => (
   <Suspense fallback={null}>
      <LazyContentContainer {...props} />
   </Suspense>
);

export default ContentContainer;
