# URL Shortener

[README in Portuguese](README.md)

A simple and functional URL shortener, developed as a personal project to demonstrate studies and skills in software architecture and fullstack development. This project is intended for technical analysis by recruiters and not for public use.

## Table of Contents
- [Description](#description)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Dependencies](#Dependencies)
- [How to Run the Project](#how-to-run-the-project)
- [Development Decisions](#development-decisions)
- [Parts to Improve](#parts-to-improve)
- [Final Considerations](#final-considerations)

## Description

This project implements a URL shortener with the following features:
- Shorten a given URL, returning another with a unique code on the local server.
- Redirect shortened URLs to the original links.
- Record and save the number of accesses to the shortened URLs.

The goal is to demonstrate good development practices, including:
- Code organization in MVC architecture and separation of responsibilities.
- Centralized error handling with middleware.
- Basic security, such as sanitization of user input.

## Architecture

The project follows the MVC (Model-View-Controller) architecture, structured as follows:

- **Models:** Define the data models using Sequelize, including the `Url` table with the `originalUrl`, `code` and `accessCount` fields.
- **Controllers:** Contain the business logic, including:
- Shorten URLs (`shortenUrl`).
- Redirect to original URLs (`redirectUrl`).
- **Routes:** Map routes to controllers.
- **Middleware:** Includes middleware for centralized error handling and IP shortening limiter.
- **Utils:** Contains auxiliary functions, such as URL validation and generation of unique codes.

### Folder structure:
```plaintext
URLshortener/
├── frontend/
│ ├── css/
│ │ ├── styles.css
│ │ └── styles.css.map
│ ├── js/
│ │ └── script.js
│ ├── scss/
│ │ └── styles.scss
│ └── index.html
├── url-shortener-backend/
│ ├── config/
│ │ └── database.js
│ ├── controllers/
│ │ └── urlController.js
│ ├── middleware/
│ │ ├── errorHandler.js
│ │ └── rateLimiter.js
│ ├── models/
│ │ └── url.js
│ ├── node_modules/
│ ├── routes/
│ │ └── urlRoutes.js
│ ├── utils/
│ │ ├── CustomError.js
│ │ ├── generateCode.js
│ │ └── validateUrls.js
│ ├── .env
│ ├── app.js
│ ├── package-lock.json
│ └── package.json
```

## Technologies Used

- **HTML:** To develop the home page.
- **Javascript:** Taking care of the dynamics between the frontend and the backend.
- **SCSS:** To generate the initial CSS styling.
- **Node.js:** Runtime for the backend.
- **Express:** Framework to build the API.
- **Sequelize:** ORM for communicating with the database.
- **PostgreSQL:** Relational database used in the local environment.

## Dependencies

- **dotenv:** Environment variable management.
- **sanitize-html:** Sanitization of user input to prevent injections.
- **cors:** Enabling cross origin resource sharing for all sources.
- **express-rate-limit:** To limit the number of requests from the same origin.
- **helmet:** Handles request headers, with a standardized secure configuration.
- **morgan:** Applies custom and complete debug logs on the command line.
- **pg:** Postgres client for node.
- **valid-url:** Checks if the URL entered in the form is valid.
- **sass:** SASS initializer, as a development dependency.

## How to Run the Project

### Prerequisites
- Node.js installed (version 16 or higher).
- npm or yarn package manager.
- PostgreSQL installed.

### Step by Step

1. Clone the repository in any folder:
```bash
git clone https://github.com/Athen0001/urlrename.git
cd urlrename
cd url-shortener-backend
```

2. Install the dependencies (the node_modules folder will be created after the command):
```bash
npm install express sequelize dotenv sanitize-html cors express-rate-limit helmet morgan pg valid-url
```

3. Create a database in PostgreSQL.

4. Create a .env file in url-shortener-backend and set the environment variables:
```text
DB_NAME=database name
DB_USER=database administrator username
DB_PASSWORD=database password
DB_HOST=localhost for local servers
DB_PORT=5432 (default port for postgres)
BASE_URL=http:localhost:3000 (or another unused port)
PORT=3000
```

5. Start the server:
```bash
npm run start
```

6. Access http://localhost:3000 and test the application, enter a URL in the field and click "short", a line of text should return something like "http:localhost:3000/aUg60uiF".

7. Enter the new URL in the browser field and you should be redirected to the original URL page.

## Development Decisions

- **MVC architecture:** Chosen to separate responsibilities and facilitate maintenance.
- **Middleware error handling:** Centralized to reduce redundancy in controllers. The CustomError utility was kept as a class because it is encapsulated, being a class derived from the pure JavaScript error class, therefore, without major repercussions even though the project is mostly functional.
- **Input sanitization:** Implemented with `sanitize-html` and JavaScript to avoid HTML or JavaScript injections. Sequelize handles SQL injections.
- **Code collision:** A simple loop with verification was implemented, generating another code if the database returns a duplication error.
- **PostgreSQL database:** Chosen for its simplicity of installation and local use, given the personal purpose of the project.
- **Request limitation:** To prevent denial of service through the overload of requests coming from the same user.
- **Frontend with HTML, CSS and Javascript:** Given the simplicity of the project, with a single page, there was no reason to develop in more complex frameworks.

## Parts to Improve

- **Improve code collision checking:**
The application can receive 218 trillion codes in the database identifying the stored shortened URLs. 66,829 codes represent a 1% chance of collision, and above 1.4 million stored URLs, the chance of collision can reach 99% (according to the birthday paradox formula).
In case of scaling the application, the storage method, number of possible codes and collision mapping may need to be modified. Currently, a simple loop is used that catches a duplication error, letting the database handle the index mapping. In a high-scale environment, it would be better to use more complex algorithms such as hash mappings or similar.

- **Automated tests:**
The project does not yet have test coverage. It would be interesting to implement unit tests (e.g.: Jest) and integration tests.

- **Sanitization:**
Although there is prevention against SQL injection and XSS, the ideal would be to validate on the frontend, because depending on the way the API is distributed, it would be impossible to determine how each client would be manipulating the data (which language, whether or not they use raw queries), so the backend sanitization process could, in theory, be infinite.

- **Serving static files:**
Given an inconsistency and errors with the use of the static method of express, the backend is temporarily serving the static files from the frontend "manually" through routes.

## Final Considerations

This project was developed with the intention of demonstrating studies and practices of web development, not aiming at a robust application or with real applicability. Suggestions and criticisms are welcome!

Thank you for the opportunity to analyze my work.
