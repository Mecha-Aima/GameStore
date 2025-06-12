## 🛣️ API Endpoints

### 🎮 Game Management (`/api/games`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET` | `/api/games` | Retrieve all games with stock info | Public |
| `GET` | `/api/games/<id>` | Get specific game details | Public |
| `GET` | `/api/games/stock` | Check stock for specific game | Public |
| `POST` | `/api/games/add` | Add new game to catalog | Admin |
| `POST` | `/api/upload-image` | Upload game cover images | Admin |

### 👤 User Authentication (`/api/auth`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/login` | User authentication | Public |
| `POST` | `/api/auth/signup` | User registration | Public |
| `POST` | `/api/auth/create_customer` | Create customer profile | Authenticated |

### 👥 Customer Management (`/api/customers`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET` | `/api/customers` | Get all customers | Admin |
| `GET` | `/api/customer` | Get specific customer details | Authenticated |

### 🛒 Order Processing (`/api/orders`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET` | `/api/orders` | Retrieve all orders summary | Admin |
| `POST` | `/api/orders/add` | Create new order | Authenticated |
| `GET` | `/api/orders/get` | Get specific order details | Authenticated |
| `POST` | `/api/order_items/add` | Add items to order | Authenticated |
| `POST` | `/api/payment/add` | Process payment for order | Authenticated |