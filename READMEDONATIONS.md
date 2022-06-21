
## Endpoints

#### Donations

| Method | Endpoint                    | Access Control              | Description                                        | Required
| ------ | --------------------------- | --------------------------- | ---------------------------------------------------| ----------------------------------------------------|
| GET    | `/api/donations/`           | owner                       | Returns all donations                              |                                                     |
| GET    | `/api/donations/:id`        | owner shelter operator      | Returns donations by id                            |  id                                                 |
| GET    | `/api/donations/user/:id`   | owner, adopters             | Returns donations by user                          |   id                                                |
| GET    | `/api/donations/shelter:/id`| owner, shelter operators    | Returns donations for shelter                      |   id                                                |
| POST   | `/api/donations/`           | adopters                    | Makes a new donation                               | user_id, shelter_id, amount                         |
| PUT    | `/api/donations/:id`        | owners                      | Update existing donation                           |   user_id, shelter_id, amount                       |


| Method | Endpoint                        | Access Control              | Description                                        | Required
| ------ | ------------------------------- | --------------------------- | ---------------------------------------------------| ----------------------------------------------------|
| GET    | `/api/subscriptions/`           | owner                       | Returns all subscriptions                          |                                                     |
| GET    | `/api/subscriptions/:id`        | owner shelter operator      | Returns subscriptions by id                        | id                                                  |
| GET    | `/api/subscriptions/shelter:/id`| owner, shelter operator     | Returns subscription for shelter                   | id                                                  |
| GET    | `/api/subscriptions/level:/id`  | owner                       | Returns subscriptions by level                     | id                                                  |
| POST   | `/api/subscriptions/`           | shelter                     | Makes a new subscription                           | shelter_id, subscription_id, is_active              |
| PUT    | `/api/subscriptions/:id`        | owners                      | Update existing donation                           | shelter_id, subscription_id, is_active              |

# Data Model


#### SUBSCRIPTIONS

---

```

{
"id": UUID,
"shelter_id": STRING,
"subscription_id": STRING,
"is_active": BOOLEAN,
"created_at": "TIMESTAMP",
"expiration_date": "TIMESTAMP"
}

```

#### DONATIONS

---

```
{
"id": UUID,
"user_id": INTEGER,
"shelter_id": INTEGER,
"amount": DECIMAL,
"created_at": TIMESTAMP
}
```

## Actions

`getDonationsByUser(id)` -- returns donation by user id

`getDonationbyId(id)` - return donation by donation id

`getDonationsByShelter(id)` - return donation by shelter id

`getAllDonations`

`addDonation(donation)` - add donation by input field

`updateDonation(id,change)` - update donation by id

<br><br><br>
`getAllSubscriptions`

`getSubscriptionbyID(id)` -- returns donation by id

`getSubscriptionbyShelter(id)` -- returns donaiton by shelter id

`getSubscriptionbyLevel(id)`- get subscriptions by subscription id

`addSubscription(subscription)` - add subscription

`updateSubscription(id, change)` - update subscription

