# Stonehenge.io

A website built with Webpack with a simple PHP API. Designed with Bootstrap and enhanced with jQuery.

## Installing locally

Once you have your repository cloned to your local computer, just run the following command to install the dependencies:

```
npm install
```

## Running the API locally

In order to run the API, you will need to have a LAMP stack set up.

1. Using your preferred tool, create or use an existing MySQL database.
1. Run `./api/db.sql` against the MySQL database to create the table.

Next, you will need to place the project into your Apache web root.

1. Create a directory in your Apache public root that you will use to test the website, e.g. `htdocs/stonehenge`.
1. Create a file in this directory called `.mysqlconfig.json`. Configure your database connection using the following template:
  ```json
  {
    "host": "localhost",
    "username": "root",
    "password": "",
    "database": "leads"
  }
  ```

1. Copy `./api` to a directory in your Apache htdocs so that PHP can execute it.
1. Run [`npm run build`](#npm-run-build) to create a build.
1. Copy the contents of `./public` into the same directory that has `./api`.

Example structure:
  ```
  htdocs/stonehenge/.mysqlconfig.json
  htdocs/stonehenge/api/capture-lead.php
  htdocs/stonehenge/index.html
  htdocs/stonehenge/build/...
  ```

Now you should be able to run the website with Apache. Try visiting http://localhost/stonehenge in your browser.

## Scripts

This package ships with a few handy scripts to automate development and deployment of the website.

### `npm run dev`

This command starts a Webpack "hot" server, which watches your source files for changes and automatically recompiles and reloads your browser. Simply run this command, wait for compiling to finish, and visit http://localhost:8080 in your browser.

### `npm run build`

This command executes a production-like build from your source files using Webpack. It compiles and concatenates your sources into files that are stored in `./public/build` in your repository. All of your static assets should now be safely contained within the `./public` directory and you can serve your static website using a standard web server from the `./public` directory.

### `npm run deploy`

Running this script for the first time will create a branch called `build`.

This command simply runs the top-level bash script file called `deploy.sh`. The bash script does the following:

1. Clones your website repository into a directory called `./out` and checks out a special branch called `build`. (The branch is created if it does not exist.)
1. Deletes all contents of the `build` directory.
1. Runs [`npm run build`](#npm-run-build) and copies the results (everything in `./public`) into the root of the `build` branch clone.
1. Copies `./deploy.php` into the root of the `build` branch clone.
1. If there are any changes from the previous build, commits and pushes the changes to the `build` branch clone.
1. Triggers the live server to pull updates.
