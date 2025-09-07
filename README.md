
## Dashboard Application

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
**Dynamic Navbar** – Refresh, filter by day/hour, and search functionality.

**Customizable Dashboards** – Create and personalize dashboards to fit your workflow.

**Widget Management** – Add, configure, and style widgets with different chart types and color themes.

**Ticket Management** – Handle tickets seamlessly with dropdown-based controls.

**Data Visualization** – Interactive charts and graphs powered by Recharts.

**Responsive Design** – Mobile-friendly interface built with Tailwind CSS.

**State Management** – Predictable and scalable state flow with Redux Toolkit.



## Tech Stack

### Frontend
- **React 18** 
- **Redux Toolkit** for state management
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Wouter** for routing


## Getting Started



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

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`



## API Endpoints

- `GET /api/widgets` - Fetch all dashboard widgets
- `POST /api/widgets` - Create a new widget
- `PUT /api/widgets/:id` - Update a widget
- `DELETE /api/widgets/:id` - Delete a widget




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
