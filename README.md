# RideShare Pro - Ride Booking & Management Platform

RideShare Pro is a modern web application for ride booking and management. It allows riders to request rides, drivers to manage rides, and admins to oversee the entire platform with detailed analytics and controls.

---

## Features

### Rider
- Request rides with pickup and destination locations.
- View ride history and track real-time ride status.
- Cancel rides before they are accepted.
- Payment options: **Online** and **Offline (cash)**.

### Driver
- View assigned rides.
- Update ride status in real-time.
- Track earnings history.
- Accept or reject rides assigned by admin.

### Admin
- View all rides with advanced filtering by date, status, driver, or rider.
- Manage users: block/unblock, suspend/approve drivers.
- View detailed ride information, including driver/rider info, timestamps, and ride status timeline.
- Dashboard with overall statistics and earnings overview.

### General
- Responsive UI built with **Tailwind CSS** and **DaisyUI**.
- Modern UI components: cards, badges, dialogs, accordions.
- FAQ section to provide quick answers for users.
- Notifications using **Sonner**.
- Smooth animations with **Framer Motion**.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, DaisyUI, React Router.
- **Backend:** Node.js, Express.js, MongoDB.
- **State Management:** Redux Toolkit + RTK Query.
- **Authentication:** Firebase / JWT (as applicable).
- **Payments:** Online & offline options supported.

---

## Installation

1. Install dependencies:

```bash
npm install
```
```bash
npm run dev
