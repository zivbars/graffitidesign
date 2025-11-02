# Component Usage Guide - New UI Components

Quick reference for using the newly created components in the Graffiti Designs project.

---

## 🎬 HeroVideo

**Location**: `components/HeroVideo.tsx`  
**Type**: Client Component  
**Purpose**: Full-screen video hero section for homepage

### Usage

```tsx
import HeroVideo from '@/components/HeroVideo';

<HeroVideo />
```

### Features
- Auto-plays muted video from `/public/videos/hero-showcase.mp4`
- Falls back to static image on error
- Gradient overlay for readability
- Animated scroll indicator
- Responsive: full viewport height

### Customization
Edit the component file to change:
- Video source path
- Fallback image
- Overlay gradient colors
- Content text and CTA

---

## 🎯 CategoryRibbon

**Location**: `components/CategoryRibbon.tsx`  
**Type**: Server Component  
**Purpose**: Horizontal scrollable category cards

### Usage

```tsx
import CategoryRibbon from '@/components/CategoryRibbon';

<CategoryRibbon />
```

### Features
- Automatically pulls categories from `types/product.ts`
- Links to `/shop?category={slug}`
- CSS scroll-snap for smooth scrolling
- Emoji icons for each category

### Customization
To change category icons, edit the `categoryIcons` object:
```tsx
const categoryIcons: Record<Category, string> = {
  notebooks: '📓',
  envelopes: '✉️',
  // ... add more
};
```

---

## 💎 StoryStrip

**Location**: `components/StoryStrip.tsx`  
**Type**: Server Component  
**Purpose**: Brand values showcase

### Usage

```tsx
import StoryStrip from '@/components/StoryStrip';

<StoryStrip />
```

### Features
- 3 brand value cards with icons
- "Made in Israel" badge
- Gradient background
- Hover animations

### Customization
Edit the `values` array to change content:
```tsx
const values = [
  {
    icon: <svg>...</svg>,
    title: 'כותרת',
    description: 'תיאור'
  }
];
```

---

## 🎠 FeatureCarousel

**Location**: `components/FeatureCarousel.tsx`  
**Type**: Client Component  
**Purpose**: Auto-playing feature carousel with Embla

### Usage

```tsx
import FeatureCarousel from '@/components/FeatureCarousel';

<FeatureCarousel />
```

### Features
- 5 slides with auto-play (5s interval)
- Touch/swipe enabled
- Dot indicators
- RTL support
- Gradient borders

### Customization
Edit the `features` array:
```tsx
const features: Feature[] = [
  {
    title: 'כותרת',
    description: 'תיאור',
    color: 'from-primary-pink to-primary-turquoise',
    icon: <svg>...</svg>
  }
];
```

Change auto-play delay:
```tsx
Autoplay({ delay: 5000 }) // milliseconds
```

---

## 🔍 SearchBar

**Location**: `components/SearchBar.tsx`  
**Type**: Client Component  
**Purpose**: Debounced product search with dropdown

### Usage

```tsx
import SearchBar from '@/components/SearchBar';

<SearchBar />
```

### Features
- 300ms debounce
- Filters by product name and description
- Max 5 results shown
- Keyboard navigation (arrows, Enter, Escape)
- Click outside to close
- Clear button

### Customization
Change debounce delay:
```tsx
const timer = setTimeout(() => {
  // search logic
}, 300); // milliseconds
```

Change max results:
```tsx
.slice(0, 5) // change 5 to desired number
```

---

## ⏳ LoadingTransition

**Location**: `components/LoadingTransition.tsx`  
**Type**: Client Component  
**Purpose**: Branded loading screen (once per session)

### Usage

```tsx
import LoadingTransition from '@/components/LoadingTransition';

// In app/layout.tsx body:
<LoadingTransition />
```

### Features
- Shows once per session (sessionStorage)
- 1.5s duration
- Gradient logo animation
- Bouncing dots

### Customization
Change duration:
```tsx
setTimeout(() => {
  setIsVisible(false);
}, 1500); // milliseconds
```

Disable session-based showing:
```tsx
// Remove this check:
const hasShownLoading = sessionStorage.getItem('hasShownLoading');
```

---

## 🎨 Styling Tips

### Using Brand Colors

All components use Tailwind color tokens:

```tsx
// Pink
className="bg-primary-pink text-white"

// Turquoise
className="bg-primary-turquoise"

// Mustard
className="bg-primary-mustard"

// Gradients
className="bg-gradient-to-r from-primary-pink to-primary-turquoise"
```

### Animations

```tsx
// Fade in
className="animate-fadeIn"

// Bounce
className="animate-bounce"

// Slide in
className="animate-slideIn"

// Shimmer
className="animate-shimmer"
```

### RTL Considerations

Always use logical properties:

```tsx
// ✅ Good
className="start-0 end-0"

// ❌ Bad
className="left-0 right-0"
```

---

## 🔧 Common Modifications

### Change Video Source

Edit `components/HeroVideo.tsx`:
```tsx
<source src="/videos/your-video.mp4" type="video/mp4" />
```

### Change Search Placeholder

Edit `components/SearchBar.tsx`:
```tsx
placeholder="הקלד לחיפוש..."
```

### Add More Categories

Edit `types/product.ts`:
```tsx
export type Category = 
  | 'notebooks'
  | 'envelopes'
  | 'new-category'; // add here

export const categoryNames: Record<Category, string> = {
  // ...
  'new-category': 'קטגוריה חדשה'
};
```

Then update `components/CategoryRibbon.tsx`:
```tsx
const categoryIcons: Record<Category, string> = {
  // ...
  'new-category': '🎨'
};
```

### Disable Auto-play in Carousel

Edit `components/FeatureCarousel.tsx`:
```tsx
// Remove Autoplay from array:
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: 'rtl' });
```

---

## 🐛 Troubleshooting

### Video not showing
1. Check file exists at `/public/videos/hero-showcase.mp4`
2. Check browser console for errors
3. Verify video format (MP4 H.264)
4. Component will fall back to image automatically

### Search not working
1. Check products array is imported correctly
2. Verify product objects have `name` and `description`
3. Check console for errors

### Carousel not auto-playing
1. Ensure `embla-carousel-autoplay` is installed
2. Check import statement
3. Verify plugin is added to useEmblaCarousel array

### Loading screen showing every time
1. Check browser sessionStorage is enabled
2. Clear sessionStorage manually: `sessionStorage.clear()`
3. Verify key name matches: `'hasShownLoading'`

---

## 📚 Further Reading

- [Embla Carousel Docs](https://www.embla-carousel.com/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS RTL](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [React Hooks](https://react.dev/reference/react)

---

**Last Updated**: October 29, 2025

