## ADDED Requirements

### Requirement: Admin Authentication
The system SHALL provide secure authentication for administrators using Supabase Auth with magic link email login.

#### Scenario: Admin login
- **WHEN** an admin enters their email and clicks "Send Magic Link"
- **THEN** an email is sent with a one-time login link
- **AND** clicking the link authenticates the user and redirects to the admin dashboard

#### Scenario: Protected routes
- **WHEN** an unauthenticated user attempts to access /admin/*
- **THEN** they are redirected to the login page

#### Scenario: Session persistence
- **WHEN** an admin logs in
- **THEN** their session persists for 7 days without requiring re-authentication

#### Scenario: Admin logout
- **WHEN** an admin clicks "Logout"
- **THEN** their session is terminated and they are redirected to the homepage

---

### Requirement: Role-Based Access Control
The system SHALL support three roles (Admin, Steward, Viewer) with different permission levels.

#### Scenario: Admin role permissions
- **WHEN** a user has the Admin role
- **THEN** they can: edit all trail information, update conditions, upload images, view check-in data, export data, manage other users, edit homepage content

#### Scenario: Steward role permissions
- **WHEN** a user has the Steward role
- **THEN** they can: edit trail information, update conditions, upload images, view check-in data, export data
- **AND** they cannot: manage users, edit homepage content

#### Scenario: Viewer role permissions
- **WHEN** a user has the Viewer role
- **THEN** they can: view the dashboard, view check-in data
- **AND** they cannot: edit trails, update conditions, upload images, export data, manage users

---

### Requirement: Trail Content Management
The system SHALL provide an interface for administrators to create, edit, and manage trail information.

#### Scenario: Edit trail information
- **WHEN** an admin edits a trail and saves changes
- **THEN** the trails table is updated
- **AND** the updated_at timestamp is set
- **AND** changes are visible on the public site within 1 minute

#### Scenario: Edit trail form
- **WHEN** an admin views the trail edit form
- **THEN** they can modify: name, slug, description, short_description, activity_types, distance, elevation, difficulty, features, parking_info, external_links

#### Scenario: Update GeoJSON
- **WHEN** an admin pastes new GeoJSON data
- **THEN** the trail's geojson field is updated
- **AND** the map preview shows the new route

#### Scenario: Validation errors
- **WHEN** an admin submits invalid data (e.g., empty name)
- **THEN** a clear error message is displayed
- **AND** the form is not submitted

---

### Requirement: Image Upload and Management
The system SHALL allow administrators to upload and manage trail images via Cloudinary integration.

#### Scenario: Upload images
- **WHEN** an admin uses the image upload interface
- **THEN** they can drag-and-drop or select images up to 10MB
- **AND** images are uploaded to Cloudinary
- **AND** the Cloudinary URL is stored in the trail's images array

#### Scenario: Image optimization
- **WHEN** an image is uploaded
- **THEN** Cloudinary automatically creates WebP versions
- **AND** responsive sizes are generated for different viewports

#### Scenario: Delete image
- **WHEN** an admin deletes an image from a trail
- **THEN** the URL is removed from the trail's images array
- **AND** the image is no longer displayed on the public site

#### Scenario: Image preview
- **WHEN** an admin views the image management interface
- **THEN** all current trail images are displayed as thumbnails
- **AND** images can be reordered via drag-and-drop

---

### Requirement: Admin Dashboard Overview
The system SHALL provide a dashboard homepage with key metrics and quick actions for administrators.

#### Scenario: Dashboard metrics
- **WHEN** an admin views the dashboard
- **THEN** they see: total trails, trails with Caution/Closed status, check-ins this month, upcoming events count

#### Scenario: Quick actions
- **WHEN** an admin views the dashboard
- **THEN** they see shortcuts to: update trail conditions, view recent check-ins, sync Meetup events

#### Scenario: Alerts
- **WHEN** there are trails with Closed status
- **THEN** an alert is displayed on the dashboard with links to those trails
