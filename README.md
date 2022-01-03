# Twit API

## Description
This is the backend service for Twit, a microblogging application that enables only authenticated users to perform CRUD operations on their posts. It is a GraphQL API that is built on top of [Node.js](https://nodejs.org/en/).

## Technologies 

The following technologies were used in this project:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Apollo Server](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
- [JSON Web Tokens](https://jwt.io/)


## Requirements

Before starting, you need to have [Node.js](https://nodejs.org/en/) installed. Also ensure to create a .env file in the root directory of the project, and provide the following information:

DATABASE_URL: The URI of your MongoDB database.
JWT_SECRET: The secret key used to sign the JWT.


Kindly ensure that you are in the root directory before running the following commands.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start