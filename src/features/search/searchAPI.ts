import {BLSearchItem} from './types/BLSearchItem';
import {SearchApi} from '../../api';
import {baseAddress} from '../../globals';

export interface SearchServiceResponse {
   items: BLSearchItem[];
   currentPage: number;
   totalPages: number;
}

class SearchAPI {
   static search = async (criteria: string, page: number, limit: number): Promise<SearchServiceResponse> => {
      return new Promise<SearchServiceResponse>(async (resolve, reject) => {
         try {
            if (!criteria) reject(new Error('criteria should not be empty'));

            if (page <= 0) reject(new Error('page should be greater than zero'));

            if (limit <= 0) reject(new Error('limit should be greater than zero'));

            const api = new SearchApi(undefined, baseAddress);
            const result = await api.search(criteria, page, limit);

            const items: BLSearchItem[] = result.items.map((item) => {
               return {
                  id: item.id,
                  url: item.url,
                  gender: item.gender,
                  description: item.description,
                  image_urls: item.image_urls,
                  title: item.title,
                  brand: item.brand,
                  price: item.price,
                  currency: item.currency,
                  stock: item.stock,
               };
            });
            resolve({
               currentPage: result.currentPage,
               totalPages: result.totalPages,
               items,
            });
         } catch (e) {
            reject(e);
         }
      });
   };
}

export default SearchAPI;
