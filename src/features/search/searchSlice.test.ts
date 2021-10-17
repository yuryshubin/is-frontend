import {reset, searchItems} from './searchSlice';
import store from '../../app/store';

import SearchAPI from './searchAPI';

jest.mock('./searchAPI');

describe('SearchSlice', () => {
   beforeEach(() => {
      store.dispatch(reset());
   });

   afterEach(() => {
      jest.restoreAllMocks();
   });

   test('two parallel calls', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock = mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });

      store.dispatch(searchItems('test1'));
      await new Promise((r) => setTimeout(r, 1));
      expect(store.getState().search.loading).toEqual(true);
      expect(store.getState().search.currentPage).toEqual(0);

      store.dispatch(searchItems('test2'));
      await new Promise((r) => setTimeout(r, 100));
      expect(store.getState().search.currentPage).toEqual(1);
   });

   test('two sequential pages', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock = mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 2, totalPages: 2, items: []});
      });

      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(1);

      await new Promise((r) => setTimeout(r, 50));
      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(2);
   });

   test('same page is being loaded', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });

      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 10));

      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 50));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(1);
   });

   test('load the same last page', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock = mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 2, totalPages: 2, items: []});
      });
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 2, totalPages: 2, items: []});
      });

      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(1);

      await new Promise((r) => setTimeout(r, 50));
      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(2);

      store.dispatch(searchItems('test'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(2);
   });

   test('change criteria', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock = mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve({currentPage: 1, totalPages: 2, items: []});
      });

      store.dispatch(searchItems('test1'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(1);

      await new Promise((r) => setTimeout(r, 50));
      store.dispatch(searchItems('test2'));
      await new Promise((r) => setTimeout(r, 51));
      expect(store.getState().search.loading).toEqual(false);
      expect(store.getState().search.currentPage).toEqual(1);
   });

   test('page out of bounds', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock.mockRejectedValueOnce({response: {code: 402}, resolve: false});

      store.dispatch(searchItems('test1'));
      await new Promise((r) => setTimeout(r, 100));
      expect(store.getState().search.errorMessage).toEqual('sorry, got an error');
   });

   test('empty criteria', async () => {
      let mock = SearchAPI.search as jest.MockedFunction<typeof SearchAPI.search>;
      mock.mockRejectedValueOnce({response: {code: 402}, resolve: false});

      store.dispatch(searchItems(''));
      await new Promise((r) => setTimeout(r, 1));
      expect(store.getState().search.currentPage).toEqual(0);
   });
});
