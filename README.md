# Habit Tracker App

A full-stack habit tracking application built with React, FastAPI, PostgreSQL, and Redis.

## Features

- ✅ Track daily habits with streak counters
- 📊 Visual progress tracking with charts
- 🎯 Habit categories and goals
- 📱 Responsive design for all devices
- ⚡ Fast caching with Redis
- 🔐 User authentication and data persistence

## Tech Stack

- **Frontend**: React 18+ with TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI with Python 3.11+
- **Database**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Deployment**: Docker & Docker Compose

## Project Structure

````
```text
habit-tracker/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components/routes
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API and utility services
│   │   └── types/            # TypeScript type definitions
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/              # API route definitions
│   │   ├── core/             # Core settings, config, security
│   │   ├── models/           # Database models and schemas
│   │   ├── services/         # Business logic and services
│   │   └── main.py           # FastAPI app entrypoint
│   ├── requirements.txt
│   ├── alembic/              # Database migrations
│   └── .env.example
├── docker-compose.yml        # Docker Compose configuration
├── setup.sh                  # Project setup script
├── README.md                 # Project documentation
└── LICENSE                   # License file
````

````

## Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd habit-tracker
   chmod +x setup.sh
   ./setup.sh
````

2. **Start the application**:

   ```bash
   docker-compose up -d
   ```

3. **Access the app**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Manual Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Backend Setup

1. **Create virtual environment**:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run migrations**:

   ```bash
   python -m alembic upgrade head
   ```

5. **Start the server**:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

### Database Setup

1. **Create PostgreSQL database**:

   ```sql
   CREATE DATABASE habit_tracker;
   CREATE USER habit_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE habit_tracker TO habit_user;
   ```

2. **Redis setup**:

   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7-alpine

   # Or install locally
   # Ubuntu/Debian: sudo apt-get install redis-server
   # macOS: brew install redis
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Habits

- `GET /api/habits` - Get user habits
- `POST /api/habits` - Create new habit
- `PUT /api/habits/{id}` - Update habit
- `DELETE /api/habits/{id}` - Delete habit

### Habit Entries

- `GET /api/habits/{id}/entries` - Get habit entries
- `POST /api/habits/{id}/entries` - Record habit completion
- `PUT /api/entries/{id}` - Update entry
- `DELETE /api/entries/{id}` - Delete entry

### Analytics

- `GET /api/analytics/streaks` - Get streak data
- `GET /api/analytics/completion-rates` - Get completion rates
- `GET /api/analytics/trends` - Get trend data

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://habit_user:password@localhost:5432/habit_tracker
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Habit Tracker
```

## Docker Deployment

The application includes a complete Docker setup for easy deployment:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## Development

### Running Tests

**Backend tests**:

```bash
cd backend
pytest
```

**Frontend tests**:

```bash
cd frontend
npm run test
```

### Code Quality

**Backend linting**:

```bash
cd backend
flake8 .
black .
```

**Frontend linting**:

```bash
cd frontend
npm run lint
npm run format
```

## Deployment

### Production Setup

1. **Update environment variables** for production
2. **Set up SSL/HTTPS** with nginx or a reverse proxy
3. **Configure database backups**
4. **Set up monitoring** with tools like Prometheus/Grafana

### Scaling Considerations

- Use a load balancer for multiple backend instances
- Implement Redis Cluster for cache scaling
- Consider read replicas for PostgreSQL
- Use CDN for static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **Database connection errors**:

   - Check PostgreSQL is running
   - Verify connection string in .env
   - Ensure database and user exist

2. **Redis connection errors**:

   - Check Redis is running: `redis-cli ping`
   - Verify Redis URL in environment variables

3. **CORS errors**:

   - Check frontend URL is in backend CORS settings
   - Verify API_URL in frontend environment

4. **Port conflicts**:
   - Change ports in docker-compose.yml if needed
   - Check no other services are using ports 3000, 8000, 5432, 6379

### Getting Help

- Check the [Issues](https://github.com/yourusername/habit-tracker/issues) page
- Create a new issue with detailed error information
- Include logs and environment details

---

Built with ❤️ using React, FastAPI, PostgreSQL, and Redis
