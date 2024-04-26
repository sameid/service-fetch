service-fetch
===========

Promise Based wrapper for any Swagger defined API. 

## Installation

`service-fetch` can be installed directly through npm:

```sh
$ npm install --save service-fetch
```

## Usage

Here is an example definition of a potential path in your Swagger Doc:

```yaml
  /user/login:
    get:
      description: Performs a login request
      tags: [ user ]
      operationId: login

      security: []

      responses:
        "200":
          description: Success
          schema:
            $ref: "#/definitions/Response"
        default:
          description: Error
          schema:
            $ref: "#/definitions/Response"
```

Here is how you can import your Swagger Doc and perform API operations using simple services:

```jsx

// Setup and load your Swagger API Definition, your namespaces are considered services
import { loadServices, getServices } from 'service-fetch';

// Importing the Swagger Doc definition of your API
import api from "./api.js";

// Use the loadServices helper function to initialize the API
loadServices({
	apiDpc: api,
	host: "http://localhost:3001/api
});

// . . .

// Once you've loaded the Swagger Doc and the services within, you can consider your Swagger namespaces as services and you can call upon their operations as needed.

const { UserService } = getServices();

let username = "test@gmail.com";
let password = "my-special-password";

// UserService.login() translates to a POST request to the /api/user/login endpoint
let { response, error } = await UserService.login({ body: { username, password } }); 

// Perform any UI operations necessary using the response and error returned values...

```

## Contribute

```sh
$ git clone https://github.com/DemandHub/service-fetch.git
$ npm install

... make code changes in ./src

$ npm run compile
```