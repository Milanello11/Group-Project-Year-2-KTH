Festival Booking System (Festis)

A Web-Based Festival Booking Prototype (KTH Project)

Overview

Festis is a web-based festival booking system prototype developed at the Royal Institute of Technology (KTH) in collaboration with Umain as part of the HI1039 Software Development Project course.

Created by a team of five students, the project applied agile methods and software engineering practices to design and implement a full-stack application. The system allows users to browse festivals, check ticket availability, book tickets, and manage accounts.

The project combines a React frontend, a Spring Boot REST API backend, and a PostgreSQL database to provide a responsive and interactive user experience.

System Concept

Festis provides a seamless, user-friendly way to explore festivals and handle bookings.

Users can view festival details, search by artist, name, date, or location, and manage personal bookings.

Administrators can add and update festivals and artists.

The system ensures real-time updates and maintains data integrity through a RESTful API connected to a PostgreSQL database.

Key Features

User Features: Account creation, login, browse/search festivals, book tickets, view past/upcoming bookings

Admin Features: Add/update festival and artist information

Backend Features: REST API with Spring Boot, MVC architecture, repository pattern for database access

Testing: Unit and integration tests with JUnit and MockMvc

Frontend Features: React SPA with TypeScript, Chakra UI, and Lucide icons; responsive and component-based

System Structure

Frontend: React, TypeScript, component-based SPA, communicates with REST API via Fetch

Backend: Java 21, Spring Boot, Spring Data JPA, MVC + Repository pattern

Database: PostgreSQL, managed via PgAdmin4 or neon.tech

Deployment: Frontend on Netlify, Backend on Render, database hosted on neon.tech

Development Process

Agile workflow (Scrum) with iterative sprints and user feedback

Version control: GitHub

Continuous deployment: Automated builds on push to main branch

Emphasis on modular design, maintainability, and test-driven development

Lessons & Future Work

Lessons learned:

Applying agile practices in a full-stack project

Building a React SPA communicating with a REST API

Integrating PostgreSQL with Java backend and ensuring data integrity

Writing unit and integration tests for robustness

Future improvements:

Enhanced search and filtering options

Improved admin dashboard with analytics

Email notifications and payment integration

Acknowledgment

Developed by a team of five students at KTH in collaboration with Umain.

Keywords: React · TypeScript · Java · Spring Boot · PostgreSQL · REST API · Full-Stack · KTH
