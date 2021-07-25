# Boiler Plate Authentication App
# Intro
This project is heavily based off of Ben Awads JWT authentication tutorial.

Code: https://github.com/benawad/jwt-auth-example
***

My goal with this project was have a fully functioning authentication app that I can clone in the future to jumpstart new projects.
Ben Awad's tutorial helped me learn how to assign and manage JWT tokens as well as gave me an introduction to graphql. I also implemented a nicer UI so I can start with an out of the box, good looking login and sign up page. Admitidly, I may have take some inspiration from Facebook's UI...

To get started:
1. Clone the project
2. cd into the root directory and run `yarn install`
3. Make sure you have postgres installed on your local machine
4. Create a .env file in the root directory and add the following environment variables
  ```
  ACCESS_TOKEN_SECRET="your access token secret"
  REFRESH_TOKEN_SECRET="your refresh token secret"
  DB_USERNAME="username of owner of database"
  DB_PASSWORD="password of owner of database"
  DB_NAME="name of database"
  ```
  # Tech Stack
  <div>
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/react.png" width="100" />
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/Typescript.svg" width="100" /> 
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/typeorm.png" width="100" />
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/apollo-graphql.svg" width="100"/>
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/postgres.png" width="100"/>
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/jwt.svg" width="100"/>
    <img src="https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/graphql.png" width="100"/>
  </div>
  
  1. Typescript
  2. React
  3. JWT
  4. Typeorm
  5. Apollo
  6. Graphql
  7. Postgres
