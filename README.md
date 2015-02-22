# React Base Project

This is intended to be a good starting point for building simple react apps. There is no server included other than the development connect server, so if you want to deploy to production that's up to you.

For that same reason there is no server rendering. The browser will get `client/index.html` as is on every request.

## Project Structure

* `client/`: This is the meat of the app. 
  * `utils/`: Contains utilities, helpers and common code for the client app.
  * `index.jsx`: This renders the app
  * `App.jsx`: The top level of the app. No other component should require App.
  * Components should each live in their own appropriately named sub folder
* `public/`: The web root
* `Gulpfile.js`: All build processes are defined here.

**Note:** Aside from images, all files under `public/` are compiled so they should not be edited directly.
