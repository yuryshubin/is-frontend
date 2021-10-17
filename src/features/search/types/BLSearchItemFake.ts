import {BLSearchItem} from './BLSearchItem';

export const generateSearchItem = (id: number): BLSearchItem => {
   return {
      id,
      brand: `brand${id}`,
      currency: `usd${id}`,
      description: `description${id}`,
      gender: `men${id}`,
      price: 100 + id,
      title: `title${id}`,
      stock: id,
      url: `https://google.com${id}`,
      image_urls: [
         `https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/34/83/34-83-101P/Stay-Cool-Balazs-Solti-Poster.jpg?id=${id}`,
      ],
   };
};
