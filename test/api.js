module.exports = {
  "swagger": "2.0",
  "info": {
    "version": "0.0.1",
    "title": "test-api"
  },
  "host": "localhost:3001",
  "basePath": "/api",
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "tags": [
    {
      "name": "user",
      "description": "User namespace."
    }
  ],
  "paths": {
    "/user/login": {
      "post": {
        "description": "Attempt to log the user in",
        "tags": [
          "user"
        ],
        "operationId": "login",
        "security": [],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/Response"
            }
          },
          "default": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Response"
            }
          }
        }
      }
    },
    "/user/logout": {
      "post": {
        "description": "Attempt to logout the user",
        "tags": [
          "user"
        ],
        "operationId": "logout",
        "security": [],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/Response"
            }
          },
          "default": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Response"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Request": {
      "description": "Basic Request"
    },
    "Response": {
      "description": "A standard error response for all API methods."
    }
  }
}