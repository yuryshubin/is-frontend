import {generateSearchItem} from './BLSearchItemFake';

describe('<SearchResultItem />', () => {
   test('it should display an item', () => {
      const snapshot = generateSearchItem(1);
      const item = generateSearchItem(1);
      expect(item).toStrictEqual(snapshot);
   });
});
