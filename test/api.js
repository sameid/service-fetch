module.exports = `swagger: "2.0"
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
  - name: review_request
    description: Review_request namespace.
  - name: review
    description: Review namespace.
  - name: review_insight
    description: Review insight namespace.
  - name: message
    description: Message namespace.
  - name: location
    description: Location namespace.
  - name: company
    description: Company namespace.
  - name: message_template
    description: Message Template Namespace
  - name: email
    description: Email Management Namespace
  - name: review_sites
    description: Review Site Namespace
  - name: timezones
    description: Timezone Namespace
  - name: password
    description: Password Namespace
  - name: contacts
    description: Contact Namespace
  - name: recommendations
    description: Recommendations Namespace
  - name: synced_appointment
    description: Synced Appointment Namespace
  - name: crm
    description: CRM Namespace
  - name: admin
    description: Admin Namespace
  - name: audit_log
    description: Audit Log Namespace
  - name: push
    description: Push Namespace
  - name: reviews_widget
    description: Reviews Widget Namespace
  - name: stats
    description: Statistics Namespace
  - name: api_keys
    description: API Keys Namespace
  - name: customer_success
    description: Customer Success Namespace

paths:

  /admin/messenger/stats:
    get:
      description: Get messenger stats
      tags: [ admin ]
      operationId: stats

      security: [
        authorization: [ default ]
      ]

      responses:
        "200":
          description: Success
          schema:
            $ref: "#/definitions/Response"
        default:
          description: Error
          schema:
            $ref: "#/definitions/Response"

  /stats/messenger:
    get:
      description: Get overall Stats for the messenger
      tags: [ stats ]
      operationId: getMessengerStats

      security: [
        authorization: [ default ]
      ]

      parameters:
      - in: query
        name: favoritesOnly
        type: boolean
        required: true
        description: favorite only toggle

      responses:
        "200":
          description: Success
          schema:
            $ref: "#/definitions/Response"
        default:
          description: Error
          schema:
            $ref: "#/definitions/Response"

  /stats/webchat:
    get:
      description: Get overall Stats for the webchat
      tags: [ stats ]
      operationId: getWebchatStats

      security: [
        authorization: [ default ]
      ]

      parameters:
      - in: query
        name: favoritesOnly
        type: boolean
        required: true
        description: favorite only toggle

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
