### Setup
- Install dependencies with `yarn install`
- Run docker-compose with `docker-compose up`
- Switch to the `server` directory and run `prisma migrate dev` to create the database schema
- Run the server with `yarn start:dev`
- Server will be running on `http://localhost:3232`
- Switch to the `frontend` directory and run `yarn dev`
- Frontend will be running on `http://localhost:3233`

There will be some initial data in the database, including a user with the following credentials:
- email: `test@user.me`
- password: `password`

Frontend has those credentials hardcoded, as I didn't have time to implement proper login form there.
DB Schema is deliberately made simple, in real life scenario there would be more tables and relations.
Comments are added in the code to explain some decisions and possible improvements.

### Environment variables
Default values are in `.env.development` file in both frontend and server directories.
Those can be overridden with `.env.development.local` if needed.

### Design patterns and decisions
Most effort has been put into backend code, as it was the main focus of the task.
Patterns used: 
- `Repository` pattern for database access. Right now it's a simple wrapper around `Prisma`, but it can be easily extended with more complex queries.
- `Strategy` pattern in the form of passport strategy. One possible use case could be `RecordingStrategy` which specifies how to write log updates to database, for example, `ImmediateWriteStrategy` which will write data right away, or `BatchWriteStrategy` which will keep update records in a memory buffer and write them all at once to improve performance.
- `Singleton` pattern, in particular for `PrismaClient` instance. In general NestJS favors singleton services, and all providers are singletons by default.
- `Observer` pattern, with help of NestJS's event emitter module. It is used to decouple interceptor from storing logs to database, and also allow to easily extend adding more event types and listeners.
- `Interceptor` pattern, leveraging built-in support in NestJS. 

### Testing
Postman collection is included in the root directory, with some basic tests for all endpoints.

### TODO
Some parts what are crucial to be done, but not implemented:
 - handle DB "not found" errors
 - handle controller errors in interceptor
 - proper authentication handle on frontend, with loading current user and store session. 
 - error handling on frontend
 - better display of updated fields on frontend, to clearly show what was updated
 - add pagination to collections endpoints