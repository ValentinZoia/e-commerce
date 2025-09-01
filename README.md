# E-commerce 🛍️
[![React](https://img.shields.io/badge/React-v19.0.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.7.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-%5E6.2.0-blue)](https://vitejs.dev/)

An e-commerce platform built with React, TypeScript, and Vite, leveraging modern web development practices and a component-driven architecture.



## Table of Contents
- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)



## Description
This project implements an e-commerce platform featuring product listings, shopping cart functionality, user authentication, and administrative capabilities. It utilizes a modern tech stack, including React for the frontend, TypeScript for type safety, and Vite for fast development and build times. The backend, built with Node.js, Express, and Prisma, provides API endpoints for managing products, categories, orders, and user authentication.



## Features
- **Product Listings**: Display of products with details such as name, description, price, and images. 🖼️
- **Category Management**: Categorizing products for easy navigation. 🏷️
- **Shopping Cart**: Add, remove, and manage products in a shopping cart. 🛒
- **User Authentication**: Secure user login and registration. 🔑
- **Admin Panel**: Administrative interface for managing products, categories, and orders. ⚙️
- **Checkout Process**: Streamlined checkout process with token-based validation. 💳
- **AI Assistant**: Private admin AI to help manage the store. 🤖
- **Image Handling**: Image compression and lazy loading for optimized performance. 🖼️
- **Real-time Analytics**: Track statistics of the store. 📈



## Tech Stack
- **Frontend**: 
  - [React](https://react.dev/) - A JavaScript library for building user interfaces. ⚛️
  - [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript. 🟦
  - [Vite](https://vitejs.dev/) - A build tool that provides a fast and performant development experience. 🚀
  - [Redux Toolkit](https://redux-toolkit.js.org/) - For state management. 🧰
  - [TanStack React Query](https://tanstack.com/query/latest) - For data fetching and caching.
  - [TanStack React Table](https://tanstack.com/table/v8) - For building tables.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework. 🎨
  - [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
  - [React Hook Form](https://react-hook-form.com/) - For form management and validation. 📝
  - [Radix UI](https://www.radix-ui.com/) - For accessible UI components.
- **Backend**: 
  - [Node.js](https://nodejs.org/en) - JavaScript runtime environment. 🟢
  - [Express](https://expressjs.com/) - A web application framework for Node.js. 🌐
  - [Prisma](https://www.prisma.io/) - Next-generation ORM. 📊



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
    - Ensure that you have a PostgreSQL database running.
    - Configure the database connection in the `.env` file in the `server` directory.
    ```
    DATABASE_URL="postgres://user:password@host:port/database"
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



## My Project Logo

![Project Logo](https://placehold.co/200x80?text=Logo+Placeholder "The logo I designed represents [meaning]")
