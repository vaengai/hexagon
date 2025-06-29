#!/bin/bash

# Habit Tracker App Setup Script
# This script sets up the complete development environment

set -e  # Exit on any error

echo "🚀 Setting up Habit Tracker App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local missing_deps=()
    
    if ! command_exists docker; then
        missing_deps+=("docker")
    fi
    
    if ! command_exists docker-compose; then
        if ! docker compose version >/dev/null 2>&1; then
            missing_deps+=("docker-compose")
        fi
    fi
    
    if ! command_exists node; then
        missing_deps+=("node.js")
    fi
    
    if ! command_exists python3; then
        missing_deps+=("python3")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_error "Please install the missing dependencies and run this script again."
        exit 1
    fi
    
    print_success "All prerequisites are installed!"
}

# Create project structure
create_structure() {
    print_status "Creating project structure..."
    
    mkdir -p frontend/src/{components,pages,hooks,services,types,utils}
    mkdir -p frontend/public
    mkdir -p backend/app/{api/v1,core,models,services,schemas}
    mkdir -p backend/alembic/versions
    mkdir -p scripts
    mkdir -p docs
    
    print_success "Project structure created!"
}

# Create frontend files
create_frontend() {
    print_status "Setting up React frontend..."
    
    # package.json
    cat > frontend/package.json << 'EOF'
{
  "name": "habit-tracker-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "axios": "^1.3.4",
    "react-query": "^3.39.3",
    "react-hook-form": "^7.43.5",
    "date-fns": "^2.29.3",
    "recharts": "^2.5.0",
    "lucide-react": "^0.315.0",
    "clsx": "^1.2.1",
    "tailwind-merge": "^1.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@typescript-eslint/eslint-plugin": "^5.57.1",
    "@typescript-eslint/parser": "^5.57.1",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.38.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.2.7",
    "typescript": "^5.0.2",
    "vite": "^4.3.2",
    "vitest": "^0.29.8"
  }
}
EOF

    # vite.config.ts
    cat > frontend/vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
EOF

    # tailwind.config.js
    cat > frontend/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
EOF

    # index.html
    cat > frontend/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Habit Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

    # Basic React app structure
    cat > frontend/src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

    cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
}
EOF

    print_success "Frontend setup completed!"
}

# Create backend files
create_backend() {
    print_status "Setting up FastAPI backend..."
    
    # requirements.txt
    cat > backend/requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9
redis==5.0.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
httpx==0.25.2
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.11.0
flake8==6.1.0
EOF

    # main.py
    cat > backend/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Habit Tracker API",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Habit Tracker API", "version": settings.VERSION}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

    # Create backend structure files
    mkdir -p backend/app/core
    mkdir -p backend/app/api/v1
    mkdir -p backend/app/models
    mkdir -p backend/app/schemas
    mkdir -p backend/app/services
    
    touch backend/app/__init__.py
    touch backend/app/core/__init__.py
    touch backend/app/api/__init__.py
    touch backend/app/api/v1/__init__.py
    touch backend/app/models/__init__.py
    touch backend/app/schemas/__init__.py
    touch backend/app/services/__init__.py
    
    print_success "Backend setup completed!"
}

# Create Docker configuration
create_docker() {
    print_status "Creating Docker configuration..."
    
    # docker-compose.yml
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: habit_tracker
      POSTGRES_USER: habit_user
      POSTGRES_PASSWORD: habit_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habit_user -d habit_tracker"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://habit_user:habit_password@postgres:5432/habit_tracker
      - REDIS_URL=redis://redis:6379
      - SECRET_KEY=your-secret-key-change-in-production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev

volumes:
  postgres_data:
  redis_data:
EOF

    # Backend Dockerfile
    cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

    # Frontend Dockerfile
    cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
EOF

    print_success "Docker configuration created!"
}

# Create environment files
create_env_files() {
    print_status "Creating environment files..."
    
    # Backend .env
    cat > backend/.env << 'EOF'
# Database
DATABASE_URL=postgresql://habit_user:habit_password@localhost:5432/habit_tracker

# Redis
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# App settings
PROJECT_NAME=Habit Tracker API
VERSION=1.0.0
DEBUG=True
ALLOWED_HOSTS=["http://localhost:3000", "http://127.0.0.1:3000"]
EOF

    # Frontend .env
    cat > frontend/.env << 'EOF'
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Habit Tracker
EOF

    print_success "Environment files created!"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install frontend dependencies
    if command_exists npm; then
        print_status "Installing frontend dependencies..."
        cd frontend && npm install && cd ..
        print_success "Frontend dependencies installed!"
    else
        print_warning "npm not found, skipping frontend dependency installation"
    fi
    
    # Install backend dependencies
    if command_exists python3; then
        print_status "Setting up Python virtual environment..."
        cd backend
        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        cd ..
        print_success "Backend dependencies installed!"
    else
        print_warning "python3 not found, skipping backend dependency installation"
    fi
}

# Create additional utility scripts
create_scripts() {
    print_status "Creating utility scripts..."
    
    # Development script
    cat > scripts/dev.sh << 'EOF'
#!/bin/bash
# Start development environment

echo "Starting development environment..."

# Start databases
docker-compose up -d postgres redis

# Wait for databases to be ready
echo "Waiting for databases..."
sleep 10

# Start backend in background
echo "Starting backend..."
cd backend && source venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo "Development environment started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"

# Cleanup function
cleanup() {
    echo "Stopping development environment..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    docker-compose stop postgres redis
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for processes
wait
EOF

    chmod +x scripts/dev.sh
    
    # Production deployment script
    cat > scripts/deploy.sh << 'EOF'
#!/bin/bash
# Deploy production environment

echo "Deploying production environment..."

# Build and start all services
docker-compose -f docker-compose.prod.yml up -d --build

echo "Production environment deployed!"
echo "Access the application at your configured domain"
EOF

    chmod +x scripts/deploy.sh
    
    print_success "Utility scripts created!"
}

# Main setup function
main() {
    echo "🎯 Habit Tracker App - Automated Setup"
    echo "======================================"
    
    check_prerequisites
    create_structure
    create_frontend
    create_backend
    create_docker
    create_env_files
    create_scripts
    
    print_success "✅ Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Review and update environment variables in backend/.env and frontend/.env"
    echo "2. Start the development environment:"
    echo "   ./scripts/dev.sh"
    echo "   OR"
    echo "   docker-compose up -d"
    echo ""
    echo "3. Access your application:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend API: http://localhost:8000"
    echo "   - API Documentation: http://localhost:8000/docs"
    echo ""
    echo "🚀 Happy coding!"
}

# Run main function
main "$@"