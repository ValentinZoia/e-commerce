
<div align="center">

<img src="/images/miniatura.jpg" >

# VZ-COMMERCE  
*Transform Shopping Into Seamless, Limitless Experiences*  


[![React](https://img.shields.io/badge/React-v19.0.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-%5E6.2.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![ShadcnUI](https://img.shields.io/badge/ShadcnUI-000000?logo=shadcnui)]()
[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.56.4-EC5990?logo=reacthookform)]()
[![Zod](https://img.shields.io/badge/Zod-3.24.4-408AFF?logo=zod)]()
[![Redux](https://img.shields.io/badge/Redux-9.2.0-764ABC?logo=redux)]()
[![React Table](https://img.shields.io/badge/React%20Table-8.21.3-FF4154?logo=reacttable)]()
[![React Query](https://img.shields.io/badge/React%20Query-5.85.0-FF4154?logo=reactquery)]()

[![Nodejs](https://img.shields.io/badge/Nodejs-22.20.0-5FA04E?logo=nodejs)]()
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)]()
[![Prisma](https://img.shields.io/badge/Prisma-6.7.0-2D3748?logo=prisma)](https://www.prisma.io/) [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/Openai-5.16.0-2D3748?logo=openai)]()
[![Whatsapp-web-js](https://img.shields.io/badge/Whatsapp%20Web%20Js-1.33.0-25D366?logo=whatsapp)]()
[![Jest](https://img.shields.io/badge/Jest-30.0.5-C21325?logo=jest)](https://www.prisma.io/)

</div>

An e-commerce platform built with React, TypeScript, and Vite, leveraging modern web development practices and a component-driven architecture.

## Table of Contents
- [What & Why](#what--why)
  - [Highlights](#highlights)
  - [Pages Preview](#pages-preview)
    - [Public Pages](#public-pages)
    - [Private Pages](#private-pages)
  - [System Architecture](#system-architecture)
  - [Technology Stack](#technology-stack)
- [Technical Deep Dive](#technical-deep-dive)
  - [State Management](#state-management)
  - [Clean Architecture](#clean-architecture-backend)
  - [Design Patterns](#design-patterns)
  - [Performance Optimizations](#performance-optimizations)
  - [Security](#security)
  - [Testing Strategy](#testing-strategy)
- [API & Data Fetching](#api--data-fetching)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Key Functionality and Usage Examples](#key-functionality-and-usage-examples)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## What & Why

### What is VZ-Commerce?

VzCommerce is a lightweight, sales-focused ecommerce platform designed for small businesses that close deals through WhatsApp.

Instead of forcing the entire checkout process inside the website, VzCommerce acts as a seamless bridge: customers browse a full product catalog, view price, stock and promotions, and once they decide to buy, the platform automatically routes the order to WhatsApp so the seller and customer can finalize payment, shipping, and details privately.

On the admin side, sellers get a complete dashboard with real-time analytics powered by Chart.js, dynamic tables with pagination for managing products, and a dedicated orders panel. It also includes an integrated AI assistant specialized in digital business and sales to provide guidance, insights, and optimization tips.

### Why I Built This

I noticed that many small sellers prefer finalizing their sales through WhatsApp, where they can negotiate, build trust, and adapt pricing or delivery on the fly. However, keeping a catalog updated manually, sending photos, prices, descriptions one by one is tedious and unscalable.

VzCommerce was built to solve that gap: give customers a comfortable, organized place to explore the entire catalog, while preserving the seller's preferred workflow of closing the sale in private through WhatsApp. It blends the convenience of a modern storefront with the flexibility of conversational selling.

### The Challenge

The main challenge was to create an ecommerce platform that feels complete and professional, apply Clean Architecture with design patterns, and implement a robust testing strategy with +500 tests. At the same time, building a robust admin panel with real-time analytics, dynamic data tables, and an AI assistant required careful architecture, and clean, maintainable code.

---

## Highlights

- **Product Listings**: Display of products with details such as name, description, price, and images. 
- **Category Management**: Categorizing products for easy navigation. 
- **Shopping Cart**: Add, remove, and manage products in a shopping cart. 
- **Admin Authentication**: Secure admin login. 
- **Admin Panel**: Administrative interface for managing products, categories, and orders with Data-Tables (tanstack/react-table). 
- **Checkout Process**: Streamlined checkout process with token-based validation. 
- **AI Assistant**: Private admin AI to help manage the store.
- **WhatsApp Automated Message**: WhatsApp notifications for order confirmations.
- **Image Handling**: Image transformation, WebP conversion, and cloudinary uploads, and lazy loading for optimized performance. 
- **Real-time Analytics**: Track statistics of the store with Chartjs. 
- **Modular Components**: Reusable UI elements and organized architecture for maintainability.
- **Optimized Build Process**: Streamlined workflows with Vite, TailwindCSS, and TypeScript configurations.
- **Secure API & Authentication**: Robust route protection, session management, and user authentication.
- **State & Data Management**: Centralized store with Redux Toolkit, React Query, and data validation schemas.
- **Flexible Routing & Admin Tools**: Organized navigation, admin dashboards, and private pages.

---

## Pages Preview

### Public Pages

#### '/'
 <img src="/images/home.png" >
 <img src="/images/carousel-home.png" >
 
#### '/products'
 <img src="/images/AllProductsList.png" >
 
#### '/promotion'
 <img src="/images/promotion.png" >
 
#### '/featured'
 <img src="/images/featured.png" >
 
#### '/new'
 <img src="/images/new.png" >
 
#### '/categories/zapatillas'
 <img src="/images/category-zapatillas.png" >
 
#### '/search'
 <img src="/images/search-query=sanlorenzo.png" >
 
#### '/products/:id'
 <img src="/images/ProductDetail.png" >
 
#### Shopping Cart
 <img src="/images/AddProductToCart.png" >
 
#### '/checkout/:token'
 <img src="/images/checkout-token.png" >
 <img src="/images/checkout-form-with-data.png" >
 
#### '/order/:id' 
 <img src="/images/order-1.png" >
 <img src="/images/order-2.png" >
 
#### '/login'
 <img src="/images/login.png" >

### Private Pages

#### '/private/admin'
 <img src="/images/private-admin.png" >
 
 #### '/private/admin/analytics'
 <img src="/images/private-admin-analytics.png" >
 
#### '/private/admin/products'
 <img src="/images/private-admin-products-1.png" >
 <img src="/images/private-admin-products-2.png" >
 
#### '/private/admin/categories'
 <img src="/images/private-categories.png" >
 
#### '/private/admin/order'
 <img src="/images/private-admin-orders.png" >
 <img src="/images/private-admin-order-2.png" >
 
#### '/private/admin/ai'
 <img src="/images/private-admin-ai.png" >
 
#### '/private/admin/settings'
 <img src="/images/private-admin-settings.png" >
 <img src="/images/private-admin-settings-2.png" >
 
---

## System Architecture

The application follows a Clean Architecture with layers like Domain, Application, Infrastructure and Presentation.

If you are interested in what is a clean architecture and how you can use it, please check my free book, in Spanish.

[Arquitecturas y Patrones - Valentin Zoia](https://github.com/ValentinZoia/Libros/blob/main/Arquitecturas%20y%20Patrones%20-%20TypeScript%20-%20ValentinZoia.pdf)

 <img src="/images/cleanarchitecture.webp" >

---

## Technology Stack

| Layer             | Technology                       | Key Packages                                                                                                                |
|-------------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Frontend**      | React 19, TypeScript, Vite       | `react`, `react-router-dom`, `@reduxjs/toolkit`, `@tanstack/react-query`                                                   |
| **UI Framework**  | Tailwind CSS 4, Radix UI, Shadcn   | `tailwindcss`, `@radix-ui/react-*`, `lucide-react`,                                                                         |
| **Data Table**   | Tanstack React Table and Shadcn    | `@tanstack/react-table`,                                                                                                     |
| **Form**          | React Hook Form and Zod for Validations    | `react-hook-form`,  `zod`,                                                                                                      |
| **State Management** | Redux Toolkit, React Query    | `@reduxjs/toolkit`, `react-redux`, `@tanstack/react-query`                                                                |
| **Backend**       | Node.js, Express 5, TypeScript   | `express`, `typescript`, `tsx`                                                                                             |
| **Database**      | MongoDB with Prisma ORM          | `@prisma/client`, `prisma`                                                                                                 |
| **Authentication**| JWT, Bcrypt                      | `jsonwebtoken`, `bcryptjs`                                                                                                 |
| **External APIs** | WhatsApp Web.js, OpenAI          | `whatsapp-web.js`, `openai`                                                                                                |
| **Testing**       | Jest, Supertest                  | `jest`, `supertest`                                                                                 |
| **Development**   | Vite, ESLint                     | `vite`, `eslint`                                                                                     |

---

## Technical Deep Dive

### State Management

This project implements a **hybrid state management strategy** that separates server state from client state:

| State Type | Technology | Use Case |
|-----------|------------|----------|
| **Server State** | TanStack Query (React Query) | Products, Categories, Orders, Auth data |
| **Client State** | Redux Toolkit | Shopping cart (needs persistence) |
| **Form State** | React Hook Form | All forms with Zod validation |
| **UI State** | React useState | Local component state |

#### Why React Query + Redux?

The decision to use both technologies was intentional:

- **React Query**: Handles server state with automatic caching, background refetching, optimistic updates, and cache invalidation. Perfect for data that comes from the API.
- **Redux Toolkit**: Used exclusively for the shopping cart because it needs to persist across sessions (localStorage) and has complex synchronous logic with reducers.

```typescript
// React Query - Server State
const { data, isLoading } = useProducts({ 
  page: 1, 
  limit: 10,
  category: 'shoes',
  priceMin: 50,
  priceMax: 200,
  sortBy: 'price',
  sortDir: 'asc'
});

// Redux Toolkit - Client State (Cart)
const { items, addItem, removeItem, clearCart } = useCartActions();
```

### Clean Architecture (Backend)

The backend follows Clean Architecture with 4 clearly defined layers:

```
src/
├── Domain/           # Entities, Interfaces, DTOs (innermost layer)
├── Application/     # Use cases, Business logic services
├── Infrastructure/  # External implementations (Prisma, APIs, Adapters)
└── Presentation/    # Routes, Controllers, Middlewares
```

**Principles applied:**
- 🔄 **Dependency Inversion**: External layers depend on internal ones
- 🧪 **Testability**: Each layer can be tested in isolation
- 📦 **Separation of Concerns**: Responsibilities clearly defined

### Design Patterns

| Pattern | Implementation | Location |
|---------|---------------|----------|
| **Repository** | Data access abstraction | `infrastructure/repositories/*` |
| **Builder** | Complex object creation | `ProductBuilder`, `OrderBuilder`, `OrderItemBuilder` |
| **Adapter** | Interface conversion | `OrderSendMessageToCustomer.impl.ts` |
| **Factory** | Test data generation | Test helpers |
| **Middleware** | Cross-cutting concerns | `AuthMiddleware`, `ValidationMiddleware` |
| **Dependency Injection** | Loose coupling | Constructor injection in services |

### Performance Optimizations

| Optimization | Implementation |
|-------------|---------------|
| **Lazy Loading** | `React.lazy()` + `<Suspense>` for routes and heavy components |
| **Image Lazy Loading** | Custom `<Lazy>` component with IntersectionObserver |
| **Debounced Search** | `useDebounce` hook (300ms delay) to avoid excessive API calls |
| **Skeleton Loaders** | Visual placeholders during data fetch |
| **React Query Caching** | `staleTime: 5min`, `gcTime: 10min` |
| **Optimistic Updates** | Immediate UI updates with automatic rollback on error |
| **Image Optimization** | WebP conversion, Cloudinary CDN |
| **Component Memoization** | React.memo where needed |

### Security

| Feature | Implementation |
|---------|---------------|
| **JWT in Cookies** | httpOnly, secure, sameSite cookies |
| **Helmet.js** | HTTP security headers |
| **CORS** | Configurable allowed origins |
| **Rate Limiting** | express-rate-limit (100 requests/15min) |
| **bcryptjs** | Password hashing |
| **Zod Validation** | Input validation on both client and server |
| **Auth Middleware** | Token verification on protected routes |

### Testing Strategy

The backend has **59 test files** with over **11,000 lines** of test code:

| Test Type | Coverage |
|-----------|----------|
| **Unit Tests** | Services, DTOs, Entities |
| **Integration Tests** | Repositories, Controllers |
| **E2E Tests** | Full flows (auth → create → update → delete) |
| **Black Box Tests** | Testing without internal code access |

**Test Coverage by Module:**

| Module | Unit | Integration | E2E |
|--------|------|-------------|-----|
| Auth | ✅ | ✅ | ✅ |
| Products | ✅ | ✅ | ✅ |
| Categories | ✅ | ✅ | ✅ |
| Orders | ✅ | ✅ | ✅ |
| Middlewares | ✅ | ❌ | ❌ |

---

## API & Data Fetching

### Query Parameters

All GET endpoints support pagination and filtering:

```typescript
{
  page: number;           // Current page
  limit: number;          // Items per page (take)
  search?: string;        // Text search
  category?: string;      // Filter by category
  priceMin?: number;      // Minimum price
  priceMax?: number;      // Maximum price
  inStock?: boolean;     // Only in-stock products
  freeShipping?: boolean;
  featured?: boolean;
  promotion?: boolean;
  new?: boolean;
  size?: string;
  sortBy?: 'price' | 'createdAt' | 'discountPercentage';
  sortDir?: 'asc' | 'desc';
}
```

### Custom Hooks (25+)

The project includes many custom hooks for code reuse:

| Hook | Purpose |
|------|---------|
| `useProducts()` | Fetch products with filters |
| `useProductsFilters()` | Filter state management |
| `useProductById()` | Single product fetch |
| `useProductMutations()` | CRUD operations |
| `useCategories()` | Categories fetch |
| `useCategoryMutations()` | Categories CRUD |
| `useOrders()`, `useOrderById()` | Orders fetch |
| `useOrderMutations()` | Orders CRUD |
| `useStoreCustomer()` | Store data |
| `useAuthMutations()` | Login/Logout |
| `useSession()` | Session verification |
| `useCartActions()` | Cart management |
| `useCheckout()` | Checkout process |
| `useAIMutations()` | AI chat |
| `useDebounce()` | Avoid excessive requests |
| `useImageCropper()` | Image cropping |
| `useMobile()` | Responsive detection |
| `useCheckoutForm()` | Checkout form |
| `useProductForm()` | Product form |
| `useOrderForm()` | Order form |
| `useInstallments()` | Installment calculation |
| `useImageUpload()` | Cloudinary upload |

---

## Key Features

### WhatsApp Integration
- WhatsApp Web.js for session management
- QR authentication for linking
- Message states: PENDING → SENT → RESPONDED → COMPLETED
- Automatic order confirmation messages
- Real-time connection events

### AI Integration (OpenAI)
- OpenAI SDK integration with GPT-4.1
- AI Chat Interface in admin panel
- AI Insights Cards for business analysis
- Custom endpoint support (compatible routers)

### Image Management
- Cloudinary direct upload with presets
- Automatic WebP conversion
- react-cropper for image resizing
- Browser-side compression before upload
- Multiple images per product (gallery)

### Admin Dashboard
- Real-time analytics with Recharts:
  - Line Chart: Sales trends
  - Bar Chart: Top products
  - Pie Chart: Category distribution
  - Area Chart: Monthly performance
- Dynamic tables with TanStack Table
- Sorting, filtering, pagination
- Order management
- Store configuration

---

## Project Structure

The project is structured as a monorepo, with separate directories for the client and server.

```
├── client/                  # Frontend application
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── guards/        # Route guards
│   │   ├── hooks/         # Custom hooks (25+)
│   │   ├── layouts/       # Layout components
│   │   ├── lib/           # Utilities, axios, zod schemas
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   ├── store/         # Redux store
│   │   ├── utilities/     # Utility functions
│   │   ├── data/          # API calls
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # Entry point
│   │   └── routes/        # Application routes
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite configuration
├── server/                  # Backend application
│   ├── src/               # Source code
│   │   ├── app.ts            # Entry point
│   │   ├── server.ts         # Server setup
│   │   ├── AI/               # AI Assistant feature
│   │   ├── Auth/             # Authentication
│   │   ├── Categories/       # Categories feature
│   │   ├── Checkout/         # Checkout feature
│   │   ├── Orders/           # Orders feature
│   │   ├── Products/         # Products feature
│   │   ├── StoreCustomers/   # Store customers
│   │   └── shared/           # Shared modules
│   ├── tests/         # Tests
│   │   ├── context/         # Unit & integration tests
│   │   ├── apps/            # E2E & black box tests
│   │   └── helpers/         # Factories, mocks, helpers
│   ├── package.json         # Dependencies and scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── prisma/            # Prisma schema and migrations
├── README.md                # Project documentation
└── .gitignore               # Specifies intentionally untracked files
```

---

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ValentinZoia/e-commerce.git
    ```
2.  **Navigate to the client directory**:
    ```bash
    cd e-commerce/client
    ```
3.  **Install client dependencies**:
    ```bash
    npm install
    ```
4.  **Navigate to the server directory**:
    ```bash
    cd ../server
    ```
5.  **Install server dependencies**:
    ```bash
    npm install
    ```
6.  **Set up the database**: 
    - Ensure that you have a MongoDB database running.
    - Configure the database connection in the `.env` file in the `server` directory.
    ```
    DATABASE_URL="<your-mongodb-url>"
    ```
    - Generate the Prisma client:
    ```bash
    npm run prisma:generate
    ```

---

## Usage

### Client-side
1.  **Navigate to the client directory**:
    ```bash
    cd client
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can access the application in your browser.

### Server-side
1.  **Navigate to the server directory**:
    ```bash
    cd server
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```

### Running Tests
```bash
cd server
npm test
```

---

## Key Functionality and Usage Examples

1. **Product Display:** Products are fetched and displayed using React components within the `client/src/components` directory. Data is fetched using TanStack React Query. Example usage:
    ```typescript
    import { useQuery } from '@tanstack/react-query';
    import axios from 'axios';

    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      return data;
    };

    const ProductsComponent = () => {
      const { data, isLoading, error } = useQuery('products', fetchProducts);

      if (isLoading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <ul>
          {data.map(product => (
            <li key={product.id}>{product.name} - {product.price}</li>
          ))}
        </ul>
      );
    };
    ```

2. **Form Handling:** React Hook Form is used for managing forms, with Zod for schema validation. Example usage from the client side:
    ```typescript
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import * as z from 'zod';

    const schema = z.object({
      username: z.string().min(3).max(20),
      email: z.string().email(),
    });

    type FormData = z.infer<typeof schema>;

    const MyForm = () => {
      const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
      });

      const onSubmit = (data: FormData) => console.log(data);

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
          <button type="submit">Submit</button>
        </form>
      );
    };
    ```

3. **Authentication:** The application implements authentication using JWTs, with middleware for protecting routes. The `AuthGuard` component in `client/src/guards/auth.guard.tsx` handles route protection.

4. **Checkout Process:** The checkout process is initiated using tokens, validated by the `CheckoutGuard` in `client/src/guards/checkout.guard.tsx`. The route `/checkout/:token` is used for checkout.

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📧 Contact

- **Author:** Valentín Zoia
- **Email:** zoiavalentin.dev@gmail.com
- **LinkedIn:** [Profile](https://linkedin.com/in/valentinzoia)
- **Portfolio:** [Website](https://valentinzoia.vercel.app)

---

**Built with ❤️ and best practices**
