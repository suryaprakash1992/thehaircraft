import { BlogPost } from '../models/blog.model';
import { Product } from '../models/product.model';
import { Testimonial } from '../models/testimonial.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'royal-silk-straight-bundle',
    name: 'Royal Silk Straight Bundle',
    category: 'Raw Indian Hair',
    type: 'bundle',
    price: 189,
    shortDescription: 'Temple sourced raw Indian strands with a mirror-smooth finish.',
    description:
      'Crafted for women who want a refined everyday luxury, this straight bundle delivers fluid movement, dense cuticles, and a polished finish that remains natural under every light.',
    features: ['Double drawn fullness', 'Cuticle aligned strands', 'Naturally long lasting'],
    images: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
    ],
    heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    tags: ['featured', 'straight'],
    stock: 12,
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 128,
    lengthOptions: ['16"', '20"', '24"', '28"'],
    texture: 'Straight',
    reviews: [
      {
        id: 'r1',
        author: 'Serena Williams',
        rating: 5,
        title: 'Silky and dense',
        comment: 'This texture photographs beautifully and still looks effortless in person.',
        createdAt: '2026-01-15'
      }
    ]
  },
  {
    id: 'p2',
    slug: 'signature-deep-wave-unit',
    name: 'Signature Deep Wave Unit',
    category: 'Virgin Wigs',
    type: 'wig',
    price: 420,
    shortDescription: 'A ready-to-wear lace unit with soft, sculpted deep waves.',
    description:
      'Our premium deep wave unit is hand-ventilated to frame the face beautifully and styled for a luxurious, salon-grade finish straight from the box.',
    features: ['HD lace hairline', 'Pre-plucked density', 'Secure comfort cap'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80'
    ],
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    tags: ['featured', 'wig'],
    stock: 6,
    featured: true,
    bestseller: true,
    rating: 5,
    reviewCount: 64,
    lengthOptions: ['18"', '22"', '26"'],
    texture: 'Deep Wave',
    reviews: [
      {
        id: 'r2',
        author: 'Asha Menon',
        rating: 5,
        title: 'Exactly the luxury finish I wanted',
        comment: 'The hairline melts beautifully and the density is balanced from crown to ends.',
        createdAt: '2026-02-03'
      }
    ]
  },
  {
    id: 'p3',
    slug: 'hd-lace-closure-pro',
    name: 'HD Lace Closure Pro',
    category: 'Lace Closures',
    type: 'closure',
    price: 125,
    shortDescription: 'Invisible lace closure engineered for a seamless scalp illusion.',
    description:
      'The closure is finely ventilated with baby hairs and low-luster strands for clients who want a realistic finish without compromise.',
    features: ['Swiss HD lace', 'Precision knots', 'Natural density'],
    images: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
    ],
    heroImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
    tags: ['closure'],
    stock: 18,
    featured: true,
    rating: 4.8,
    reviewCount: 41,
    lengthOptions: ['14"', '16"', '18"'],
    texture: 'Body Wave',
    reviews: [
      {
        id: 'r3',
        author: 'Lina George',
        rating: 5,
        title: 'Easy to customize',
        comment: 'The knots were small, soft, and easy to bleach lightly.',
        createdAt: '2025-12-20'
      }
    ]
  },
  {
    id: 'p4',
    slug: 'bohemian-curly-texture',
    name: 'Bohemian Curly Texture',
    category: 'Hair Extensions',
    type: 'bundle',
    price: 210,
    shortDescription: 'Defined curls with light bounce and full-body movement.',
    description:
      'This textured bundle keeps its shape, moisturizes beautifully, and gives a sculpted editorial volume that still feels wearable.',
    features: ['Soft defined curls', 'Low shed construction', 'Humidity resilient'],
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=900&q=80'
    ],
    heroImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    tags: ['curly'],
    stock: 9,
    bestseller: true,
    rating: 4.7,
    reviewCount: 51,
    lengthOptions: ['18"', '22"', '24"'],
    texture: 'Bohemian Curl',
    reviews: [
      {
        id: 'r4',
        author: 'Neha Kapoor',
        rating: 4,
        title: 'Rich texture',
        comment: 'The curls stay lush after washing and feel premium to the touch.',
        createdAt: '2026-01-29'
      }
    ]
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'maintain-raw-indian-hair-for-years',
    title: 'How to Maintain Your Raw Indian Hair for Years',
    category: 'Hair Care',
    summary: 'Preserve luster, density, and softness with a salon-backed home ritual.',
    coverImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    readTime: '7 min read',
    publishedAt: '2026-02-14'
  },
  {
    id: 'b2',
    slug: 'lace-tinting-guide',
    title: 'The Perfect Blend: Lace Tinting 101',
    category: 'Styling Guide',
    summary: 'Choose the right tone, application flow, and drying process for invisible lace.',
    coverImage:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    readTime: '5 min read',
    publishedAt: '2026-01-30'
  },
  {
    id: 'b3',
    slug: '2026-hair-trends',
    title: '2026 Hair Trends: The Return of the Silk Press',
    category: 'Trends',
    summary: 'Texture layering, understated volume, and polished lengths are defining the year.',
    coverImage:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    readTime: '6 min read',
    publishedAt: '2026-03-01'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Serena Williams',
    role: 'Verified Customer',
    quote:
      'The quality is beyond comparison. I have worn my extensions for two years and they still look brand new.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't2',
    name: 'Mira Thomas',
    role: 'Bride',
    quote:
      'The lace laid flat, the color match was exact, and the finish lasted through every event.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't3',
    name: 'Anika Rao',
    role: 'Salon Partner',
    quote: 'Reliable quality, consistent density, and packaging that already feels premium.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  }
];
