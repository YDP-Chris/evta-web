## ADDED Requirements

### Requirement: QR Code Check-in System
The system SHALL provide a mobile-optimized check-in flow accessible via QR codes at trailheads, capturing usage data for grant applications without requiring user authentication.

#### Scenario: Scan QR code at trailhead
- **WHEN** a visitor scans a QR code at a trailhead
- **THEN** they are directed to /checkin/[trail-slug] on their mobile device
- **AND** the page loads within 3 seconds on 3G

#### Scenario: Submit check-in
- **WHEN** a visitor submits the check-in form with party_size=3 and activity_type="Hike"
- **THEN** a record is created in check_ins table
- **AND** a confirmation screen is displayed with trail information

#### Scenario: Check-in form fields
- **WHEN** a visitor views the check-in form
- **THEN** they can select party size (1-10) and activity type (Hike/Bike/Paddle/Equestrian)
- **AND** all fields have mobile-friendly touch targets (44px minimum)

#### Scenario: Check-in confirmation
- **WHEN** a check-in is successfully recorded
- **THEN** the visitor sees "Thanks for checking in!"
- **AND** a count of other visitors today is displayed (e.g., "12 others are on this trail today")
- **AND** a link to the full trail detail page is provided

#### Scenario: Privacy-safe counter
- **WHEN** displaying the daily visitor count
- **THEN** only the total count is shown, no personal information

#### Scenario: Quick completion
- **WHEN** a visitor starts the check-in flow
- **THEN** they can complete submission within 30 seconds

---

### Requirement: Check-in Statistics and Reporting
The system SHALL provide administrators with access to check-in statistics and data export capabilities for grant applications.

#### Scenario: View check-in dashboard
- **WHEN** an admin navigates to the check-ins admin page
- **THEN** they see summary statistics: total check-ins, check-ins by trail, check-ins by activity type

#### Scenario: Filter by date range
- **WHEN** an admin selects a date range (e.g., "Last Quarter")
- **THEN** statistics are filtered to only include check-ins within that range

#### Scenario: Export to CSV
- **WHEN** an admin clicks "Export CSV"
- **THEN** a CSV file is downloaded containing: trail_name, party_size, activity_type, checked_in_at
- **AND** the export respects any active date filters

#### Scenario: Grant-ready metrics
- **WHEN** preparing grant applications
- **THEN** the system can report: total check-ins by trail, check-ins by activity type, average party size, peak usage days/times

#### Scenario: Check-in trends
- **WHEN** an admin views the dashboard
- **THEN** a chart shows check-in trends over time (daily/weekly/monthly)
