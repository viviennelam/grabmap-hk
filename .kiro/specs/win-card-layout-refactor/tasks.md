# Implementation Plan

- [x] 1. Create new primary info line component
  - Add username and date display at the top of each win card
  - Format as "👤 [Username] • [Date]" with proper styling
  - Apply 18px bold white for username, 12px gray for date
  - Handle anonymous users with "Anonymous" fallback
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Move photo to second position and update styling
  - Reposition existing photo element to appear after primary info
  - Update photo height from 128px (h-32) to 200px (h-48)
  - Change border-radius from rounded-lg to rounded-xl (12px)
  - Keep existing width and object-cover properties
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 3. Convert prize badge to prize name heading
  - Replace existing prize-badge styling with heading-style text
  - Apply 14px semi-bold cyan (retro-blue) color
  - Position below photo with 12px top, 8px bottom margin
  - Remove badge background and border styling
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4. Repurpose comment field as prize description
  - Move existing comment display to appear after prize name
  - Update styling to 15px white text with 1.5 line-height
  - Change from small secondary text to main description styling
  - Keep existing conditional rendering logic
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Update rating display format and position
  - Move existing rating section to appear after description
  - Replace current star icon with emoji stars (⭐)
  - Add "Fairness:" label prefix and update to gold color
  - Change from inline display to block with proper spacing
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 6. Add optional tips/experience comment section
  - Create new conditional section for additional user tips
  - Style as 13px italic muted gray text (retro-text-secondary)
  - Position as final element in card layout
  - Only display when additional comment data exists
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 7. Adjust spacing and remove date from bottom
  - Remove existing date display from bottom of card
  - Update margins between sections for proper visual hierarchy
  - Ensure consistent spacing matches design specifications
  - Test layout with various content combinations
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 8. Optimize image sizing for portrait photos
  - Adjust image display to handle portrait photos (typically iPhone photos) better
  - Reduce zoom level to show more of the image without making it too large
  - Maintain aspect ratio while ensuring images don't dominate the card layout
  - Test with various portrait photo dimensions and orientations
  - Apply object-fit properties to balance visibility and card proportions