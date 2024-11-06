A robust and scalable Node(Express) backend application with a full authentication flow, error handling, and modular structure for easy extension. This project is designed with a focus on maintainability, type safety with TypeScript, and quick environment setup with Docker Compose.



Authentication
Robust Flow:
Includes the full authentication flow:
- Signup: Users can sign up with their email and password.
- Email Verification: Users must verify their email before logging in.
- Signin: Users can log in with their credentials.
- Signout: Users can log out, which destroys the authentication token.


Security:
Passwords are securely hashed using bcrypt before storing them in the database.
Email verification is required before login is allowed, preventing unauthorized access.
Cookie-based JWT:

The authentication token is stored in a secure cookie, ensuring a stateless session while preventing common security issues such as CSRF attacks.
The token is set on successful login and is used for verifying the user's identity on subsequent requests.
Database Integration:

Users are stored and updated in a PostgreSQL database.
The user data (including email, hashed password, and verification status) is saved during signup.
User updates (like changing the password or verifying the email) are reflected in the database.
On login, the system checks the credentials against the database, and upon successful authentication, the user's status is updated (e.g., setting the user as verified).


- Error Handling
Comprehensive Handling: Modular error functions, parsers, and middleware for streamlined and consistent error management.
Extensible: Easily customizable error-handling flow for new or complex requirements.


- Middleware
Access Control: currentUser and requireAuth middlewares enforce access restrictions.
Validation: validationError middleware ensures validation consistency.


- Database
PostgreSQL: Configured with a users table for storing user details. Supports environment-specific settings for flexibility.


- Configuration
Centralized Configuration: Environment variables and app settings are managed in a single configuration file, making it easy to adjust settings for different environments.


Utilities
Reusable Functions: Helper functions are organized within a utils folder to streamline common tasks and improve code readability.

- Docker Compose
Service Management: A docker-compose.yaml file sets up both backend and PostgreSQL services, allowing quick setup and easy environment replication across systems.


- TypeScript
Full Support: TypeScript is used across the codebase to ensure type safety and improve maintainability.


- Folder Structure
Feature-based Organization: Each feature has a dedicated subfolder, including controller, model, and route files. This structure is modular, organized, and easy to navigate.
Extensibility
Designed for Growth: The clear, modular setup supports adding new features and services with minimal configuration. Perfect as a base project to clone for new applications.




- Getting Started
Prerequisites
* Docker
* git

- Clone the repository
git clone https://github.com/sagibarshai/express-template-auth-and-errors-handling.git
cd express-template-auth-and-errors-handling

- Set up the environment variables by creating a .env
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

- Run Project:
docker-compose up --build

- Stop Project:
docker-compose down
