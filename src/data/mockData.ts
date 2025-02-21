import { Category } from '../types';
import { Briefcase, Home, Laptop, Shirt } from 'lucide-react';

export const categories: Category[] = [
  { id: 'clothing', name: 'Clothing', icon: 'Shirt' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop' },
  { id: 'home', name: 'Home Goods', icon: 'Home' },
  { id: 'work', name: 'Work Equipment', icon: 'Briefcase' },
];
