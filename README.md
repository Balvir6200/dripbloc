# DripBloc

> Premium multi-category printing SaaS built with Laravel + React.

DripBloc is a modern category-driven printing platform designed for businesses that want a premium online ordering experience for custom print products.  
Instead of treating every item as a simple product listing, DripBloc is built around **categories as configurable systems**, allowing each category to have its own sizes, design specifications, templates, and purchase flow.

---

## Overview

DripBloc is not a basic product catalog.

It is a **scalable printing SaaS architecture** where:

- **Categories** act as the main entry layer
- **Subcategories** organize product structure
- **Products** represent purchasable printing items
- **Category Sizes** support both standard and custom dimension-based sizing
- **Design Specs** define production requirements and downloadable guidelines

This makes the platform flexible for multiple print industries such as:

- Apparel printing
- Marketing materials
- Packaging
- Large format print
- Business stationery
- Promotional products

---

## Key Features

- Premium modern storefront UI
- Category-first architecture
- Dynamic category pages
- Flexible size system
- Standard sizes and dimension-based sizes
- Product configuration flow
- Design specification management
- Template / design guide download support
- Laravel MVC backend
- React-powered interactive frontend
- Admin panel for managing categories, products, sizes, and specs

---

## Why This Project Stands Out

Most printing platforms are built like standard e-commerce stores.

DripBloc is different because it focuses on **structured printing workflows** instead of just product cards.

This allows:

- easier scaling across multiple print categories
- cleaner product configuration
- better handling of technical print requirements
- stronger long-term SaaS potential

---

## Tech Stack

**Backend**
- Laravel
- PHP
- MVC Architecture
- RESTful APIs

**Frontend**
- React JS
- Tailwind CSS
- Vite
- Framer Motion
- Lucide Icons

**Database**
- MySQL / SQLite (local development)

---

## Core Modules

### Customer Side
- Homepage with premium category-focused layout
- Category listing
- Dynamic category page
- Product detail page
- Size selection flow
- Design upload / design guidance flow

### Admin Side
- Category management
- Subcategory management
- Product management
- Category size management
- Design specs management
- Product structure control

---

## Architecture Approach

DripBloc follows a **category-driven architecture**:

```text
Category
 ├── Subcategories
 ├── Products
 ├── Sizes
 ├── Design Specs
 └── Templates / Downloads
