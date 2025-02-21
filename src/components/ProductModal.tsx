import React, { useState, useEffect } from 'react';
import { X, Star, ExternalLink, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { scrapeProductDetails } from '../lib/scraper';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [scrapedDetails, setScrapedDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assuming the first purchase link is the main product page
        if (product.purchaseLinks && product.purchaseLinks.length > 0) {
          const url = product.purchaseLinks[0].url;
          const details = await scrapeProductDetails(url);
          if (details) {
            setScrapedDetails(details);
          } else {
            setError('Failed to scrape product details.');
          }
        } else {
          setError('No purchase links available.');
        }
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [product]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-8 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin w-10 h-10 text-primary-500 mb-4" />
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-8 flex flex-col items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-neutral-100 rounded">Close</button>
        </div>
      </div>
    );
  }

  const displayProduct = scrapedDetails || product;

  return (
    <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white/70 backdrop-blur-sm p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-secondary-900">{displayProduct.name}</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-neutral-500" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <img 
              src={displayProduct.imageUrl} 
              alt={displayProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-primary-400 fill-current" />
                <span className="ml-2 text-lg font-semibold text-secondary-900">{product.rating}</span>
                <span className="ml-2 text-neutral-600">({product.reviews} reviews)</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">${displayProduct.price?.value}</span>
            </div>
            
            <p className="mt-4 text-neutral-700">{displayProduct.description}</p>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-secondary-900 mb-2">Scores</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-700">Durability</span>
                    <span className="text-secondary-900 font-medium">{product.durabilityScore}/10</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full">
                    <div 
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${product.durabilityScore * 10}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-700">Value</span>
                    <span className="text-secondary-900 font-medium">{product.valueScore}/10</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full">
                    <div 
                      className="h-full bg-primary-400 rounded-full"
                      style={{ width: `${product.valueScore * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-secondary-900 mb-2">Pros</h3>
                <ul className="space-y-2">
                  {product.pros.map((pro, index) => (
                    <li key={index} className="flex items-center text-primary-700">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-secondary-900 mb-2">Cons</h3>
                <ul className="space-y-2">
                  {product.cons.map((con, index) => (
                    <li key={index} className="flex items-center text-neutral-700">
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-2" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-secondary-900 mb-2">Where to Buy</h3>
              <div className="space-y-2">
                {product.purchaseLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group"
                  >
                    <span className="text-neutral-700 group-hover:text-secondary-900">{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
