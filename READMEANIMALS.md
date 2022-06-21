

## Endpoints



#### Animals Routes

| Method | Endpoint                | Access Control | Description                                  | Required |
| ------ | ----------------------- | -------------- | -------------------------------------------- |----------
| GET    | `/api/animals`          | all users      | Returns all animals in system.               |
| GET    | `/api/animals/:id`      | all users      | Returns an animal given the animal Id.        | id |
| GET    | `/api/animals/:id/meta` | all users      | Returns animal meta information given the animal id   | id
| GET    | `/api/animals/:id/follows` | owners      | Returns all the followers of an animal given the animal id | id 
| GET    | `/api/animals/:id/notes` | owners        | Returns all the notes of the animal given the animal id | id 
| GET    | `/api/animals/shelter/:id` | all users   | Returns all animals of a specific shelter given the shelter id | shelter_id
| GET    | `/api/animals/meta/:id` | all users      | Returns the specific animal meta info given the meta id | meta_id
| POST   | `/api/animals`          | owners         | Add a new animal | animal_id, breed_id, is_mixed, age_id, health, size_id, color, coat_length_id, is_male, is_house_trained, is_neutered_spayed, is_good_with_kids, is_good_with_dogs, is_good_with_cats, is_vaccinated, description
| PUT    | `/api/animals/:id/meta/:metaId` | owners    | Updates an animal including the meta info | id, meta_id, animal_id, breed_id, is_mixed, age_id, health, size_id, color, coat_length_id, is_male, is_house_trained, is_neutered_spayed, is_good_with_kids, is_good_with_dogs, is_good_with_cats, is_vaccinated, description
| DELETE | `/api/animals/:id/meta/:metaId` | owners    | Deletes an animal including the meta info | id, meta_id


#### Animal Meta Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/api/animals/:id`      | all users           | Returns an animals meta information given the meta id | id


#### Animal Follows Routes

| Method | Endpoint                | Access Control | Description                                  | Required |
| ------ | ----------------------- | -------------- | -------------------------------------------- |----------
| GET    | `/api/animals/:id/follows` | owners     | Returns all followers of animal given the animal id   |
| GET    | `/api/animals/follows/:animalId/:userId` | owners      | Returns follower of an animal by animal id and the user by user id        | animal_id, user_id


#### Animal Admin Routes

| Method | Endpoint                | Access Control | Description                                  | Required |
| ------ | ----------------------- | -------------- | -------------------------------------------- |----------
| GET    | `/api/animals/admin`            | owners     | Returns the animal admin note given the admin Id | id 
| GET    | `/api/animals/:id/admin` | owners      | Returns all the admin notes given the animal id | animal_id
| GET    | `/api/animals/:animalId/admin/:adminId | owners | Returns the specific admin note of an animal given animal id and admin id
| POST   | `/api/animals/:id/admin` | owners      | Adds a new admin note given the animal id       | animal_id, notes, shelter_user_id
| PUT    | `/api/animals/:id/admin/:adminId` | owners | Updates an animal admin note given the animal id | admin_id, animal_id, notes, shelter_user_id
| DELETE | `/api/animals/:id/admin/:adminId` | owners | Deletes an animal admin note of a specific animal given the animal id and admin id | animal_id, id


# Data Model


####  ANIMALS

---

```
{
  id: UUID
  name: STRING
  shelter_id: INTEGER (foreign key referencing shelters table)
  species_id: INTEGER (foreign key referencing species table)
  animal_status_id: INTEGER (foreign key referencing animal_status table)
  shelter_location_id: INTEGER (foreign key referencing shelter_location table)
  profile_img_id: INTEGER
}
```

#### ANIMAL_META

---

```
{
  id: UUID
  animal_id: INTEGER (foreign key referencing animals table)
  breed_id: INTEGER (foreign key referencing breeds table)
  is_mixed: BOOLEAN 
  age_id: INTEGER (foreign key referencing ages table)
  health: STRING 
  size_id: INTEGER (foreign key referencing size table)
  color: STRING 
  coat_length_id: INTEGER (foreign key referencing coat_length table)
  is_male: BOOLEAN
  is_house_trained: BOOLEAN
  is_neutered_spayed: BOOLEAN
  is_good_with_kids: BOOLEAN
  is_good_with_dogs: BOOLEAN
  is_good_with_cats: BOOLEAN
  is_vaccinated: BOOLEAN
  description: STRING
}
```

#### ANIMAL_FOLLOWS

---

```
{
  animal_id: INTEGER (foreign key referencing animals table)
  user_id: INTEGER (foreign key referencing users table)
}
```

#### ANIMAL_ADMIN

---

```
{
  id: UUID
  notes: STRING 
  animal_id: INTEGER (foreign key referencing animals table)
  shelter_user_id: INTEGER (foreign key referencing shelter_users table)
}
```

##  Actions

`getAll()` -> Returns all animals

`getById(id)` -> Returns a single animal by animal Id

`getBy(filter)` -> Filter through the animals table

`getAnimalMetaById(id)` -> Returns the meta information by animal Id

`getAnimalFollowsById(id)` -> Returns the followers of animal by animal Id

`getNotesByAnimalId(id)` -> Returns all the notes of the animal by animal Id

`getAnimalsByShelterId(id)` -> Returns all the animals of a shelter by the shelter Id

`remove(id)` -> Deletes an animal by animal Id including animal meta

`update(id, changes)` -> Updates the changes made of an animal by animal Id including animal meta

`add(animal)` -> Adds a new animal including animal meta

`findMatch(animalId, metaId)` -> Verifies that there is an animalId and metaId match
<br>
<br>
<br>
`getById(id)` -> Returns the animal meta information by meta Id

`getBy(filter`) -> Filters through the animal meta table

`getByIds(animalId, metaId)` -> Get the animal that matches both the animalId and metaId

`remove(id`) -> Deletes an animal meta by the meta Id

`add(id)` -> Adds an animal meta by meta Id

`update(id)` -> Updates an animal meta by meta Id
<br>
<br>
<br>
`getByAnimalId(id)` -> Returns followers of animal by the animal Id

`getByIds(animalId, userId)` -> Returns the follower of an animal by animal Id and the user by the user Id
<br>
<br>
<br>
`getById(id)` -> Returns animal admin by admin Id

`getNotesByAnimalId(id)` -> Returns animal admin notes of an animal by animal Id

`add(note)` -> Adds a new admin note

`update(id, change)` -> Updates the change in admin note using the admin Id

`remove(id)` -> Deletes the animal admin note by admin Id

`getByIds(animalId, adminId)` -> Gets the animal admin note that matches both the animalId and adminId.

