# Salon Booking App UI/UX Fixes Plan

## Phase 1: Global Layout Fix
- Update `App.tsx`: Remove `overflow-x-hidden` or `overflow-hidden` from the main layout wrapper to ensure `position: sticky` works.

## Phase 2: Home Page Routing
- Update `HomePage.tsx`:
  - Change "Book Appointment" and "Explore Services" CTA buttons.
  - Remove `openBookingPortal()` calls.
  - Implement navigation logic to set the active page to `services` and scroll to the top of the page.

## Phase 3: Services Page Refactor (EnrichBookingSystem.tsx)
- State Update: Change initial gender state to `null`.
- UI Logic:
  - If `activeGender` is `null`:
    - Hide category filters and service lists.
    - Render full-screen "Choose Your Category" view with two premium cards (Women/Men).
  - If `activeGender` is selected:
    - Display sticky category filter bar (`top-[60px] z-40`).
    - Render filtered services.
    - Add "Reset" button for gender selection.
