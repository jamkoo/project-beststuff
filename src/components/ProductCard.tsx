import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={() => onClick(product)}
    >
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary-900">{product.name}</h3>
        <div className="flex items-center mt-2">
          <Star className="w-5 h-5 text-primary-400 fill-current" />
          <span className="ml-1 text-neutral-700">{product.rating}</span>
          <span className="ml-2 text-neutral-500">({product.reviews} reviews)</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-secondary-900 font-medium">
            ${product.price.value}
          </span>
          <div className="flex items-center">
            <span className="text-sm text-neutral-600 mr-2">Durability</span>
            <div className="w-20 h-2 bg-neutral-200 rounded-full">
              <div 
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${product.durabilityScore * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
