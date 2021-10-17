import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

export type SearchFormProps = {
   placeholder: string;
   search: (criteria: string) => void;
};

export type SearchFormState = {
   loading: boolean;
   state: string;
};

class SearchForm extends Component<SearchFormProps, SearchFormState> {
   constructor(props: SearchFormProps | Readonly<SearchFormProps>) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      this.props.search(event.target.value);
   }

   render() {
      return (
         <div className='SearchForm' data-testid='SearchForm'>
            <Form>
               <Form.Group className='mb-3' controlId='formSearch'>
                  <Form.Control type='text' placeholder={this.props.placeholder} onChange={this.handleChange} />
               </Form.Group>
            </Form>
         </div>
      );
   }
}

export default SearchForm;
