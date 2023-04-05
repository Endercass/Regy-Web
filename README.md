# RBWI - Regy Bot Web Interface

Simple web interface for interacting with [Regy](https://github.com/MrEnder0/Regy-Bot) bot.

## Client Module

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the `/client` directory, you can run:

#### `npm run start`

Runs RWBI's client module in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds RWBI's client module for production to the `/api/dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The built client module will be loaded by the server module in the `/api` directory, and will be accessible at `http://localhost:8080/`

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

## Running

---

1. Clone RBWI and install dependencies:

   ```bash
   git clone https://github.com/Endercass/Regy-Web.git
   cd Regy-Web
   ./install-deps.sh
   ```

2. Build client module:

   ```bash
   cd client
   npm run build
   cd ..
   ```

3. Launch server

   ```bash
   cd api
   # Development version
   npm run test
   # Production version (may require root, listens on port 80)
   npm run start
   ```
