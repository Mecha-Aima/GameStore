
---

## 🏠 Home Page

### 🔍 Game Listing (Header Search / Category Filter / Featured Grid)

| Endpoint         | Method | Description                         | Query Parameters                        | Request Body | Response     |
|------------------|--------|-------------------------------------|------------------------------------------|---------------|--------------|
| `/api/games`     | GET    | List all games or filter by genre/search | `genre` (string), `q` (string)      | N/A           | Game List    |

---

## 📄 Product Details Page

### 📌 Game Details

| Endpoint              | Method | Description                | Path Parameters | Request Body | Response        |
|-----------------------|--------|----------------------------|------------------|--------------|-----------------|
| `/api/games/{id}`     | GET    | Get game details by ID     | `id` (integer)   | N/A          | Game Details     |
| `/api/games/{id}`     | PUT    | Update game (Admin only)   | `id` (integer)   | `Game` schema| Updated Game     |
| `/api/games/{id}`     | DELETE | Delete a game (Admin only) | `id` (integer)   | N/A          | Success message  |

---

## 🛒 Cart Page

### 🧾 Cart Items + Order Summary Sidebar

| Endpoint               | Method | Description                          | Path/Query Params | Request Body                                          | Response     |
|------------------------|--------|--------------------------------------|-------------------|--------------------------------------------------------|--------------|
| `/api/cart`            | GET    | Get current user's cart              | N/A               | N/A                                                    | Cart Items   |
| `/api/cart`            | POST   | Add or update item in cart           | N/A               | `{ gameId: integer, quantity: integer }`               | Updated Cart |
| `/api/cart/{gameId}`   | DELETE | Remove an item from cart             | `gameId` (int)    | N/A                                                    | Updated Cart |

---

## 📦 Order Summary Page

### 🧾 Final Summary and Confirmation

| Endpoint              | Method | Description                     | Path Params | Request Body                                 | Response     |
|-----------------------|--------|---------------------------------|-------------|-----------------------------------------------|--------------|
| `/api/order/preview`  | GET    | Get a summary of current cart   | N/A         | N/A                                           | Summary Info |
| `/api/order/confirm`  | POST   | Place an order from cart        | N/A         | `{ paymentMethod: string }`                   | Order Placed |
| `/api/payment`        | POST   | Simulate a payment transaction  | N/A         | `{ orderId: integer, method: string }`        | Payment Info |

---

## 🔐 Login & Registration Page

### 🔑 Auth Forms

| Endpoint               | Method | Description        | Request Body                                                            | Response        |
|------------------------|--------|--------------------|-------------------------------------------------------------------------|-----------------|
| `/api/auth/login`      | POST   | Login user         | `{ email: string, password: string }`                                   | JWT or session  |
| `/api/auth/register`   | POST   | Register new user  | `{ username: string, email: string, password: string }`                 | User Info       |

---