## Server Module

---

Hosts the API and acts as a web server for the client module.

### Available Scripts

In the `/api` directory, you can run:

#### `npm run test`

Runs RWBI's server module in development mode.\
Open [http://localhost:8080/](http://localhost:8080/) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run start`

Runs RWBI's server module in production mode.\
Open [http://localhost:80/](http://localhost:80/) to view it in your browser.

### API Documentation

The RWBI server module contains an API for interfacing with the Regy bot instance.

#### `STRUCT Infraction`

```json
{
  "regex_id": "String",
  "message": "String",
  "infraction_id": "String",
  "author": "Author"
}
```

#### `STRUCT Author`

```json
{
  "id": "u64",
  "name": "String",
  "pfp_url": "String"
}
```

#### `GET /api/infractions`

List of infractions for all users in one large array

#### `POST /api/infractions/add`

Add infraction

REQUEST BODY:

```json
{
  "infraction": "Infraction"
}
```

#### `POST /api/infractions/rm`

Remove infraction

REQUEST BODY:

```json
{
  "index": "u64"
}
```
