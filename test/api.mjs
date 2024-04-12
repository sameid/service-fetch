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
  widget_auth:
    x-authorize: security/widget_auth.js
    scopes:
      reviews_widget_fetch: Get all the reviews for a location
      create_analytics_event: Create analytics event
  third_party_auth:
    x-authorize: security/third_party_auth.js
    scopes:
      third_party_validate_api_key: Let a third party service validate an API key
      third_party_create_review_request: Let a third party service create review requests

security:
  - authorization: [ default ]
  - widget_auth: [ reviews_widget_fetch, create_analytics_event ]
  - third_party_auth: [ third_party_validate_api_key, third_party_create_review_request ]

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
