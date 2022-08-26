# Rest Country List App

This is a basic country list app. You can filter countries by it's name.

### Live Version
Project live version can be found at https://country-app-zeta.vercel.app/
### Url Paths & Query Strings

for detail you can use syntax with 2 or 3 characted unicode query strings or absolute paths like:

You can reach a country by country code directly
https://country-app-zeta.vercel.app/detail?id=TR
https://country-app-zeta.vercel.app/detail/TR
Both of them are same

If you loaded page from server side (first requests, other requests are done by client side) right click from your browser and select view-source you'll see the rendered app
### Installation

```sh
$ git clone
$ npm install
```

### Running Project

```sh
$ npm run dev
```
After this command check http://localhost:3000/ from your browser.

### Building & Production

```sh
$ npm build
$ npm start
```

### Tech

Project uses a number of open source projects to work properly:

* [Express](https://expressjs.com/) - fast node.js network app framework
* [NextJS](https://github.com/zeit/next.js/) - Framework for server rendered React Apps
* [React](https://reactjs.org/) - A Javascript Library for building User Interfaces
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) - Redux dev tools
* [Redux](https://github.com/reactjs/redux) - Predictable state container for JavaScript apps




### TODOS
- Write Tests
- Multi Language (https://react.i18next.com/)

Updated by Ramazan Sancar - 2022 August | Created by Serdar AGLAMIS  - 2017 October
