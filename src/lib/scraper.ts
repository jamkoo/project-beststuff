import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeProductDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Example selectors (adjust these based on the target website)
    const name = $('h1.product-title').text().trim() || 'Product Name Not Found';
    const description = $('div.product-description').text().trim() || 'Description Not Found';
    const imageUrl = $('img.product-image').attr('src') || '';
    const priceText = $('span.product-price').text().trim() || 'Price Not Found';

    // Basic price parsing (improve this based on the actual format)
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const currency = priceText.replace(/[0-9.,]/g, '').trim() || 'USD';

    return {
      name,
      description,
      imageUrl,
      price: {
        value: price,
        currency: currency,
      },
    };
  } catch (error) {
    console.error('Scraping failed:', error);
    return null;
  }
};
