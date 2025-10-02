# TTSS - TODO List App : Requirements
## Login (Additional challenge)
  - Use username and password to authenticate.
  - If authenticated passed, response HTTP body with access-token and HTTP Only cookie with refresh-token.
    - Access token
      - Use access-token to manage resource. (expired in 15 minutes)
      - Endpoint GET /refresh
    - Refresh token
      - Use refresh-token to get new access-token. (expired in 7 weeks)
      - Endpoint POST /login
  - If authenticated failed, response error message.
#### Services & Endpoints
    - POST /login : Just login :D

## Register (Additional challenge)
  - Required to specify username and password with confirm password to confirm to create user. (Confirm password on client-side)
#### Services & Endpoints
    - POST /register : Just register 😃.

## Refresh Token (Additional challenge)
  - Required refresh token from client (HttpOnly cookie) to get new access token.
#### Services & Endpoints
    - POST /refresh : Just register 😃.

## Entities
### Todo
| Field         | DataType | Reference     | Rules               |
|---------------|----------|---------------|---------------------|
| id            | uuid     |               | primary key         |
| title         | string   |               | default: "Untitled" |
| content       | string   |               |                     |
| is_done       | boolean  |               | required            |
| user_id       | uuid     | user.id       | required            |
| created_at    | datetime |               | required            |
| updated_at    | datetime |               |                     |

#### Services & Endpoints (Required access-token)
    - GET /todos : Get all in-session user todos.
    - GET /todos/:id : Get in-session user todo by id.
    - POST /todos : Create todo of in-session user.
    - PUT /todos/:id : Update in-session user todo by id.
    - DELETE /todos/:id : ***Hard delete*** in-session user todo by id.

### User (Hard deletion)
#### Schema
| Field           | DataType | Reference     | Rules               |
|-----------------|----------|---------------|---------------------|
| id              | uuid     |               | primary key         |
| username        | string   |               | required            |
| hashed_password | string   |               | required            |
| created_at      | datetime |               | required            |
| updated_at      | datetime |               |                     |

#### Services & Endpoints (Required access-token)
    - GET /me : Get in-session user.
    - PUT /me : Update in-session user.
    - DELETE /me : ***Hard delete*** in-session user.