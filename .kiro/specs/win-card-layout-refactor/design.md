# Design Document

## Overview

This design document outlines the refactoring of the win post card layout in the WinsList component to improve visual hierarchy, user experience, and information accessibility. The new design reorganizes content in a logical flow that prioritizes user identification, visual content, and detailed win information while maintaining consistency with the existing retro gaming design system.

## Architecture

### Current Implementation Analysis

The existing WinsList component renders win cards with the following structure:
- Prize badge and rating (top)
- Username with icon (below badge)
- Comment text (below username)
- Photo (below comment)
- Date with calendar icon (bottom)

### New Architecture

The refactored design will reorganize the layout to follow this hierarchy:
1. **Primary Info Line**: Username + Date (most prominent)
2. **Photo**: Visual content (main focus)
3. **Prize Name**: Short title (attention-grabbing)
4. **Prize Description**: User's experience text
5. **Rating**: Fairness stars (optional)
6. **Comment**: Tips/experience (optional, muted)

## Components and Interfaces

### Data Structure

The win object contains the following relevant fields:
```javascript
{
  id: string,
  machine_id: string,
  prize: string,           // Prize name/title
  prize_category: string,  // Category for filtering
  user_name: string,       // Optional username
  comment: string,         // Optional tips/experience
  rating: number,          // 1-5 fairness rating
  photo_url: string,       // Optional photo URL
  created_at: string       // ISO timestamp
}
```

### Component Structure

The WinsList component will be refactored to use the new layout structure while maintaining the existing:
- Responsive design patterns
- Retro gaming color scheme
- Typography system (Inter/Poppins)
- Card styling with `retro-card` class

### Layout Implementation

#### 1. Primary Info Line
```jsx
<div className="flex items-center text-sm mb-3">
  <span className="text-lg font-bold text-retro-text">
    👤 {win.user_name || 'Anonymous'}
  </span>
  <span className="text-xs text-retro-text-secondary ml-2">
    • {formatDate(win.created_at)}
  </span>
</div>
```

#### 2. Photo Display
```jsx
{win.photo_url && (
  <div className="mb-3">
    <img 
      src={win.photo_url} 
      alt={win.prize}
      className="w-full h-48 object-cover rounded-xl"
    />
  </div>
)}
```

#### 3. Prize Name
```jsx
<h4 className="text-sm font-semibold text-retro-blue mb-2">
  {win.prize}
</h4>
```

#### 4. Prize Description
```jsx
<p className="text-base text-retro-text leading-relaxed mb-3">
  {win.comment || 'No description provided'}
</p>
```

#### 5. Rating (Conditional)
```jsx
{win.rating && (
  <div className="flex items-center mb-2">
    <span className="text-sm text-retro-text mr-2">Fairness:</span>
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-base">
          {i < win.rating ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  </div>
)}
```

#### 6. Comment (Conditional)
```jsx
{win.comment && (
  <p className="text-xs text-retro-text-secondary italic">
    {win.comment}
  </p>
)}
```

## Data Models

### Win Card Data Flow

1. **Input**: Win object from props
2. **Processing**: 
   - Format date using `toLocaleDateString()`
   - Handle optional fields (user_name, rating, comment)
   - Generate star rating display
3. **Output**: Rendered card with new layout

### Field Mapping

| Current Usage | New Usage | Field | Notes |
|---------------|-----------|-------|-------|
| Prize badge | Prize name | `prize` | Now prominent cyan text |
| Secondary text | Primary info | `user_name` | Now bold white text |
| Bottom element | Primary info | `created_at` | Now secondary gray text |
| Below username | Prize description | `comment` | Now main description |
| Top right | Below description | `rating` | Now gold stars with label |
| Below comment | Main focus | `photo_url` | Now larger, 200px height |

## Error Handling

### Missing Data Scenarios

1. **No Username**: Display "Anonymous" as fallback
2. **No Photo**: Skip photo section entirely, no empty space
3. **No Rating**: Skip rating section entirely
4. **No Comment**: Use prize name as description, or show "No description"
5. **Invalid Date**: Show "Date unavailable"

### Image Loading

- Use existing error handling for broken image URLs
- Maintain aspect ratio with `object-cover`
- Apply consistent border radius (12px)

## Testing Strategy

### Visual Regression Testing

1. **Layout Verification**: Ensure correct element order
2. **Typography Testing**: Verify font sizes, weights, and colors
3. **Responsive Testing**: Check layout on mobile and desktop
4. **Conditional Rendering**: Test with missing optional fields

### Component Testing

1. **Props Testing**: Verify handling of complete and incomplete win objects
2. **Date Formatting**: Test various date formats and edge cases
3. **Rating Display**: Test rating values from 1-5 and null
4. **Image Handling**: Test with valid URLs, broken URLs, and null values

### Integration Testing

1. **Data Flow**: Verify win data flows correctly from parent components
2. **Styling Integration**: Ensure new layout works with existing CSS classes
3. **Performance**: Check rendering performance with large win lists

## Implementation Notes

### CSS Classes to Use

- `retro-card`: Existing card styling
- `text-retro-text`: White text (#ffffff)
- `text-retro-text-secondary`: Gray text (#a0a0c0)
- `text-retro-blue`: Cyan text (#00d9ff)
- `font-bold`, `font-semibold`: Typography weights
- `text-lg`, `text-base`, `text-sm`, `text-xs`: Font sizes
- `leading-relaxed`: Line height 1.5
- `rounded-xl`: 12px border radius

### Spacing System

- `mb-3`: 12px margin bottom (standard spacing)
- `mb-2`: 8px margin bottom (tight spacing)
- `ml-2`: 8px margin left (inline spacing)

### Responsive Considerations

The design maintains the existing responsive patterns:
- Cards stack vertically on mobile
- Images scale to container width
- Text remains readable at all screen sizes
- Touch targets meet accessibility requirements

### Accessibility

- Maintain semantic HTML structure
- Preserve alt text for images
- Ensure sufficient color contrast
- Keep focus indicators for interactive elements