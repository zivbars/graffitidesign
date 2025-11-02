# Deployment Checklist - Graffiti Designs UI/UX Upgrade

Use this checklist before deploying the upgraded website to production.

---

## 📋 Pre-Deployment Checklist

### ✅ Dependencies

- [x] `embla-carousel-react` installed
- [x] `embla-carousel-autoplay` installed
- [x] All dependencies up to date
- [ ] Run `npm audit` and fix vulnerabilities (if any)
- [ ] Test build: `npm run build`

### ✅ Media Files

- [ ] **CRITICAL**: Add `hero-showcase.mp4` to `/public/videos/`
  - Size: < 5MB recommended
  - Format: MP4 (H.264)
  - Duration: 6-12 seconds
  - Resolution: 1920x1080 or higher
- [x] Fallback image exists: `/public/bg/wood-light.jpg`
- [ ] All product images present in `/public/products/`
- [ ] OG image present: `/public/og-image.jpg`

### ✅ Configuration

- [x] Tailwind animations configured
- [x] Global CSS utilities added
- [x] RTL support maintained
- [ ] Environment variables set (if any)
- [ ] `next.config.mjs` optimized

### ✅ Code Quality

- [x] All TypeScript errors resolved
- [x] ESLint passes (0 errors)
- [x] No console warnings
- [ ] Remove debug console.log statements
- [ ] Comments added where needed

### ✅ Testing

- [ ] **Homepage loads correctly**
  - [ ] Video plays (or fallback shows)
  - [ ] Category ribbon scrolls smoothly
  - [ ] Story strip displays
  - [ ] Feature carousel auto-plays
  - [ ] Featured products load
  - [ ] Reviews section displays
  - [ ] Newsletter form works

- [ ] **Header functionality**
  - [ ] Search bar filters products
  - [ ] Search dropdown shows results
  - [ ] Keyboard navigation works
  - [ ] Cart badge shows count
  - [ ] Cart badge bounces on add
  - [ ] Mobile menu toggles

- [ ] **Cart page**
  - [ ] Items display correctly
  - [ ] Quantity buttons work
  - [ ] Hover effects animate
  - [ ] Checkout button styled
  - [ ] Shipping calculation correct
  - [ ] Empty state shows

- [ ] **Loading screen**
  - [ ] Shows on first visit
  - [ ] Doesn't show on refresh (same session)
  - [ ] Fades out smoothly after 1.5s

- [ ] **All other pages still work**
  - [ ] /shop
  - [ ] /product/[slug]
  - [ ] /about
  - [ ] /contact
  - [ ] /reviews
  - [ ] /faq
  - [ ] /partners
  - [ ] /sale

### ✅ Responsive Testing

Test on these breakpoints:

- [ ] **Mobile** (320px - 767px)
  - [ ] Hero video covers screen
  - [ ] Categories scroll horizontally
  - [ ] Search hidden in header
  - [ ] Hamburger menu works
  - [ ] Touch/swipe on carousel

- [ ] **Tablet** (768px - 1023px)
  - [ ] Layout adapts correctly
  - [ ] Images scale properly
  - [ ] Carousel dots visible

- [ ] **Desktop** (1024px+)
  - [ ] Full header with search
  - [ ] Video full-screen
  - [ ] 4-column product grid
  - [ ] All nav links visible

### ✅ Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### ✅ Performance

- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)
- [ ] Video file size optimized
- [ ] Images optimized (WebP preferred)
- [ ] No layout shifts (CLS < 0.1)

### ✅ Accessibility

- [ ] Keyboard navigation works everywhere
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Color contrast sufficient
- [ ] All images have alt text
- [ ] ARIA labels present
- [ ] Focus indicators visible
- [ ] No keyboard traps

### ✅ SEO

- [ ] All pages have unique titles
- [ ] Meta descriptions present
- [ ] OG tags configured
- [ ] Structured data (JSON-LD) present
- [ ] Robots.txt allows crawling
- [ ] Sitemap generated (if applicable)

### ✅ Security

- [ ] No exposed API keys
- [ ] HTTPS enforced
- [ ] No inline scripts without CSP
- [ ] Dependencies vulnerability-free

---

## 🚀 Deployment Steps

### 1. Final Build Test

```bash
npm run build
npm start
```

Visit http://localhost:3000 and test all functionality.

### 2. Commit Changes

```bash
git add .
git commit -m "feat: UI/UX upgrade with video hero, carousel, and search"
git push origin main
```

### 3. Deploy to Vercel

**Option A: Automatic (GitHub Integration)**
- Push triggers auto-deploy
- Monitor build logs in Vercel dashboard

**Option B: Manual (CLI)**
```bash
vercel --prod
```

### 4. Post-Deployment Verification

- [ ] Visit production URL
- [ ] Test all critical paths
- [ ] Check video loads on production
- [ ] Verify analytics tracking (if configured)
- [ ] Test from different devices
- [ ] Check SSL certificate

---

## 🐛 Common Issues & Fixes

### Video not loading in production

**Problem**: Video shows locally but not on Vercel  
**Solution**: 
1. Verify file is in `/public/videos/`
2. Check file size (Vercel has limits)
3. Verify video format (MP4 H.264)
4. Check browser console for errors

### Build fails

**Problem**: `npm run build` errors  
**Solution**:
1. Delete `.next/` and `node_modules/`
2. Run `npm install`
3. Run `npm run build` again
4. Check error messages

### Search not working

**Problem**: Dropdown doesn't show  
**Solution**:
1. Check products array imports
2. Verify z-index on dropdown
3. Check console for errors

### Carousel not auto-playing

**Problem**: Carousel stays on first slide  
**Solution**:
1. Verify `embla-carousel-autoplay` installed
2. Check plugin import
3. Verify delay setting (5000ms)

---

## 📊 Monitoring

After deployment, monitor:

- [ ] **Error tracking** (Sentry, if configured)
- [ ] **Analytics** (Google Analytics, if configured)
- [ ] **Performance** (Vercel Analytics)
- [ ] **User feedback** (contact form submissions)

---

## 🔄 Rollback Plan

If issues arise:

1. **Revert via Vercel Dashboard**
   - Go to Deployments
   - Click previous deployment
   - Click "Promote to Production"

2. **Or via Git**
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## 📝 Notes for Future Developers

### Video Recommendations
- Keep video under 5MB for fast loading
- Use tools like HandBrake for compression
- Test on slow 3G connection

### Search Enhancements (Future)
- Consider adding Algolia for better performance
- Add recent searches feature
- Add category filter in dropdown

### Carousel Additions (Future)
- Add manual arrow controls
- Add pause on hover indicator
- Link slides to relevant pages

### Performance Optimizations (Future)
- Implement lazy loading for below-fold content
- Add service worker for offline support
- Consider CDN for video hosting

---

## ✅ Final Sign-Off

- [ ] All checklist items completed
- [ ] Stakeholders reviewed and approved
- [ ] Backup of current production taken
- [ ] Team notified of deployment
- [ ] Ready for production release

---

**Deployment Date**: _____________  
**Deployed By**: _____________  
**Production URL**: https://graffiti-designs.vercel.app  
**Version**: 2.0.0 (UI/UX Upgrade)

---

🎉 **Good luck with your deployment!**

