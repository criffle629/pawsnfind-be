
## Endpoints

### Internal Routes

### Ages Table

`/api/internal/paws/ages`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all age info                              |
| GET    | `/:id`                  | Developers          | Returns age info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new age record                          |
| PUT    | `/:id`                  | Developers          | Edits an age record                               |
| DELETE | `/:id`                  | Developers          | Deletes an age record                             |

```
{
  "id": "UUID pKey auto required",
  "age": "STRING Unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single age by ID

`getBy(filter)` -> Search items by chosen field

`add(age)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Animal Status Table

`/api/internal/paws/animal_status`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all animal status info                              |
| GET    | `/:id`                  | Developers          | Returns animal status info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new animal status record                          |
| PUT    | `/:id`                  | Developers          | Edits an animal status record                               |
| DELETE | `/:id`                  | Developers          | Deletes an animal status record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "animal_status": "STRING unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single animal status by ID

`getBy(filter)` -> Search animal status by chosen field 

`add(status)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Application Status Table

`/api/internal/paws/application_status`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all application status info                              |
| GET    | `/:id`                  | Developers          | Returns application status info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new application status record                          |
| PUT    | `/:id`                  | Developers          | Edits an application status record                               |
| DELETE | `/:id`                  | Developers          | Deletes an application status record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "application_status": "STRING unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single application status by ID

`getBy(filter)` -> Search an item by chosen field 

`add(status)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Breeds Table

`/api/internal/paws/breeds`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all breeds info                              |
| GET    | `/:id`                  | Developers          | Returns breeds info for particular id.               |
| GET    | `/species/:id`          | Developers          | Returns breeds info for specified species id.       |
| POST   | `/`                     | Developers          | Creates a new breed record                          |
| PUT    | `/:id`                  | Developers          | Edits a breed record                               |
| DELETE | `/:id`                  | Developers          | Deletes a breed record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "species_id": "fKey-species integer",
  "breed": "STRING unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single breed by ID

`getBySpeciesId(species_id)` -> Returns all breeds for the specified species ID

`getBy(filter)` -> Search item by chosen field 

`add(status)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Coat Length Table

`/api/internal/paws/coat_length`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all coat length info                              |
| GET    | `/:id`                  | Developers          | Returns coat length info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new coat length record                          |
| PUT    | `/:id`                  | Developers          | Edits a coat length record                               |
| DELETE | `/:id`                  | Developers          | Deletes a coat length record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "coat_length": "STRING Unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single coat length by ID

`getBy(filter)` -> Search item by chosen field

`add(length)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Roles Table

`/api/internal/paws/roles`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all roles info                              |
| GET    | `/:id`                  | Developers          | Returns roles info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new roles record                          |
| PUT    | `/:id`                  | Developers          | Edits a roles record                               |
| DELETE | `/:id`                  | Developers          | Deletes a roles record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "roles": "STRING Unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single role by ID

`getBy(filter)` -> Search item by chosen field

`add(role)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---


### Size Table

`/api/internal/paws/size`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all size info                              |
| GET    | `/:id`                  | Developers          | Returns size info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new size record                          |
| PUT    | `/:id`                  | Developers          | Edits a size record                               |
| DELETE | `/:id`                  | Developers          | Deletes a size record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "size": "STRING Unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single size by ID

`getBy(filter)` -> Search item by chosen field

`add(size)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Species Table

`/api/internal/paws/species`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all species info                              |
| GET    | `/:id`                  | Developers          | Returns species info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new species record                          |
| PUT    | `/:id`                  | Developers          | Edits a species record                               |
| DELETE | `/:id`                  | Developers          | Deletes a species record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "species": "STRING Unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single species by ID

`getBy(filter)` -> Search item by chosen field

`add(species)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### States Table

`/api/internal/paws/states`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all state info                             |
| GET    | `/:id`                  | Developers          | Returns state info for particular id.              |
| POST   | `/`                     | Developers          | Creates a new state record                         |
| PUT    | `/:id`                  | Developers          | Edits a state record                               |
| DELETE | `/:id`                  | Developers          | Deletes a state record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "state": "STRING Unique required"
}

```
#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a single state by ID

`getBy(filter)` -> Search item by chosen field

`add(state)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---

### Subscriptions Table

`/api/internal/paws/subscriptions`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all subscription info                       |
| GET    | `/:id`                  | Developers          | Returns subscription info for particular id.               |
| POST   | `/`                     | Developers          | Creates a new subscription record                          |
| PUT    | `/:id`                  | Developers          | Edits a subscription record                               |
| DELETE | `/:id`                  | Developers          | Deletes a subscription record                             |

#### Data Model

```
{
  "id": "UUID pKey auto required",
  "subscription": "STRING Unique required",
  "subscription_duration_mo": "INTEGER required",
  "price": "DECIMAL required"
}

```

---

### Options Table

`/api/internal/paws/options`  

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | Developers          | Returns all options                                |

#### Actions

`getAll()` -> Returns all items

`getById(id)` -> Returns a subscription length by ID

`getBy(filter)` -> Search item by chosen field

`add(subscription)` -> Returns the item created

`update(id, change)` -> Updates item by ID and returns confirmation count of updated item

`remove(id)` -> Deletes an item by ID and returns a confirmation count of items deleted

---
