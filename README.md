A robust and scalable Node(Express) backend application with a full authentication flow, error handling, and modular structure for easy extension. This project is designed with a focus on maintainability, type safety with TypeScript, and quick environment setup with Docker Compose.

Table of Contents
Features
Getting Started
Prerequisites
Installation
Environment Variables
Folder Structure
Usage
Extensibility
License
Features
Authentication
Robust Flow: Includes signup, email verification, signin, and signout functionalities.
Security: Passwords are securely hashed, and email verification is required before login is allowed.
Cookie-based JWT: Secure cookie storage for tokens, supporting stateless sessions.
Error Handling
Comprehensive Handling: Modular error functions, parsers, and middleware for streamlined and consistent error management.
Extensible: Easily customizable error-handling flow for new or complex requirements.
Middleware
Access Control: currentUser and requireAuth middlewares enforce access restrictions.
Validation: validationError middleware ensures validation consistency and simplifies debugging.
Database
PostgreSQL: Configured with a users table for storing user details. Supports environment-specific settings for flexibility.
Configuration
Centralized Configuration: Environment variables and app settings are managed in a single configuration file, making it easy to adjust settings for different environments.
Utilities
Reusable Functions: Helper functions are organized within a utils folder to streamline common tasks and improve code readability.
Docker Compose
Service Management: A docker-compose.yml file sets up both backend and PostgreSQL services, allowing quick setup and easy environment replication across systems.
TypeScript
Full Support: TypeScript is used across the codebase to ensure type safety and improve maintainability.
Folder Structure
Feature-based Organization: Each feature has a dedicated subfolder, including controller, model, and route files. This structure is modular, organized, and easy to navigate.
Extensibility
Designed for Growth: The clear, modular setup supports adding new features and services with minimal configuration. Perfect as a base project to clone for new applications.




Getting Started
Prerequisites
Docker
Docker (for containerized environment setup)


Clone the repository
git clone https://github.com/yourusername/yourproject.git
cd yourproject

Set up the environment variables by creating a .env
PORT=
JWT_KEY=
COOKIE_SECRET=
EMAIL_ADDRESS=
EMAIL_ACCESS_KEY=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_HOST=

Run Project:
docker-compose up --build

Stop Project:
docker-compose down




src/
├── config/             # Configuration files (environment settings, etc.)
├── features/           # Feature-based subfolders
│   ├── auth/           # Authentication feature
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   └── ...
├── middlewares/        # Custom middleware functions
├── utils/              # Utility functions and reusable helpers
├── app.ts              # Main server entry point
