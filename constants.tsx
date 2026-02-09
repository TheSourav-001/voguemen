
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  'Suits & Blazers', 'Panjabi & Pajama', 'Premium Shirts', 'T-Shirts & Polos', 'Trousers & Chinos',
  'Luxury Watches', 'Leather Shoes', 'Boots', 'Ethnic Wear', 'Western Coats',
  'Belts', 'Bags & Backpacks', 'Perfumes', 'Sunglasses',
  'Accessories', 'Activewear', 'Loungewear', 'Winter Essentials', 'Grooming',
  'Gift Sets'
];


// Comprehensive brand-to-category mapping to ensure luxury relevance
const CATEGORY_BRANDS: Record<string, string[]> = {
  'Suits & Blazers': ['Zurhem', 'Fit Elegance', 'Blucheez', 'Raymond'],
  'Panjabi & Pajama': ['Aarong', 'Yellow', 'Lubnan', 'Illiyeen'],
  'Premium Shirts': ['Blucheez', 'Artisan', 'Richman', 'Cats Eye'],
  'T-Shirts & Polos': ['Blucheez', 'Noir', 'Bongo', 'Grameen Uniqlo'],
  'Trousers & Chinos': ['Blucheez', 'Artisan', 'Fit Elegance', 'Richman'],
  'Luxury Watches': ['Rolex', 'Omega', 'Hublot', 'Montblanc', 'Patek Philippe', 'Audemars Piguet'],
  'Leather Shoes': ['Apex Venturini', 'Lotto', 'Bata', 'Land'],
  'Boots': ['Apex Venturini', 'Timberland', 'Zeil\'s'],
  'Ethnic Wear': ['Aarong', 'Yellow', 'Lubnan', 'Illiyeen'],
  'Western Coats': ['Zurhem', 'Fit Elegance', 'Raymond'],
  'Belts': ['Apex', 'Montblanc', 'Gucci'],
  'Bags & Backpacks': ['Samsonite', 'Montblanc', 'Gucci'],
  'Perfumes': ['Dior', 'Chanel', 'Armani', 'Hermès', 'Tom Ford'],
  'Sunglasses': ['Ray-Ban', 'Oakley', 'Gucci', 'Prada'],
  'Accessories': ['Montblanc', 'Montegrappa', 'Parker'],
  'Activewear': ['Nike', 'Adidas', 'Puma'],
  'Loungewear': ['H&M', 'Zara'],
  'Winter Essentials': ['Zurhem', 'North Face'],
  'Grooming': ['Philips', 'Braun', 'Gillette'],
  'Gift Sets': ['Montblanc', 'The Body Shop']
};

// Curated high-resolution professional fashion photography pools
const IMAGE_POOLS: Record<string, string[]> = {
  'Suits & Blazers': [
    'https://images.unsplash.com/photo-1594932224010-3a13df2c6f32?q=80&w=1000',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000',
    'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000'
  ],
  'Panjabi & Pajama': [
    'https://images.unsplash.com/photo-1621335829175-95f437384d7c?q=80&w=1000',
    'https://images.unsplash.com/photo-1627384113972-f4c0392f5aa9?q=80&w=1000',
    'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=1000'
  ],
  'Ethnic Wear': [
    'https://images.unsplash.com/photo-1601002047864-770ce8950bb7?q=80&w=1000',
    'https://images.unsplash.com/photo-1618214309133-1ec40552d7ee?q=80&w=1000',
    'https://images.unsplash.com/photo-1598514983318-291419157db2?q=80&w=1000'
  ],
  'Premium Shirts': [
    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1000',
    'https://images.unsplash.com/photo-1596755094514-f87034a7a98d?q=80&w=1000',
    'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=1000'
  ],
  'T-Shirts & Polos': [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000'
  ],
  'Trousers & Chinos': [
    'https://images.unsplash.com/photo-1624371414361-e6e8ea01c10d?q=80&w=1000',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000'
  ],
  'Luxury Watches': [
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000',
    'https://images.unsplash.com/photo-1508685096489-7aac291ba597?q=80&w=1000'
  ],
  'Leather Shoes': [
    'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000',
    'https://images.unsplash.com/photo-1449247704656-13621df5da3d?q=80&w=1000',
    'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000'
  ],
  'Boots': [
    'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000',
    'https://images.unsplash.com/photo-1520639889313-7272175b1c39?q=80&w=1000'
  ],
  'Western Coats': [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',
    'https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=1000'
  ],
  'Bags & Backpacks': [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000'
  ],
  'Perfumes': [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000'
  ],
  'Sunglasses': [
    'https://images.unsplash.com/photo-1511499767390-a73359580bc8?q=80&w=1000',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000'
  ],
  'Accessories': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000',
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000'
  ]
};

const MATERIALS = ['Egyptian Cotton', 'Italian Silk', 'Raw Selvedge', 'Premium Linen', 'Merino Wool', 'Full Grain Leather', 'Viscose Silk'];
const STYLES = ['Signature', 'Heritage', 'Atelier', 'Artisan', 'Contemporary', 'Imperial', 'Monarch'];

const PRICE_LOGIC: Record<string, [number, number]> = {
  'Suits & Blazers': [45000, 185000],
  'Panjabi & Pajama': [6500, 35000],
  'Premium Shirts': [3200, 12500],
  'T-Shirts & Polos': [1800, 6500],
  'Trousers & Chinos': [4500, 15500],
  'Luxury Watches': [85000, 4500000],
  'Leather Shoes': [8500, 45000],
  'Boots': [12500, 65000],
  'Ethnic Wear': [12500, 85000],
  'Western Coats': [15500, 125000],
  'Belts': [3500, 18500],
  'Bags & Backpacks': [15500, 125000],
  'Perfumes': [8500, 45000],
  'Sunglasses': [12500, 85000],
  'Accessories': [2500, 15500],
  'Activewear': [4500, 18500],
  'Loungewear': [3500, 12500],
  'Winter Essentials': [8500, 45000],
  'Grooming': [2500, 15500],
  'Gift Sets': [15500, 85000]
};

const generateProducts = (): Product[] => {
  const products: Product[] = [];

  CATEGORIES.forEach((cat) => {
    const brands = CATEGORY_BRANDS[cat] || ['VogueMen Boutique'];
    const pool = IMAGE_POOLS[cat] || IMAGE_POOLS['Premium Shirts'];

    for (let i = 0; i < 31; i++) {
      const material = MATERIALS[i % MATERIALS.length];
      const style = STYLES[i % STYLES.length];
      const brand = brands[i % brands.length];

      const name = `${brand} ${style} ${material} ${cat.replace(/s$/i, '').replace(/&/g, '')}`;

      const [min, max] = PRICE_LOGIC[cat] || [5000, 20000];
      const price = Math.floor((Math.random() * (max - min) + min) / 100) * 100;

      const mainImg = pool[i % pool.length];
      const secondImg = pool[(i + 1) % pool.length];
      const thirdImg = pool[(i + 2) % pool.length];

      products.push({
        id: `${cat.toLowerCase().replace(/[^a-z]/g, '')}-${i}`,
        name: name,
        brand: brand,
        category: cat,
        price: price,
        description: `Experience the extraordinary with the ${brand} ${cat}. Crafted with meticulous attention to detail using ${material.toLowerCase()}, this piece from our ${style} collection offers unparalleled sophistication for the discerning gentleman.`,
        images: [mainImg, secondImg, thirdImg],
        sizes: cat.toLowerCase().includes('shoe') || cat.toLowerCase().includes('boot') || cat.toLowerCase().includes('watch')
          ? ['Standard', 'XL', 'S']
          : ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Midnight Black', 'Ivory White', 'Royal Navy', 'Graphite Grey'],
        rating: 4.5 + (Math.random() * 0.5),
        stock: Math.floor(Math.random() * 30) + 5,
        reviews: [
          {
            id: `r-${cat}-${i}`,
            userName: ['Afif Rahman', 'Imran Hossain', 'Zaid Ahmed'][i % 3],
            rating: 5,
            comment: "Absolutely stunning quality. Worth every Taka.",
            date: "2025-02-01"
          }
        ],
        isNew: i < 3,
        isFeatured: i === 0
      });
    }
  });

  return products;
};

export const ALL_PRODUCTS = generateProducts();

