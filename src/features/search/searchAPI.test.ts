import {SearchApi} from '../../api/api';
import SearchAPI from './searchAPI';
import {generateSearchItem} from './types/BLSearchItemFake';

jest.mock('../../api/api');

describe('SearchSlice', () => {
   afterEach(() => {
      jest.restoreAllMocks();
   });

   test('empty criteria', async () => {
      await expect(SearchAPI.search('', 1, 1)).rejects.toEqual(new Error('criteria should not be empty'));
   });

   test('invalid page', async () => {
      await expect(SearchAPI.search('a', 0, 1)).rejects.toEqual(new Error('page should be greater than zero'));
   });

   test('invalid limit', async () => {
      await expect(SearchAPI.search('a', 1, 0)).rejects.toEqual(new Error('limit should be greater than zero'));
   });

   test('successful request no items', async () => {
      const fakeResponse = {currentPage: 1, totalPages: 2, items: []};
      let mock = SearchApi.prototype.search as jest.MockedFunction<typeof SearchApi.prototype.search>;
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve(fakeResponse);
      });
      await expect(await SearchAPI.search('a', 1, 1)).toEqual(fakeResponse);
   });

   test('successful request with items', async () => {
      const fakeItem = generateSearchItem(1);
      const fakeResponse = {currentPage: 1, totalPages: 2, items: [fakeItem]};
      let mock = SearchApi.prototype.search as jest.MockedFunction<typeof SearchApi.prototype.search>;
      mock.mockImplementationOnce(async (args) => {
         await new Promise((r) => setTimeout(r, 50));
         return Promise.resolve(fakeResponse);
      });
      await expect(await SearchAPI.search('a', 1, 1)).toEqual(fakeResponse);
   });
});
