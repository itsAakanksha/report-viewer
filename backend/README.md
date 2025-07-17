# Backend Server


1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the server**
   ```bash
   npm run dev
   ```

3. **Server will start on**
   ```
   http://localhost:3001
   ```

## API Endpoints

- `GET /api/reports` - Get all reports with filtering
- `GET /api/reports/:id` - Get specific report
- `GET /api/reports/filters/options` - Get filter options
- `POST /api/feedback` - Submit feedback

## Authentication

Server uses JWT tokens. Test tokens are included in the frontend for development.

