# Pokedex Web Application

## Overview

Pokedex is a modern web application built with React, TypeScript, and Vite that provides an interactive interface to
explore Pokémon data. The application showcases Pokémon details including stats, abilities, and resistances in a
user-friendly layout.

## Features

- **Pokémon Browser**: View a grid of Pokémon with basic information
- **Detailed Pokémon View**: Click on any Pokémon card to view comprehensive information
- **Statistics**: View detailed stats for each Pokémon
- **Abilities & Resistances**: Explore Pokémon abilities and type resistances
- **Trainer Management**: Create and manage your trainer profile
- **Search Functionality**: Easily find Pokémon by name or other attributes

## Technologies Used

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **API Queries**: RTK Query
- **Styling**: TailwindCSS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion

## API

The application uses the [Tyradex API](https://tyradex.vercel.app) to fetch Pokémon data.

## Project Structure

```
/src
  /api          # API service definitions
  /components   # React components
    /magicui    # Custom UI animation components
    /ui         # Base UI components
  /hooks        # Custom React hooks
  /lib          # Utility functions
  /pages        # Page components
  /store        # Redux store setup
    /slices     # Redux slices
  /types        # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd pokedex

# Install dependencies
pnpm install
```

### Running the Application

```bash
# Start the development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Formatting

```bash
# Format code with Prettier
pnpm format
```

## Development

- The application uses Redux Toolkit for state management
- Components are built using Radix UI primitives for accessibility
- TailwindCSS is used for styling
- Type-safety is enforced with TypeScript
  
  
## Deployment 

- The site has been deployed with vercel, you can access it thanks to the url: https://pokedex-xi-lac.vercel.app/

