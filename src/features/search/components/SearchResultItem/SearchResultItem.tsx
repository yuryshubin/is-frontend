import {BLSearchItem} from '../../types/BLSearchItem';
import {Card} from 'react-bootstrap';
import React from 'react';

export type SearchResultItemProps = {item: BLSearchItem};

export const SearchResultItem = ({item}: SearchResultItemProps) => {
   return (
      <Card className='SearchResultItem' data-testid='SearchResultItem'>
         <Card.Img className='preview' variant='top' src={item.image_urls[0]} />
         <Card.Body>
            <Card.Title className='text-success'>{item.title}</Card.Title>
            <Card.Text className='font-small'>{item.description}</Card.Text>
            <Card.Text>{item.brand}</Card.Text>
            <Card.Link href={item.url}>Visit</Card.Link>
         </Card.Body>
         <Card.Footer>
            {item.price} {item.currency}
         </Card.Footer>
      </Card>
   );
};

export default SearchResultItem;
