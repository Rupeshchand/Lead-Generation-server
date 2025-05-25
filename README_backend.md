# Lead Generation Backend

This is the Express.js backend that accepts lead submissions from client and forwards them to an n8n webhook.

## Features
 - Accepts POST requests to `/api/submit-lead`
 - Validates required fields
 - Sends data to n8n webhook for Workflow automation

## Tech Stack
 - Express.js
 - dotenv
 - cors
 - axios

## Development Tools
 - nodemon (auto reloads the server during development)
    # Setup with nodemon
        - In your package.json under "scripts":
        "scripts": {
            "start": "nodemon server.js"
        }
    Replace server.js with your server file.

## Installation
    ```bash
    git clone <https://github.com/Rupeshchand/Lead-Generation-server.git>
    cd backend
    npm install
    npm start
    ```

Create `.env` file:

    PORT=5000
    N8N_WEBHOOK_URL=https://rupesh19.app.n8n.cloud/webhook/submit-lead

## CORS configuration

    CORS should be configured to allow frontend to access data

    ```js
    const allowedUrls = ["http://localhost:5173","https://lead-generation-coral.vercel.app/"];
    ```

## Test API
    You can test api with postman or from frontend

    ```bash
    POST /api/submit-lead
    Content-Type: application/json

    {
        "name": "Rupeshchand",
        "email": "vasantamrupesh@gmail.com",
        "company": "Saffron Company",
        "message": "Looking for a Saffron buds."
    }
    ```

## Future Enhancements

    - Sanitize incoming data to prevent XSS or SQL injection attacks
    - Logging & Monitoring
    - Rate Limiting (to prevnt DoS, and Brute Force attacks)
    - We can add captcha for spam detection
    - CRM Integration
        We can forward leads to CRM systems like HubSpot, Salesforce, or Zoho using APIs.
    - API Documentations using Postman