# Express Backend

Express.js backend for the automated pipeline project with Azure SQL database integration.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env` file and update with your Azure SQL credentials
   - Set appropriate values for your database connection

3. Run the application:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/data` - Fetch data from database
- `POST /api/data` - Insert new data

## Project Structure

```
src/
├── config/         # Database and app configuration
├── controllers/    # Request handlers
├── routes/         # API routes
├── services/       # Business logic
├── middlewares/    # Custom middleware
├── utils/          # Utility functions
└── app.js          # Main application file
```
