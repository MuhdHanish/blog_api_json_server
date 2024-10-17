# Blog API JSONServer

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Request & Response Examples](#request--response-examples)
8. [Error Handling](#error-handling)
9. [Feedback](#feedback)
10. [Support](#support)

## Introduction

This project is a Node.js Express server acting as a proxy for a JSON Server, providing a RESTful API for managing blog posts. It offers a robust solution for creating, reading, updating, and deleting blog entries with custom error handling and logging.

## Features

- Full CRUD operations for blog posts
- Custom error handling with detailed error messages
- Error logging with stack traces for debugging
- CORS support for cross-origin requests
- TypeScript for type safety and better developer experience
- Integration with JSON Server for easy data persistence

## Prerequisites

- Node.js (version 14 or later recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MuhdHanish/blog_api_json_server.git
   cd blog_api_json_server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the JSON Server and Express server together:
   ```bash
   npm start
   ```

## Usage

1. If running JSON Server separately:
   ```bash
   json-server --watch db.json --port 3000
   ```

2. Start the Express server:
   ```bash
   npm run start:server
   ```

The server will run on `http://localhost:8000`.

## API Endpoints

- `GET /blogs`: Retrieve all blogs
- `GET /blogs/:id`: Retrieve a specific blog
- `POST /blogs`: Create a new blog
- `PUT /blogs/:id`: Update an existing blog
- `DELETE /blogs/:id`: Delete a blog

## Request & Response Examples

### GET /blogs

Response body:
```json
[
  {
    "id": "cf73",
    "title": "Introduction to Express.js",
    "content": "Express.js is a minimal and flexible Node.js web application framework...",
    "author": "John Doe",
    "createdAt": "2023-06-01T10:00:00Z",
    "updatedAt": "2023-06-01T10:00:00Z"
  }
]
```

### POST /blogs

Request body:
```json
{
  "title": "Getting Started with TypeScript",
  "content": "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...",
  "author": "Jane Smith"
}
```

Response body:
```json
{
  "id": "cf74",
  "title": "Getting Started with TypeScript",
  "content": "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...",
  "author": "Jane Smith",
  "createdAt": "2023-06-02T15:30:00Z",
  "updatedAt": "2023-06-02T15:30:00Z"
}
```

### PUT /blogs/:id

Request body:
```json
{
  "title": "Updated: Getting Started with TypeScript",
  "content": "TypeScript is a powerful typed superset of JavaScript...",
  "author": "Jane Smith"
}
```

Response body:
```json
{
  "id": "cf74",
  "title": "Updated: Getting Started with TypeScript",
  "content": "TypeScript is a powerful typed superset of JavaScript...",
  "author": "Jane Smith",
  "createdAt": "2023-06-02T15:30:00Z",
  "updatedAt": "2023-06-02T16:45:00Z"
}
```

### DELETE /blogs/:id

Request:
```
DELETE /blogs/cf74
```

Response:
```
Status: 204 No Content
```

## Error Handling

The API uses custom error handling. If an error occurs, the response will be in the following format:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

Errors are also logged to the console with stack traces for debugging purposes.

## Feedback

If you have any feedback, please reach me at [muhammedhanish11@gmail.com](mailto:muhammedhanish11@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/muhdhanish/).

## Support

Show your support by 🌟 starring the project!!