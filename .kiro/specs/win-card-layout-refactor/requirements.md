# Requirements Document

## Introduction

This feature involves refactoring the existing win post card layout to improve visual hierarchy, readability, and user experience. The new layout will reorganize information in a more logical flow, starting with user identification, followed by the visual content, and then detailed information about the win. The design emphasizes clear typography, proper spacing, and conditional display of optional elements.

## Requirements

### Requirement 1

**User Story:** As a user viewing win posts, I want to immediately see who posted the win and when, so that I can quickly identify the source and recency of the information.

#### Acceptance Criteria

1. WHEN a win card is displayed THEN the system SHALL show the username and date as the first line at the top
2. WHEN displaying the username THEN the system SHALL format it as 18px, bold, retro-text (#ffffff) text
3. WHEN displaying the date THEN the system SHALL format it as 12px, retro-text-secondary (#a0a0c0) text
4. WHEN formatting the primary info line THEN the system SHALL use the format "👤 [Username] • [Date]"

### Requirement 2

**User Story:** As a user browsing win posts, I want to see the photo prominently displayed, so that I can quickly assess the visual content of the win.

#### Acceptance Criteria

1. WHEN a win card displays a photo THEN the system SHALL set the width to 100% of the container
2. WHEN a win card displays a photo THEN the system SHALL set the height to exactly 200px
3. WHEN displaying the photo THEN the system SHALL use object-fit: cover to maintain aspect ratio
4. WHEN styling the photo THEN the system SHALL apply a 12px border-radius
5. WHEN positioning the photo THEN the system SHALL place it directly below the primary info line

### Requirement 3

**User Story:** As a user viewing win posts, I want to see a clear, prominent title of what was won, so that I can quickly understand the prize without reading detailed descriptions.

#### Acceptance Criteria

1. WHEN displaying the prize name THEN the system SHALL position it directly below the photo
2. WHEN styling the prize name THEN the system SHALL use 14px font-size with 600 font-weight
3. WHEN coloring the prize name THEN the system SHALL use retro-blue (#00d9ff) color
4. WHEN spacing the prize name THEN the system SHALL apply margin: 12px 0 8px 0
5. WHEN the prize name is empty THEN the system SHALL still display the element but leave it blank

### Requirement 4

**User Story:** As a user reading win posts, I want to see the user's personal description of their win experience, so that I can understand their excitement and context about the prize.

#### Acceptance Criteria

1. WHEN displaying the prize description THEN the system SHALL position it below the prize name
2. WHEN styling the description THEN the system SHALL use 15px font-size with retro-text (#ffffff) color
3. WHEN formatting the description THEN the system SHALL apply line-height: 1.5 for readability
4. WHEN spacing the description THEN the system SHALL apply margin-bottom: 12px
5. WHEN the description contains user input THEN the system SHALL display it as free-text content

### Requirement 5

**User Story:** As a user evaluating claw machines, I want to see fairness ratings when available, so that I can assess the machine's reliability before playing.

#### Acceptance Criteria

1. WHEN a win post has a fairness rating THEN the system SHALL display it below the description
2. WHEN displaying the rating THEN the system SHALL show it as star symbols (⭐) with 16px font-size
3. WHEN coloring the rating THEN the system SHALL use #ffd700 (gold) color
4. WHEN labeling the rating THEN the system SHALL prefix it with "Fairness: "
5. WHEN no rating exists THEN the system SHALL NOT display the rating section at all
6. WHEN spacing the rating THEN the system SHALL apply margin-bottom: 8px

### Requirement 6

**User Story:** As a user learning about claw machines, I want to read tips and experiences from other players when available, so that I can improve my own gameplay strategy.

#### Acceptance Criteria

1. WHEN a win post has a comment THEN the system SHALL display it as the last element
2. WHEN styling the comment THEN the system SHALL use 13px font-size with retro-text-secondary (#a0a0c0) color
3. WHEN formatting the comment THEN the system SHALL apply italic font-style
4. WHEN no comment exists THEN the system SHALL NOT display the comment section at all
5. WHEN the comment contains user tips or experiences THEN the system SHALL display the full text content

### Requirement 7

**User Story:** As a user viewing win posts on different devices, I want the layout to maintain proper visual hierarchy and spacing, so that the content remains readable and well-organized across all screen sizes.

#### Acceptance Criteria

1. WHEN the win card is displayed THEN the system SHALL maintain the exact order: primary info, photo, prize name, description, rating (if exists), comment (if exists)
2. WHEN applying the layout THEN the system SHALL ensure consistent spacing between all elements
3. WHEN the card is rendered THEN the system SHALL maintain the specified typography hierarchy with username being most prominent
4. WHEN optional elements (rating, comment) are missing THEN the system SHALL NOT leave empty spaces in their positions