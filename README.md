# FOCUS²
FOCUS²

## Development Environment Setup

Clone the repo to your computer

    $ git clone https://github.com/NETESOLUTIONS/FOCUS.git

Go to your local repo, install dependencies

    $ npm install

Install database, **postgres** is recommended

Create `development.js`, `production.js` and `test.js` in `src/server/config/environments`. Setup global variable as following format.

    $ const dev = {
    $   host: process.env.WEBSITE_HOSTNAME || 'localhost',
    $   port: process.env.PORT || 3000,
    $   database: {
    $     host: process.env.DATABASE_HOST || 'localhost',
    $     port: process.env.DATABASE_PORT || '5432',
    $     schema: process.env.DATABASE_SCHEMA || 'focus',
    $     username: process.env.DATABASE_USERNAME || 'postgres',
    $     password: process.env.DATABASE_PASSWORD || 'password',
    $     dialect: process.env.DIALECT || 'postgres',
    $   },
    $ };
    $
    $ export default dev;

Load environments configuration in `src/server/config/env.js`. Default value is **development**

    $ const env = 'development';

Run seed script to create table and inject data

    $ npm run seed;

Run script to start the server

    $ npm start

------------------------------------------------------------------------------------------------------------------
Database

1. We use the Postgresql in our project.
2. You can find the FOCUS Backup Database under the FOCUS/webpack/seeds/focus.backup.
3. Please use Version 9.5.4 for pgadmin.

------------------------------------------------------------------------------------------------------------------
Design

For design guidence please view the UxPin at:

https://collaborate.uxpin.com/fcea37abfa666c314d150e9c5c8826ce14945412#/pages/57290075
password: Nete123
