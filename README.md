# Boiler Plate Authentication App

#### Table of Contents

[Intro](#intro)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Get Started](#get-started)<br>
[Tech Stack](#tech-stack)<br>
[Features](#features)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Authentication](#authentication)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Password Validation](#password-validation)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Persisted Authentication](#persisted-authentication)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Protected Routed](#protected-routes)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Page not Found](#page-not-found)

# Intro

This project is based off of Ben Awads JWT authentication tutorial.

Code: https://github.com/benawad/jwt-auth-example

---

My goal with this project was have a fully functioning authentication app that I can clone in the future to jump start new projects.
Ben Awad's tutorial helped me learn how to assign and manage JWT tokens as well as gave me an introduction to graphql. I also implemented a nicer UI so I can start with an out of the box, good looking login and sign up page. Admittedly, I may have take some inspiration from Facebook's UI...

Feel free to use this project, provide me with suggestions or make a PR to improve this project.

## Get Started

1. Clone the project
2. cd into the root directory and run `yarn install`
3. Make sure you have postgres installed on your local machine
4. Create a .env file in the server directory and add the following environment variables

```
ACCESS_TOKEN_SECRET="your access token secret"
REFRESH_TOKEN_SECRET="your refresh token secret"
DB_USERNAME="username of owner of database"
DB_PASSWORD="password of owner of database"
DB_NAME="name of database"
```

## Token Management

The JWTs are managed in a way that tries to minimize the risk of [XSS](https://owasp.org/www-community/attacks/xss/) attacks. Instead of storing access tokens in local storage or cookies, they are stored in memory. Since the token is stored inside a memory variable, any malicious code injected into the website will not be able to make dangerous requests to the server on behalf of the authenticated user. However, this method makes it slightly more difficult to persist authentication across multiple sessions as access tokens are lost whenever the user leaves the page. To persist authentication, we store the refresh token in an httpOnly cookie. Every time the user first lands enters the React app, we grab a new access token and store it in a variable inside a useEffect.

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

# Features

## Authentication

- Automatic token refresh on start up if previously logged in
- Access token stored in memory to prevent against malicious attacks

## Password validation

- Password validator class for password validation
  - [PasswordValidator](https://github.com/evanwechsler/JWT-Starter-App/blob/master/web/src/auth/validators/passwordValidator.ts)
- Multiple levels of validation
  1.  No restrictions
  2.  Length requirement
  3.  Contains lowercase letters
  4.  Contains uppercase letters
  5.  Contains digits
  6.  Contains special characters
- Password confirmation to ensure no mistyped passwords
- Sign Up demo:
  ![Sign Up demo](https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/sign-in.gif)

## Persisted Authentication

- After logging in, authentication is persisted over multiple session until refresh token expires or the user logs out.
- Login demo:
  ![Login demo](https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/login.gif)

## Protected Routes

- Certain pages are only accessible once logged in
  ![Protected routes demo](https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/protected-routes.gif)

## Page Not Found

- If logged in and use tries to navigate to a page that does not exists, they reach an error page
  ![Page not found demo](https://github.com/evanwechsler/JWT-Starter-App/blob/master/documentation/assets/page-not-found.gif)
