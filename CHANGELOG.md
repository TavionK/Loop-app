# Changelog

## v3.0

## What's New

**Redesigned UI**
The entire task view has been rebuilt from the ground up with a cleaner, more minimal aesthetic. Tasks now appear as a flat list with hairline separators instead of individual cards. The header features a large "Today, N to go." hero heading so your remaining task count is always front and centre.

**Personalised Welcome Message**
The app now greets you by name when you log in. Your display name is pulled from your account and shown above the heading on the main screen.

**Pinned Add Task Input**
The add task input has moved to the bottom of the screen, making it easier to reach on mobile. It now has a pill-shaped border with a drop shadow and a round purple add button.

**Responsive Header Buttons**
The Settings and Logout buttons show only icons on mobile and reveal their labels on larger screens, keeping the header clean at any size.

**Accessibility Improvements**

- All form inputs across login, sign up, forgot password, and settings now have proper `label` elements for screen readers
- Error and status messages use `role="alert"` so they are announced immediately
- Icon-only buttons have descriptive `aria-label` attributes
- All grey text has been updated to meet WCAG AA contrast requirements

**New Favicon & Page Title**
The browser tab now shows "Loop" as the page title and the purple SquareCheck icon as the favicon.

**README Overhaul**
Screenshots, updated project structure, environment variable setup, and accurate tech stack documentation have all been added to the README.

### Bug Fixes

- Fixed a TypeScript type error on the `onSubmit` handler in `AddTask`
- Removed GSAP and its dependencies, resolving bundle bloat and unused animation code

### Under the Hood

- Migrated task persistence from `localStorage` to Supabase — tasks now sync across devices and sessions
- Added account deletion via a Supabase RPC call
- Replaced `aria-label` on inputs with proper `id`/`htmlFor` label associations
