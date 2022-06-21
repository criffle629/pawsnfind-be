## Endpoints

#### User Routes

| Method | Endpoint                       | Access Control | Description                                  | Required                     |
| ------ | ------------------------------ | -------------- | -------------------------------------------- | ---------------------------- |
| GET    | `/api/users`                   | ?              | Returns all users in system.                 |                              |
| GET    | `/api/users/:id`               | ?              | Returns a user given an user id.             | id                           | 
| GET    | `/api/users/:id/complete`      | ?              | Returns complete user data given an user id. | id                           | 
| GET    | `/api/users/username/:username`| ?              | Returns a user given a username.             | username                     |
| GET    | `/api/users/email/:email`      | ?              | Returns a user given an email.               | email                        |
| GET    | `/api/users/sub/:sub_id`       | ?              | Returns a user given a sub id.               | sub_id                       |
| POST   | `/api/users/`                  | ?              | Add a new user.                              | email, sub_id, username      |
| PUT    | `/api/users/:id`               | ?              | Update a user's information.                 | id                           |
| DELETE | `/api/users/:id`               | ?              | Delete a user.                               | id                           |

#### User Meta Routes

| Method | Endpoint                              | Access Control | Description                                 | Required                |
| ------ | ------------------------------------- | ------------   | ------------------------------------------- | ----------------------- |
| GET    | `api/users/meta/:id`                  | ?              | Returns user meta given id.                 | id                      |
| GET    | `api/users/:user_id/meta`             | ?              | Returns user meta given user id.            | user_id                 |
| GET    | `api/users/meta/state/:state_id`      | ?              | Returns user metas given state id.          | state_id                |
| GET    | `api/users/meta/suid/:shelter_user_id`| ?              | Returns user metas given shelter user id.   | shelter_user_id         |
| GET    | `api/users/meta/num/:phone_number`    | ?              | Returns user metas given phone number.      | phone_number            |
| GET    | `api/users/meta/zip/:zip`             | ?              | Returns user metas given zip code.          | zip                     |
| GET    | `api/users/meta/city/:city`           | ?              | Returns user metas given city.              | city                    |
| POST   | `/api/users/meta`                     | ?              | Creates a new user meta.                    | user_id, shelter_user_id, state_id|
| PUT    | `/api/users/meta/:id`                 | ?              | Updates a user meta.                        | id                      |
| DELETE | `/api/users/meta/:id`                 | ?              | Deletes a user meta.                        | id                      |

# Data Model

#### USERS

---

```
{
  id: UUID
  email: STRING
  sub_id: INTEGER
  username: BOOLEAN
  created_at: STRING
}
```

#### USER_META

---

```
{
  id: UUID
  user_id: UUID foreign key in USERS table
  phone_number: STRING
  name: STRING
  street_address: STRING
  city: STRING
  state_id: UUID foreign key in STATES table
  zip: STRING
  shelter_user_id: UUID foreign key in SHELTER_USERS table
}
```

## Actions

`getUsers()` -> Returns all users

`getUserById(id)` -> Returns a single user by ID

`getCompleteUserDataById(id)` -> Returns complete user data for a single user by ID

`getUserByUsername(username)` -> Returns a single user by username

`getUserByEmail(email)` -> Returns a single user by email

`getUserBySubId(sub_id)` -> Returns a single user by sub id

`createUser()` -> Returns the created user

`updateUser(id)` -> Update a user by ID

`deleteUser(id)` -> Delete a user by ID
<br>
<br>
<br>
`getUserMetaById(id)` -> returns a user meta by ID

`getUserMetaByUserId(user_id)` -> Returns a user meta by user ID

`getUserMetaByStateId(state_id)` -> Returns a user meta by state ID

`getUserMetaByShelterUserId(shelter_user_id)` -> Returns a user meta by shelter user ID

`getUserMetaByPhoneNumber(phone_number)` -> Returns user meta by phone number

`getUserMetaByZip(zip)` -> Returns user meta by zip

`getUserMetaByCity(city)` -> Returns user meta by city

`createUserMeta()` --> Creates a new user meta and returns it. 

`updateUserMeta(id, changes)` -> Updates a single user meta by ID.

`deleteUserMeta(id)` -> deletes user meta by ID

