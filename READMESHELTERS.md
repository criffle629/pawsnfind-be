## Endpoints

#### Shelter Routes

| Method | Endpoint                                   | Access Control | Description                                           |  Required                |
| ------ | -------------------------------------------| -------------- | ------------------------------------------------------|--------------            |         
| GET    | `/api/shelters/`                           | ?              | Returns all the shelters.                             |                          |
| GET    | `/api/shelters/:id`                        | ?              | Returns a shelter by an ID                            |   shelter_id             |
| GET    | `/api/shelters/:id/contacts`               | ?              | Return all the shelter contacts by shelter ID.        |   shelter_id             |
| GET    | `/api/shelters/contact/:id`               | ?              | Returns a shelter contact by Id.                      |  contact_id              |
| GET    | `/api/shelters/:id/locations`              | ?              | Return all the shelter locations by shelter ID.       |   shelter_id             |
| GET    | `/api/shelters/location/:id`              | ?              | Returns a shelter location by Id.                     |    location_id           |
| GET    | `/api/shelters/:id/users`                  | ?              | Returns all the shelter users  based on their rold id |     shelter_id           |
| GET    | `/api/shelters/follows/:id/:userId` | ?              | Returns a user following a shelter                   |   shelter_id,user_id     |
| GET    | `/api/shelters/:id/follows`                | ?              | Return all the users following a shelter .            |   shelter_id             |
| POST   | `/api/shelters/:id/location`               | ?              | Add a location for a shelter.                         |    shelter_id, nickname,street_address,city,state_id,zipcode,phone_number,shelter_contact_id            |
| PUT    | `/api/shelters/location/:locationId`   | ?              | Update a location of a shelter.                       |  shelter_id,location_id,nickname,street_address,city,state_id,zipcode,phone_number,shelter_contact_id  |
| DELETE | `/api/shelters/location/:locationId`   | ?              | Delete a shelter location for a shelter.              |  shelter_id,location_id  |
| POST   | `/api/shelters/:id/contact`                | ?              | Add a contact for a shelter.                          |    shelter_id,name,email,phone            |
| PUT    | `/api/shelters/contact/:contactId`     | ?              | Update a contact of a shelter.                        |  shelter_id,contact_id,name,email,phone    |
| DELETE | `/api/shelters/contact/:contactId`     | ?              | Delete a shelter contact for a shelter.               |  shelter_id,contact_id   |


# Data Model

#### SHELTERS

---

```
{
  id: INTEGER
  shelter: STRING
  is_upgraded: BOOLEAN
  EIN: STRING
  created_at: TIMESTAMP
  shelter_location_id: INTEGER
  shelter_contact_id: INTEGER
}
```

#### SHELTER_FOLLOWS

---

```
{  
  shelter_id: INTEGER foreign key in SHELTERS table
  user_id: INTEGER  
}
```

#### SHELTER_LOCATIONS

---

```
{
  id: INTEGER
  shelter_id: INTEGER foreign key in SHELTERS table
  street_address: STRING
  city: STRING
  zipcode: STRING
  state_id: INTEGER
  phone_number: STRING
  nickname: STRING
  shelter_contact_id: INTEGER
  created_at: TIMESTAMP
}
```

#### SHELTER_USERS

---

```
{ 
  id: INTEGER
  role_id: INTEGER 
  shelter_id: INTEGER foreign key in SHELTERS table
  username: STRING
  created_at: TIMESTAMP  
}
```

#### SHELTER_CONTACTS

---

```
{ 
  id: INTEGER
  shelter_id: INTEGER foreign key in SHELTERS table
  name: STRING
  email: STRING
  phone: STRING  
}
```

## Models

`getAllShelters()` -> Returns all shelters

`searchShelter(filter)` -> search the Shelter Table

`getById(shelterId)` -> Returns a single shelter by shelter ID

`getShelterLocation(shelterId)` -> Returns a single location by shelter ID

`getShelterFollows(shelterId)` -> Returns all users following a shelter based on shelter ID

`addShelter(shelter)` -> Add a new Shelter

`updateShelter(shelterId, changes object)` -> Updates a single shelter by shelter ID

`deleteShelter(shelterId)` -> Delete a shelter by ID
<br>
<br>
<br>
`getUsersByShelterId(shelterId)` -> Returns all shelter users by shelter ID

`getByRoleId(roleId)` -> Returns all shelter users by role ID

`getByShelterRoleId(shelterId,roleId)` -> Returns all shelter users based on shelter ID and role ID

`addShelterUsers(user)` --> Creates a new Shelter user and returns that user.

`deleteShelterUser(shelterId,roleId)` -> deletes everything based on shelter ID and role ID
<br>
<br>
<br>
`getAllShelterLocations()` -> Returns all shelter locations

`searchShelterLocations(roleId)` -> search the Shelter locations Table

`getByShelterLocationId(shelterLocationId)` -> Returns a single shelter location by shelter ID

`getLocationByShelterId(shelterId)` -> Returns all shelter locations by shelter ID 

`addShelterLocations(shelter)` -> Add a new Shelter location

`updateShelterLocations(shelterId, changes object)` -> Updates a single shelter location by shelter ID

`deleteShelterLocations(shelterLocationId)` -> Delete a shelter location by ID
<br>
<br>
<br>
`getUsersFollowsByShelterId(shelterId)` -> Returns all shelter users who follows a shelter by shelter ID

`getByUserFollowId(userId)` -> Returns a shelter user who follows a shelter by shelter ID

`getFollowsByIds(shelterId,userId)` -> Returns a users who follows a shelter based on shelter ID and user ID

`addShelterFollows(user)` --> Creates a new user who follows the shelter and returns that user.

`deleteShelterFollows(shelterId,userId)` -> deletes a user who follows the shelter based on shelter ID and user ID
<br>
<br>
<br>
`getAllShelterContacts()` -> Returns all shelter contact

`searchShelterContacts(roleId)` -> search the Shelter contacts Table

`getByShelterContactId(shelterContactId)` -> Returns a single shelter contact by shelter ID

`getContactByShelterId(shelterId)` -> Returns all shelter contacts by shelter ID 

`addShelterContacts(shelter)` -> Add a new Shelter contact

`updateShelterContacts(shelterId, changes object)` -> Updates a single shelter contact by shelter ID

`deleteShelterContacts(shelterContactId)` -> Delete a shelter contact by ID

