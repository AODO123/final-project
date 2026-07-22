# E-Commerce API

A Node.js + Express backend for a MongoDB e-commerce store.
Supports product CRUD, cart management, and basic shopping flow for frontend or API clients.

## What it does

- Manages products with create, read, update, and delete operations
- Tracks a shopping cart with add, update, remove, and clear functionality
- Uses MongoDB for data storage
- Includes error handling and schema validation in controllers

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AODO123/final-project.git
   cd 'final-project"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/final-project
   ```
4. Seed sample data:
   ```bash
   npm run seed
   ```

## How to run

Start the server

```bash
npm start
```

Then open `http://localhost:3000` and use your API client to call the endpoints.

## API Endpoints

### Products

- `GET /api/products` — list all products
- `GET /api/products/:id` — get product details
- `POST /api/products` — create a product
- `PUT /api/products/:id` — update a product
- `DELETE /api/products/:id` — delete a product

### Cart

- `POST /api/carts` — create a cart
- `GET /api/carts/:id` — get a cart by ID
- `POST /api/carts/:id/items` — add an item to the cart
- `PUT /api/carts/:id/items/:productId` — update item quantity
- `DELETE /api/carts/:id/items/:productId` — remove an item from the cart
- `DELETE /api/carts/:id` — clear the cart

## Example request bodies

Product:

```json
{
  "name": "New item",
  "price": 10,
  "description": "Test product",
  "category": "general",
  "image": "https://example.com/image.png",
  "stock": 5
}
```

Add to cart:

```json
{
  "productId": "<existing product id>",
  "quantity": 2
}
```

## Notes

- Ensure MongoDB is running before starting the server.
- Update `MONGO_URI` in `.env` if needed.
- Use Postman to test the endpoints.

## Project goals and scopes

eCommerce API that is a backend service that enables shoppers to browse products, build and manage shopping carts, and allows admins to create, update, and maintain product listings.

### User Stories:

- As a shopper, I can view products.
- As a shopper, I can search or filter products.
- As a shopper, I can create a cart and add items to it.
- As a shopper, I can update cart item quantities and remove items.
- As an admin, I can add or edit products.
- As an admin, I can delete product listings when needed.
