export default `swagger: "2.0"
info:
  version: "0.0.1"
  title: DemandHub - platform
# during dev, should point to your local machine
host: localhost:4000
# basePath prefixes all resource paths
basePath: /api
#
schemes:
  # tip: remove http to make production-grade
  - http
# format of bodies a client can send (Content-Type)
consumes:
  - application/json
# format of the responses to the client (Accepts)
produces:
  - application/json

securityDefinitions:
  authorization:
    x-authorize: security/auth.js
    scopes:
      default: Default Scope


security:
  - authorization: [ default ]

tags:
  - name: user
    description: User namespace.

paths:

  /user/login:
    get:
      description: Get messenger stats
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

definitions:

  Request:
    description: Basic Request

  Response:
    description: A standard error response for all API methods.
`
