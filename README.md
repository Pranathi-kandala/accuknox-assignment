
# Dashboard Application

A modern full-stack dashboard application built with React, TypeScript, and Express. This interactive dashboard system allows users to manage and customize various widgets across different security and monitoring categories.

# Preview
-**Navbar features like refresh,filtering according to day,hr,search feature** 
<img width="1857" height="873" alt="image" src="https://github.com/user-attachments/assets/480eb11a-a6e9-4f20-8389-6ffdea3549ac" />
-**create dashboard** 
<img width="1903" height="854" alt="image" src="https://github.com/user-attachments/assets/6a08198b-efd7-4c43-836f-2a11fc603b79" />
-**adding new widgets with type,color theme,chart types etc**
<img width="1897" height="873" alt="image" src="https://github.com/user-attachments/assets/7b25f1c4-dc6c-4f0d-bb99-01315cdc0eae" />
-**ticket management with drop down**
<img width="1912" height="862" alt="image" src="https://github.com/user-attachments/assets/94d8329f-afe3-42fe-b083-ef48afc06427" />


## Features


- **Interactive Dashboard**: Customizable widgets across multiple categories
- **Widget Management**: Add, remove, and configure dashboard widgets
- **Data Visualization**: Charts and graphs using Recharts library
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Redux Toolkit for predictable state management
- **Real-time Updates**: Live data updates and interactive components

## Widget Categories

- **CSPM (Cloud Security Posture Management)**: Cloud account monitoring and risk assessment
- **CWPP (Cloud Workload Protection Platform)**: Namespace alerts and workload monitoring
- **Registry Scan**: Image vulnerability assessments and security issues
- **Ticket Management**: Task tracking and status management

## Tech Stack

### Frontend
- **React 18** 
- **Redux Toolkit** for state management
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Wouter** for routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Neon** serverless database
- **Express Session** for session management

### Development Tools
- **Vite** for fast development and building
- **ESBuild** for server builds
- **Drizzle Kit** for database migrations
- **TypeScript** for type checking

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (or use included Neon serverless)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard-application
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with your database connection string:
```
DATABASE_URL=your_database_connection_string
PORT=5000
```

4. Run database migrations:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Production Build

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store configuration
│   │   ├── lib/            # Utility functions and configs
│   │   └── types/          # TypeScript type definitions
│   └── index.html
├── server/                 # Backend Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── vite.ts             # Vite development integration
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── package.json
```

## API Endpoints

- `GET /api/widgets` - Fetch all dashboard widgets
- `POST /api/widgets` - Create a new widget
- `PUT /api/widgets/:id` - Update a widget
- `DELETE /api/widgets/:id` - Delete a widget

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User authentication and profiles
- **dashboard_widgets**: Widget configurations and settings

## Customization

### Adding New Widget Types

1. Define the widget type in `client/src/types/dashboard.ts`
2. Create the widget component in `client/src/components/`
3. Add the widget to the available widgets in `client/src/lib/dashboardConfig.ts`
4. Update the widget rendering logic in `client/src/components/WidgetCard.tsx`

### Styling

The application uses Tailwind CSS with custom CSS variables for theming. Modify the theme in:
- `tailwind.config.ts` - Tailwind configuration
- `client/src/index.css` - Global styles and CSS variables


## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes
