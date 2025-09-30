# Image Optimization for Portrait Photos

## Overview

This implementation optimizes the display of images in win cards, particularly for portrait photos (typically iPhone photos) that have a taller aspect ratio.

## Key Features

### 1. Dynamic Aspect Ratio Detection
- **Portrait photos** (aspect ratio < 0.8): Uses `object-fit: contain` to show more of the image without cropping
- **Landscape photos** (aspect ratio > 1.5): Uses `object-fit: cover` with controlled height (200px)
- **Square-ish photos** (0.8 ≤ aspect ratio ≤ 1.5): Uses `object-fit: cover` with balanced height (220px)

### 2. Responsive Design
- **Mobile devices** (< 768px): Reduced max heights to prevent images from dominating small screens
- **Tablet devices** (768px - 1024px): Medium-sized constraints
- **Desktop devices** (> 1024px): Full-sized display with maximum heights

### 3. Graceful Error Handling
- Broken images are hidden automatically
- Container is also hidden when image fails to load
- No empty spaces left in the layout

## CSS Classes

### `.win-photo-container`
- Container with rounded corners, border, and subtle background
- Provides consistent styling regardless of image content

### `.win-photo`
- Base image styling with responsive behavior
- Minimum height of 160px to maintain layout consistency
- Smooth transitions when aspect ratio classes are applied

### `.win-photo-portrait`
- Applied to portrait images (aspect ratio < 0.8)
- Uses `contain` to show full image without cropping
- Maximum height of 280px (260px on mobile)

### `.win-photo-landscape`
- Applied to landscape images (aspect ratio > 1.5)
- Uses `cover` with fixed height of 200px
- Maintains visual consistency with other card elements

### `.win-photo-square`
- Applied to square-ish images (0.8 ≤ aspect ratio ≤ 1.5)
- Uses `cover` with height of 220px
- Balanced approach between portrait and landscape

## Implementation Details

### JavaScript Logic
```javascript
onLoad={(e) => {
  const img = e.target;
  const aspectRatio = img.naturalWidth / img.naturalHeight;
  
  // Remove existing classes
  img.classList.remove('win-photo-portrait', 'win-photo-landscape', 'win-photo-square');
  
  // Apply appropriate class based on aspect ratio
  if (aspectRatio < 0.8) {
    img.classList.add('win-photo-portrait');
  } else if (aspectRatio > 1.5) {
    img.classList.add('win-photo-landscape');
  } else {
    img.classList.add('win-photo-square');
  }
}}
```

### Benefits
1. **Better visibility** of portrait photos without excessive cropping
2. **Consistent layout** across different image orientations
3. **Responsive behavior** that adapts to screen size
4. **Performance optimized** with CSS transitions and proper image handling
5. **Maintains design consistency** with the retro gaming theme

## Testing

The implementation has been tested with:
- Portrait iPhone photos (2:3 and taller ratios)
- Square photos (1:1 ratio)
- Landscape photos (3:2 and wider ratios)
- Very tall portrait photos (extreme ratios)
- Missing/broken images
- Various screen sizes and devices

## Browser Compatibility

- Modern browsers with CSS Grid and Flexbox support
- Mobile Safari (iOS)
- Chrome/Chromium browsers
- Firefox
- Edge

The implementation uses standard CSS properties and JavaScript APIs that are widely supported.