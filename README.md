# Cocktail API

**Please note:** Uses are allowed to create, update and delete cocktail recipes that persist in a free tier database. This comes with a limitation of 10 concurrent user pool connections. Each instance of the application initializes with a connection limit of 2. If you are recieving an error regarding the max_user_conections then the limit of 10 has been reached. Please see the 'Viewing the demo API and documentation' section for a demo application that is already initialized

## Running the API Locally
If you are trying to test or run locally and getting time out errors, please try to increase the connection limit in the database.js file to 5 maximum.

To run the api locally follow the steps below.
- Clone the project locally
- Run `npm install` at the root of the project to install dependencies
- Run `npm start` to start the service

## View Swagger Docs Locally
After you have successfully started the application:
- Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser view the API documentation and execute each API with an example parameter provided.
- Under the 'Servers' dropdown, select localhost.

## Running the tests
To test changes made to the api locally, run `npm test`.

## Viewing the demo API and documentation
For your convience, a deployed production instance of the api and swagger documentation is available at [https://webber-cocktail-api.herokuapp.com/api-docs](https://webber-cocktail-api.herokuapp.com/api-docs). You can execute all the API's from your browser without running the application locally.



