# Documentos
[![Build Status](https://travis-ci.org/andela-rbabalola/documentos.svg?branch=deployment-branch)](https://travis-ci.org/andela-rbabalola/documentos)
[![Coverage Status](https://coveralls.io/repos/github/andela-rbabalola/documentos/badge.svg?branch=develop)](https://coveralls.io/github/andela-rbabalola/documentos?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-rbabalola/documentos/badges/gpa.svg)](https://codeclimate.com/github/andela-rbabalola/documentos)

Documentos is a full stack application based on a RestFUL API that allows users to create and manage documents by giving different priviledges and rights to documents they create based on user roles.

## Technologies Used for the app
- NodeJS
- React/Redux
- Express
- Sequelize ORM
- PostgreSQL

#### Features of the application
*   Create an account
*   Login with your credentials
*   Create new document with specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   Search users public documents.
*   Logout

-   In addition the functions listed above the Superadmin can do the following
    -   View all documents regardless of the priviledge set (public, private and role).
    -   Create, edit and delete a role.
    -   View all roles
    -   View all users
    -   Search all documents

## Using the application

#### Online
This application is hosted on Heroku and can be accessed through this [link](https://documentos-app.herokuapp.com/)

#### Local Installation
Before you install the app locally, ensure you have [NodeJS](https://nodejs.org/en/#) and [PostgreSQL](https://www.postgresql.org/) installed on your computer.

##### Procedure
- Clone this repo from your terminal
```
git clone https://github.com/andela-rbabalola/documentos.git
```
- Move into the project directory
```
cd Documentos
```
- Install project dependencies
```
npm install
```
- Create a `.env` file in your root directory as described in `.envsample` file

- Start the app by running `npm start`

#### Setting up your database
- Run `sequelize db:migrate` to run migrations.
- Seed the database with `sequelize db:seed:all`.

This seeds the `Users` table with a SuperAdmin user with the following credentials
  - `email`: rotimi@gmail.com
  - `password`: rotimi123

And the `Roles` Table with the following credentials
  - SuperAdmin
  - Admin
  - Guest
  - User

This configuration can be changed in the seeders file

#### Testing the app
- Run `npm test` to test the app

# API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

#### Authentication
Users are issued a token when they signup or signin. This token is needed for subsequent HTTP requests to the API for authentication and can be attached as values to the header's `x-access-token` key. API requests made to authenticated endpoints without authentication will fail.

## Below are the API endpoints and their functions

#### Users
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/users/signin         |   Logs in a user.
POST /api/users/logout        |   Logs out a user.
POST /api/users/              |   Creates a new user.
GET /api/users/               |   Gets all users (available to only the SuperAdmin and Admin).
GET /api/users/:id           |   Finds user by id.
PUT /api/users/:id           |   Updates a user's attributes based on the id specified (available to only the SuperAdmin and Admin)
DELETE /api/users/:id        |   Deletes user (available only to the SuperAdmin)
PUT /api/users/updateRole/:id  | Updates a user's roleId (available only to the SuperAdmin)
GET /api/users/?limit={integer}&offset={integer}| Pagination for viewing users
POST /api/createadmin          | Creates an Admin user (available only to the SuperAdmin)
POST /api/search/users/?q=${query} | Gets all users with first name, last name or email containing the query

#### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/documents/          |   Creates a new document instance.
GET /api/documents/           |   Gets all documents.
GET /api/documents/:id       |   Find document by id.
PUT /api/documents/:id       |   Updates a document attributes.
GET /api/documents/user/:id            | Gets all documents for a user
DELETE /api/documents/:id    |   Delete document.
GET /api/documents/user/:id |   Find all documents belonging to the user.
GET /api/search/documents/?q=${query} | Get all documents with title containing the search query
GET /api/documents/role        | Gets documents with role access
POST /api/documents/search/user/:id      | Search documents belonging to a particular user
GET /api/pagination/documents/?limit=${integer}&offset=${integer} | Pagination for documents

#### Roles
EndPoint                      |   Functionality
------------------------------|------------------------
GET /api/roles/               |   Get all Roles.
POST /api/roles/               |   Create a Role.
PUT /api/roles/:id               |   Edit a Role.
DELETE /api/roles/:id               |   Delete a Role.

It should be noted that the endpoints for roles here are only available to the SuperAdmin.


## Example Requests and Expected Responses

### Role
#### Create a role
- `POST /api/roles`
- Requires: SuperAdmin Authentication
#### HTTP Response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "id": "2",
  "title": "Admin",
  "createdAt": "2017-04-04T14:22:46.984z",
  "updatedAt": "2017-04-04T14:22:46.984z"
}
```

#### Get all roles
- `GET /api/roles`
- Requires: SuperAdmin Authentication
#### HTTP Response
-   HTTP Status: `200: OK`
-   JSON data
```json
[
  {
  "id": "1",
  "title": "SuperAdmin",
  "createdAt": "2017-04-04T14:22:46.984z",
  "updatedAt": "2017-04-04T14:22:46.984z"
  },
  {
  "id": "2",
  "title": "Admin",
  "createdAt": "2017-04-04T14:22:47.984z",
  "updatedAt": "2017-04-04T14:22:47.984z"
  },
  {
  "id": "3",
  "title": "User",
  "createdAt": "2017-04-04T14:22:48.984z",
  "updatedAt": "2017-04-04T14:22:48.984z"
  },
  {
  "id": "4",
  "title": "Guest",
  "createdAt": "2017-04-04T14:22:49.984z",
  "updatedAt": "2017-04-04T14:22:49.984z"
  }
]
```

#### Edit a role
- `PUT /api/roles/:id`
- Requires SuperAdmin authentication
#### HTTP Response
-   HTTP Status: `201: OK`
-   JSON data
```json
{
  "message": "Role 3 successfully updated"
}
```

#### Delete a role
- `DELETE /api/roles/:id`
- Requires SuperAdmin authentication
#### HTTP Response
- HTTP Status: `201: OK`
- JSON data
```json
{
  "message": "Role successfully deleted"
}
```

### Users

#### Create a user
-   `POST /api/users`
    #### HTTP response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "message": "New user created",
  "newUser": {
    "id": "3",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@gmail.com",
    "roleId": "3",
    "createdAt": "2017-04-04T14:22:46.984z",
    "updatedAt": "2017-04-04T16:22:46.984z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsIlJvbGVJZCI6MSwiZW1haWwiOiJyb3RpbWlAZ21haWwuY29tIiwiaWF0IjoxNDkxNDcwODY4LCJleHAiOjE0OTE3MzAwNjh9.6_KF0uNeiWQdD8hLOgRnSlWOrFVX27Ks4YSCaCFRpkw",
    "expiresIn": "3 days"
}
```
#### Login
-   `POST /api/users/login`
    #### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "message": "Signin successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsIlJvbGVJZCI6MSwiZW1haWwiOiJyb3RpbWlAZ21haWwuY29tIiwiaWF0IjoxNDkxNDcwODY4LCJleHAiOjE0OTE3MzAwNjh9.6_KF0uNeiWQdD8hLOgRnSlWOrFVX27Ks4YSCaCFRpkw",
  "email": "johndoe@gmail.com",
  "success": true
}
```

#### Get all Users
-   `GET /api/users`
    #### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
[
  {
  "id": "2",
  "firstName": "John",
  "username": "Doe",
  "email": "johndoe@gmail.com",
  "password": "password",
  "roleId": "3",
  "createdAt": "2017-04-04T14:22:46.984z",
  "updatedAt": "2017-04-04T16:22:46.984z"
  },
  {
  "id": "2",
  "firstName": "Jane",
  "username": "Doe",
  "email": "janedoe@gmail.com",
  "password": "password",
  "roleId": "3",
  "createdAt": "2017-04-04T14:22:46.984z",
  "updatedAt": "2017-04-04T16:22:46.984z"
  }
]
```

### Documents
#### Create a document
-   `POST /api/documents/`
    #### HTTP response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "id": "1",
  "title": "My First Journal",
  "docContent": "This is my first entry in my online journal",
  "access": "public",
  "userId": "1",
  "createdAt": "2017-04-05T14:22:46.984z",
  "updatedAt": "2017-04-05T14:22:46.984z"
}
```

#### Get all documents
-   `GET /api/documents/`
    #### HTTP response
-   HTTP Status: `200: 0k`
-   JSON data
```json
[
  {
  "id": "1",
  "title": "My First Journal",
  "docContent": "This is my first entry in my online journal",
  "access": "public",
  "userId": "1",
  "createdAt": "2017-04-05T14:22:46.984z",
  "updatedAt": "2017-04-05T14:22:46.984z"
  },
  {
  "id": "2",
  "title": "My Second Journal",
  "docContent": "This is my second entry in my online journal",
  "access": "private",
  "userId": "1",
  "createdAt": "2017-04-05T14:22:46.984z",
  "updatedAt": "2017-04-05T14:22:46.984z"
  }
]
```

#### Get a particular document
-   `GET /api/documents/:id`
    #### HTTP response
-   HTTP Status: `200: 0K`
-   JSON data
```json
{
  "id": "1",
  "title": "My First Journal",
  "docContent": "This is my first entry in my online journal",
  "access": "public",
  "userId": "1",
  "createdAt": "2017-04-05T14:22:46.984z",
  "updatedAt": "2017-04-05T14:22:46.984z"
}
```

#### Update a document
-   `PUT /api/documents/:id`
    #### HTTP response
-   HTTP Status: `200: 0K`
-   JSON data
```json
{
  "message": "Document successfully updated"
}
```

#### Delete a document
- `DELETE /api/documents/:id`
   ####  HTTP response
- HTTP Status: `201: OK`
- JSON data
```json
{
  "message": "Document successfully deleted"
}
```

#### Search Documents
- `GET /api/search/documents/?q=${query}`
  #### HTTP response
- HTTP Status: `201 OK`
- JSON data
```json
[
  {
    "id": "1",
    "title": "My First Journal",
    "docContent": "This is my first entry in my online journal",
    "access": "public",
    "userId": "1",
    "createdAt": "2017-04-05T14:22:46.984z",
    "updatedAt": "2017-04-05T14:22:46.984z"
  }
]
```
