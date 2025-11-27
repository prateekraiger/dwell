# 🏨 Dwell - Hotel Booking Platform

A modern, full-stack hotel booking platform built with Next.js, Convex, and Stripe. Dwell allows property owners to list their rooms and guests to discover and book accommodations seamlessly.

## ✨ Features

### For Guests

- 🔍 Browse and search available rooms
- 📅 Real-time availability checking
- 💳 Secure payment processing with Stripe
- 📱 Responsive design for all devices
- 🔐 Secure authentication with Clerk
- 📊 View booking history and status

###For Property Owners

- 🏠 List and manage multiple properties
- 📸 Upload multiple room photos
- 💰 Track bookings and revenue
- 📈 Dashboard with analytics
- ✏️ Edit room details and pricing
- 🎯 Highlight room amenities

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database & Backend:** Convex
- **Authentication:** Clerk
- **Payments:** Stripe
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Notifications:** Sonner

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prateekraiger/dwell
cd dwell
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=<your-convex-deployment>
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>

# Host URL (for Stripe redirects)
HOST_URL=http://localhost:3000
```

4. Set up Convex environment variables:

```bash
pnpx convex env set HOST_URL http://localhost:3000
pnpx convex env set STRIPE_SECRET_KEY <your-stripe-secret-key>
```

5. Run the development server:

```bash
pnpm run dev
```

6. In a separate terminal, run Convex:

```bash
pnpx convex dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dwell/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Owner dashboard pages
│   ├── my-bookings/         # User bookings page
│   ├─
─ rooms/               # Room listing and details
│   ├── sign-in/             # Authentication pages
│   └── sign-up/
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── common/             # Shared components (Navbar, Footer)
│   ├── dashboard/          # Dashboard-specific components
│   ├── home/               # Homepage components
│   └── ui/                 # UI primitives (shadcn/ui)
├── convex/                  # Convex backend
│   ├── bookings.ts         # Booking queries and mutations
│   ├── dashboard.ts  # Dashboard statistics
│   ├── payments.ts         # Stripe integration
│   ├── rooms.ts            # Room management
│   └── users.ts            # User management
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## 📄 License

This project is licensed under the MIT License - see the [Apache License](LICENSE) file for details.
