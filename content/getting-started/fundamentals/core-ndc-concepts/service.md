---
title: Service
---
{% # OpenAPI Specification

## Info

- **Title**: Sample API
- **Version**: 1.0.0
- **Description**: This is a simple API for demonstration purposes.

## Servers

- **URL**: `https://api.example.com`
- **Description**: Production server

## Paths

### GET /items

- **Summary**: Retrieve a list of items
- **OperationId**: getItems
- **Responses**:
  - **200 OK**
    - **Description**: A JSON array of items
    - **Content**:
      - **application/json**:
        - **Example**:
          ```json
          [
            {
              "id": 1,
              "name": "Item 1",
              "price": 19.99
            },
            {
              "id": 2,
              "name": "Item 2",
              "price": 29.99
            }
          ]
          ```

### POST /items

- **Summary**: Create a new item
- **OperationId**: createItem
- **RequestBody**:
  - **Required**: true
  - **Content**:
    - **application/json**:
      - **Schema**:
        ```json
        {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            }
          },
          "required": ["name", "price"]
        }
        ```
      - **Example**:
        ```json
        {
          "name": "New Item",
          "price": 39.99
        }
        ```
- **Responses**:
  - **201 Created**
    - **Description**: The item was successfully created
    - **Content**:
      - **application/json**:
        - **Example**:
          ```json
          {
            "id": 3,
            "name": "New Item",
            "price": 39.99
          }
          ```
  - **400 Bad Request**
    - **Description**: Invalid request payload
    - **Content**:
      - **application/json**:
        - **Example**:
          ```json
          {
            "error": "Invalid input data"
          }
          ```

## Components

### Schemas

- **Item**
  - **Type**: object
  - **Properties**:
    - **id**:
      - **Type**: integer
      - **Description**: Unique identifier for the item
    - **name**:
      - **Type**: string
      - **Description**: Name of the item
    - **price**:
      - **Type**: number
      - **Description**: Price of the item
%}