## ADDED Requirements

### Requirement: Meetup Events Integration
The system SHALL display upcoming events from the EVTA Meetup group by syncing event data hourly and caching in the local database.

#### Scenario: View upcoming events
- **WHEN** a visitor navigates to the events page
- **THEN** upcoming events are displayed in chronological order
- **AND** each event shows title, date/time, location, description preview, and attendee count

#### Scenario: Hourly sync from Meetup
- **WHEN** the hourly cron job runs
- **THEN** the system fetches upcoming events from the Meetup API
- **AND** events are upserted into the events table by meetup_id
- **AND** the synced_at timestamp is updated

#### Scenario: RSVP on Meetup
- **WHEN** a visitor clicks "RSVP on Meetup" for an event
- **THEN** they are redirected to the event's Meetup page in a new tab

#### Scenario: Event details display
- **WHEN** an event has venue information
- **THEN** the venue name and address are displayed
- **AND** a map link to the venue is provided

#### Scenario: Meetup API unavailable
- **WHEN** the Meetup API is unreachable during sync
- **THEN** the existing cached events continue to be displayed
- **AND** an error is logged for monitoring
- **AND** no user-facing error is shown

#### Scenario: Past events hidden
- **WHEN** an event's datetime is in the past
- **THEN** the event is not displayed on the public events page

#### Scenario: Event sync freshness
- **WHEN** a new event is created on Meetup
- **THEN** it appears on the website within 1 hour

---

### Requirement: Homepage Events Preview
The system SHALL display a preview of upcoming events on the homepage to encourage community engagement.

#### Scenario: Events preview on homepage
- **WHEN** a visitor views the homepage
- **THEN** the next 3 upcoming events are displayed
- **AND** a "View All Events" link is provided

#### Scenario: No upcoming events
- **WHEN** there are no upcoming events
- **THEN** a message indicates no events are currently scheduled
- **AND** a link to the Meetup group is provided
