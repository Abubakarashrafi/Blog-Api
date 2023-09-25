
# Blog API

This repository contains the code for a Blog API, which provides backend functionality for managing and accessing blog-related data.

## Tech Stack


- Node.js
- Express.js
- MongoDB 
- JSON Web Tokens (JWT) for authentication
- Bcrypt js

## Features

- Create, read, update, and delete blog posts.
- User authentication and authorization.
- Secure API endpoints.

## Run Locally

Clone the project


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Endpoints of Blogs

#### Create Blog

```http
  POST /create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nil` | `string` | **Required**. Title, desription, categories |

#### Get all Blog

```http
  GET /blogs
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nil`      | `string` | **Required**. nil |

#### Get specific Blog 

```http
  GET /blogs/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of blogPost |


#### Update Blog 

```http
  UPDATE /update/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blogpost |

#### Delete Blog

```http
  DELETE /delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blogpost |

## API Endpoints of Authentication

#### Register User

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nil` | `string` | **Required**. Email, Username, Password |

#### login user

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nil`      | `string` | **Required**. Email, password |

## API Endpoints of User

#### Get User

```http
  GET /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nil` | `string` | **Required**. nil|

#### Get Specific User

```http
  GET /user/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of user |

#### Update User Detail

```http
  PATCH /update/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Email, password |

#### Delete User 

```http
  DELETE /delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of user |


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub flow:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature/your-feature.
3. Make your changes and commit them: git commit -m "Your message".
4. Push your branch to your fork: git push origin feature/your-feature.
5. Create a pull request on the original repository.