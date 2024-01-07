# TodoRESTapi

## Overview

This repository contains a simple Todo REST API built using JavaScript, Node.js, Express, and MongoDB. The API allows users to manage their todo list, including creating, updating, deleting, and fetching tasks.

## Features

- **Create**: Add new tasks to the todo list.
- **Read**: Retrieve a list of all tasks or a specific task.
- **Update**: Modify task details or mark tasks as completed.
- **Delete**: Remove tasks from the todo list.

## Technologies Used

- **JavaScript**: The primary programming language.
- **Node.js**: The server-side JavaScript runtime.
- **Express**: A fast and minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database used for storing todo tasks.

## API Endpoints

- **POST /tasks**: Create a new task.
- **GET /tasks**: Get all tasks.
- **GET /tasks/:taskId**: Get a specific task by ID.
- **GET /tasks/complete**: Get all completed tasks.
- **GET /tasks/incomplete**: Get all incomplete tasks.
- **PATCH /tasks/:taskId**: Update a task by ID.
- **DELETE /tasks**: Delete all tasks.
- **DELETE /tasks/:taskId**: Delete a task by ID.
