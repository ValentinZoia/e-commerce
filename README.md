

<div align="center">

# E-COMMERCE  
*Transform Shopping Into Seamless, Limitless Experiences*  

![last-commit](https://img.shields.io/github/last-commit/ValentinZoia/e-commerce?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/ValentinZoia/e-commerce?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/ValentinZoia/e-commerce?style=flat&color=0080ff)
[![React](https://img.shields.io/badge/React-v19.0.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.7.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-%5E6.2.0-blue)](https://vitejs.dev/)

*Built with the tools and technologies:*  



</div>
<div align="center"  >
               <img src="https://skills.syvixor.com/api/icons?i=typescript,reactjs,vite,reactrouter,tailwindcss,shadcnui,reacthookform,zod,redux,tanstack,reactquery,cloudinary" > 
<br>
            <img src="https://skills.syvixor.com/api/icons?i=nodejs,express,prisma,mongodb,chatgpt,whatsapp,jest" > 
           
            
             
             
             
            
</div>

An e-commerce platform built with React, TypeScript, and Vite, leveraging modern web development practices and a component-driven architecture.
## Table of Contents
- [Overview](#overview)
  - [Features](#features)
  - [Pages Preview](#pages-preview)
    - [Public Pages](#public-pages)
    - [Private Pages](#private-pages)
  - [System Architecture](#system-architecture)
  - [Technology Stack](#technology-stack)
  - [Core Businnes Processes](#core-businnes-processes)
  - [Key Components & Entities](#key-components--entities)
  - [Want to Dive Deeper?](#want-to-dive-deeper)
- [Installation](#installation)
- [Usage](#usage)
- [Key Functionality and Usage Examples](#key-functionality-and-usage-examples)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)
  
## Overview

E-commerce system, a full-stack web application built with React and Node.js. The system enables customers to browse products, manage shopping carts, complete purchases through a checkout process, and receive **WhatsApp notifications** for order confirmations. It includes a comprehensive admin panel with **Data-Tables(tanstack/react-table)** for managing products, categories, orders, and an **AI-powered assistant**.

The system implements a dual-interface architecture: a public-facing e-commerce store and a private administrative dashboard.
## Features
- 🖼️ **Product Listings**: Display of products with details such as name, description, price, and images. 
- 🏷️ **Category Management**: Categorizing products for easy navigation. 
- 🛒 **Shopping Cart**: Add, remove, and manage products in a shopping cart. 
- 🔑 **User Authentication**: Secure user login and registration. 
- ⚙️ **Admin Panel**: Administrative interface for managing products, categories, and orders. 
- 💳 **Checkout Process**: Streamlined checkout process with token-based validation. 
- 🤖 **AI Assistant**: Private admin AI to help manage the store. 
- 🖼️ **Image Handling**: Image compression and lazy loading for optimized performance. 
- 📈 **Real-time Analytics**: Track statistics of the store. 
- 🛠️ **Modular Components:** Reusable UI elements and organized architecture for maintainability.
- 🚀 **Optimized Build Process:** Streamlined workflows with Vite, TailwindCSS, and TypeScript configurations.
- 🔒 **Secure API & Authentication:** Robust route protection, session management, and user authentication.
- 🖼️ **Media & Image Utilities:** Image transformation, WebP conversion, and cloud uploads for performance.
- 📊 **State & Data Management:** Centralized store with Redux Toolkit, React Query, and data validation schemas.
- ⚙️ **Flexible Routing & Admin Tools:** Organized navigation, admin dashboards, and private pages.

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
 
 
 
 
 

 

## System Architecture

The application follows a client-server architecture with clear separation between infrastructure/presentation and business logic layers. The frontend implements a **React SPA** with **Redux** state management and **React Query** for server communication, while the backend uses **Clean Architecture** principles with **Express.js** and **Prisma ORM**.

[IMAGE]

## Technology Stack
The system leverages modern web technologies across both client and server implementations:

| Layer             | Technology                       | Key Packages                                                                                                                |
|-------------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Frontend**      | React 19, TypeScript, Vite       | `react`, `react-router-dom`, `@reduxjs/toolkit`, `@tanstack/react-query`                                                   |
| **UI Framework**  | Tailwind CSS, Radix UI, Shadcn   | `tailwindcss`, `@radix-ui/react-*`, `lucide-react`,                                                                         |
| **Data Table**  | Tanstack React Table and Shadcn    | `@tanstack/react-table`,                                                                                                     |
| **Form**  | React Hook Form and Zod for Validations    | `react-hook-form`,  `zod`,                                                                                                      |
| **State Management** | Redux Toolkit, React Query    | `@reduxjs/toolkit`, `react-redux`, `@tanstack/react-query`                                                                |
| **Backend**       | Node.js, Express 5, TypeScript   | `express`, `typescript`, `tsx`                                                                                             |
| **Database**      | MongoDB with Prisma ORM          | `@prisma/client`, `prisma`                                                                                                 |
| **Authentication**| JWT, Bcrypt                      | `jsonwebtoken`, `bcryptjs`                                                                                                 |
| **External APIs** | WhatsApp Web.js, OpenAI          | `whatsapp-web.js`, `openai`                                                                                                |
| **Development**   | Vite, ESLint, Jest               | `vite`, `eslint`, `jest`, `supertest`                                                                                      |


## Core Businnes Processes

### Shopping Cart Management
The shopping cart system uses Redux for local state management with the `cartSlice` maintaining cart items in browser storage. Cart operations are handled through Redux actions without server persistence until checkout.

### Checkout Process
The checkout flow implements a token-based session system:
- **Session Creation**: `CartCheckoutButton` calls `useCheckoutSessionMutations.doCheckoutSession()`
- **Token Generation**: Server creates a unique checkout token and returns checkout URL
- **Validation**: `CheckoutGuard` validates the token before rendering `Checkout` component
- **Order Submission**: `CheckoutForm` submits `CreateOrderDto` to `/api/orders`

### Order Management
Order follow this lifecycle:
- **Creation**: The use-case `CreateOrderService` builds `Order` entity using `OrderBuilder` pattern
- **WhatsApp Notification**: `SendMessageToCustomerByWhatsApp` sends automated message
- **Status Tracking**: Orders progress through `WhatsAppStatusNames` (PENDING -> SENT -> RESPONDED -> COMPLETED)

### Authentication & Authorization
- **Public Routes**: Product browsing, cart management, checkout process
- **Private Routes**: Admin panel protected by `AuthGuard` using JWT validation
- **Middleware**: `AuthMiddleware` validates JWT tokens for admin endpoints 

## Key Components & Entities

### Frontend Core Components
- **MainLayout**: Public route wrapper with Navbar and Footer
- **AdminLayout**: Private admin interface with SidebarProvider and TopAdminNav
- **CheckoutGuard**: Route guard validating checkout tokens via useCheckoutSession
- **CartCheckoutButton**: Initiates checkout flow with pilot ID generation

### Backend Domain Entities
- **Order**: Central business entity with calculateTotals() and generateWhatsAppMessage() methods
- **OrderItem**: Product line items within orders
- **OrderBuilder/OrderItemBuilder**: Builder pattern for entity construction
- **WhatsAppStatusNames**: Enum defining order status lifecycle

### Service Layer
- **CreateOrderService**: Orchestrates order creation with WhatsApp messaging
- **PrismaOrderRepositoryImpl**: Data persistence using Prisma ORM
- **SendMessageToCustomerByWhatsApp**: WhatsApp Web.js integration with queue management

### External Integrations
- **WhatsApp Integration**: Automated order notifications with QR authentication
- **AI Assistant**: OpenAI integration for admin content generation
- **Image Management**: Cloudinary for product image handling

## Want to Dive Deeper?
If you're interested in exploring this project further, check out the full documentation:  
[E-Commerce Valentin Zoia 2025](https://deepwiki.com/ValentinZoia/e-commerce/1-overview).  
You’ll find a sidebar with detailed navigation. Enjoy! 🎉















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
    - Ensure that you have a Mongodb database running.
    - Configure the database connection in the `.env` file in the `server` directory.
    ```
    DATABASE_URL="<your-mongodb-url>"
    ```
    - Generate the Prisma client:
    ```bash
    npm run prisma:generate
    ```



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



### Key Functionality and Usage Examples:
1.  **Product Display:** Products are fetched and displayed using React components within the `client/src/components` directory. Data is fetched using TanStack React Query. Example usage:
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

2.  **Form Handling:** React Hook Form is used for managing forms, with Zod for schema validation. Example usage from the client side:
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

3.  **Authentication:** The application implements authentication using JWTs, with middleware for protecting routes. The `AuthGuard` component in `client/src/guards/auth.guard.tsx` handles route protection.

4.  **Checkout Process:** The checkout process is initiated using tokens, validated by the `CheckoutGuard` in `client/src/guards/checkout.guard.tsx`. The route `/checkout/:token` is used for checkout.



## How to Use
This e-commerce platform is designed for both customers and administrators. Customers can browse products, add them to their cart, and proceed to checkout. Administrators can manage products, categories, and orders through the admin panel.



### Real-world Use Cases
1.  **Online Retail:** Launch an online store to sell products directly to customers. 🛍️
2.  **Inventory Management:** Efficiently manage product inventory and track stock levels. 📦
3.  **Customer Relationship Management:** Collect customer data and personalize the shopping experience. 👤
4.  **Data Analytics:** Use analytics to gain insights into customer behavior and optimize sales strategies. 📊
5.  **AI-Driven Assistance:** Use AI assistance for customer support, product recommendations, and marketing efforts. 🤖



## Project Structure
The project is structured as a monorepo, with separate directories for the client and server.

```
├── client/                  # Frontend application
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── guards/        # Route guards
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   ├── utilities/     # Utility functions
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # Entry point
│   │   └── routes/        # Application routes
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite configuration
├── server/                  # Backend application
│   ├── src/               # Source code
│   │   ├── app.ts         # Entry point
│   │   ├── server.ts      # Server setup
│   │   ├── routes/        # API routes
│   │   └── shared/        # Shared modules
│   ├── package.json         # Dependencies and scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── prisma/            # Prisma schema and migrations
├── README.md                # Project documentation
└── .gitignore               # Specifies intentionally untracked files that Git should ignore
```



## Contributing
We welcome contributions to this project! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request.



## License
This project has no license.



## Important Links
- **GitHub Repository**: [https://github.com/ValentinZoia/e-commerce](https://github.com/ValentinZoia/e-commerce)



## Footer
Made with ❤️ by [ValentinZoia](https://github.com/ValentinZoia).

Fork, like ⭐, and raise issues [here](https://github.com/ValentinZoia/e-commerce).




