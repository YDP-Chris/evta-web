## ADDED Requirements

### Requirement: Trail Listing and Discovery
The system SHALL display all trails in a filterable card-based interface that enables visitors to quickly find trails matching their criteria.

#### Scenario: View all trails
- **WHEN** a visitor navigates to the trails page
- **THEN** all trails are displayed as cards showing name, difficulty, distance, activity types, and current status

#### Scenario: Filter by activity type
- **WHEN** a visitor selects "Bike" from the activity filter
- **THEN** only trails with "Bike" in their activity_types array are displayed
- **AND** the result count updates to reflect filtered results

#### Scenario: Filter by difficulty
- **WHEN** a visitor selects "Easy" difficulty
- **THEN** only trails with difficulty="Easy" are displayed

#### Scenario: Filter by features
- **WHEN** a visitor selects "Dog-friendly" and "Waterfall" features
- **THEN** only trails containing both features are displayed

#### Scenario: Combined filters
- **WHEN** a visitor selects activity="Hike", difficulty="Moderate", feature="Kid-friendly"
- **THEN** only trails matching ALL selected criteria are displayed

#### Scenario: No results
- **WHEN** filter combination yields zero trails
- **THEN** a helpful message is displayed suggesting to broaden filters

#### Scenario: Filter performance
- **WHEN** any filter is changed
- **THEN** results update within 500ms without page reload

---

### Requirement: Interactive Trail Maps
The system SHALL display trail routes on interactive maps using Leaflet.js with GeoJSON data from CALTOPO exports.

#### Scenario: Display trail route
- **WHEN** a visitor views a trail detail page
- **THEN** the trail route is rendered as a polyline on a Leaflet map
- **AND** the map is centered and zoomed to fit the trail bounds

#### Scenario: Difficulty color coding
- **WHEN** trails are displayed on any map
- **THEN** Easy trails are green, Moderate trails are yellow/orange, Difficult trails are red

#### Scenario: Trailhead marker
- **WHEN** a trail map is displayed
- **THEN** the trailhead location is marked with a pin
- **AND** clicking the pin shows parking information in a popup

#### Scenario: Navigate to trailhead
- **WHEN** a visitor taps "Navigate to Trailhead"
- **THEN** the device's native maps app opens with directions to the trailhead coordinates

#### Scenario: Overview map
- **WHEN** a visitor views the trails overview map
- **THEN** all trails are displayed on a single map with clickable routes
- **AND** clicking a trail route opens that trail's detail page

#### Scenario: Map load performance
- **WHEN** a map is loaded on a 3G connection
- **THEN** the map becomes interactive within 2 seconds

---

### Requirement: Trail Detail Pages
The system SHALL provide dedicated detail pages for each trail with comprehensive information, photos, and current conditions.

#### Scenario: View trail details
- **WHEN** a visitor navigates to /trails/[slug]
- **THEN** the page displays trail name, description, difficulty, distance, elevation gain, activity types, features, and status

#### Scenario: Trail status display
- **WHEN** a trail has status "Caution" or "Closed"
- **THEN** a prominent banner displays the status and any status_note

#### Scenario: Image gallery
- **WHEN** a trail has associated images
- **THEN** images are displayed in a responsive gallery
- **AND** images are served via Cloudinary with WebP optimization

#### Scenario: SEO metadata
- **WHEN** a search engine crawls a trail page
- **THEN** the page includes structured data (JSON-LD) for hiking trail schema
- **AND** Open Graph tags are present for social sharing

#### Scenario: Trail not found
- **WHEN** a visitor navigates to a non-existent trail slug
- **THEN** a 404 page is displayed with suggestions to browse all trails

---

### Requirement: Trail Status Management
The system SHALL track trail conditions (Open/Caution/Closed) with an audit history and allow authorized users to update status.

#### Scenario: Admin updates status
- **WHEN** an authenticated admin changes a trail's status to "Closed" with note "Flooding at creek crossing"
- **THEN** the trails.status is updated to "Closed"
- **AND** the trails.status_note is updated
- **AND** a record is created in trail_conditions with the change details

#### Scenario: View condition history
- **WHEN** an admin views a trail's condition history
- **THEN** all past status changes are displayed with timestamp and reporter

#### Scenario: Status change propagation
- **WHEN** a trail status is updated
- **THEN** the change is visible on trail cards and detail pages within 1 minute
