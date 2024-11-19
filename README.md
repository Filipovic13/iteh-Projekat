# Tournament Registration System and Martial Arts Web Shop

This is a web application designed to manage tournaments and a product shop. The application has two primary user types:

- **Admins** can manage tournaments (create, edit, delete), manage product listings, and view user registrations for tournaments.
- **Regular Users** can browse products, add items to their cart, complete checkout, and register for tournaments.

The app is built with **React** for the frontend, **Axios** for communication between the frontend and backend, and **Laravel** for the backend.

## Features

### Admin Features:
- **Dashboard**: View statistics on registered users and tournaments.
- **Tournaments**: Add, edit, or delete tournaments.
- **Products**: Manage shop products (Add, Edit, Delete).
- **User Registrations**: View and manage user registrations for tournaments.
- **Profile**: Admin can view and update their profile.

### User Features:
- **Product Catalog**: View products and add them to the cart.
- **Cart & Checkout**: Users can manage their cart and complete the checkout process.
- **Tournament Registration**: Users can register for tournaments.
- **Profile Management**: Users can view and update their profile.

## Setting up Backend - Laravel project

1. Prerequisites
  Composer
  ```
  composer install
  ```
2. Clone the repository
```
git clone laravel-backend
```
3. Set up the .env file
  ```
  cp .env.example .env
  ```
4. Environment Configuration

The `.env` file is used to configure your environment variables. Below is a template for setting up your local environment. Copy the content into a `.env` file in the root of your project.

### .env Example

```
APP_NAME=Laravel                                 # Name of your application (default: Laravel)
APP_ENV=local                                    # Environment for local development (could be 'local', 'production', etc.)
APP_KEY=base64:your_generated_app_key            # Run `php artisan key:generate` to generate this key
APP_DEBUG=true                                   # Set to `false` in production to hide error details
APP_URL=http://localhost                         # Your local application URL

LOG_CHANNEL=stack                                # Log output channel (stack for multi-channel logging)
LOG_LEVEL=debug                                  # Logging level (adjust as needed)
LOG_DEPRECATIONS_CHANNEL=null                    # Channel for deprecated warnings

DB_CONNECTION=mysql                             # Database connection type (use 'mysql', 'pgsql', etc.)
DB_HOST=127.0.0.1                               # Database host (default is localhost)
DB_PORT=3309                                     # Database port (change if necessary, default MySQL is 3306)
DB_DATABASE=your_database_name                  # Your database name (e.g., 'iteh_projekat')
DB_USERNAME=your_database_username              # Your database username (e.g., 'root')
DB_PASSWORD=your_database_password              # Your database password (leave blank for no password)

BROADCAST_DRIVER=log                            # Driver for broadcasting events (usually 'log' for local, 'pusher' for production)
CACHE_DRIVER=file                               # Cache driver (use 'redis' or 'file' for local setup)
FILESYSTEM_DISK=local                           # File system disk (set to 's3' for AWS or 'local' for local storage)
QUEUE_CONNECTION=sync                           # Queue connection (set to 'database', 'redis', or 'sync')
SESSION_DRIVER=file                             # Session driver (use 'file', 'cookie', or 'database')
SESSION_LIFETIME=120                            # Session lifetime in minutes

MEMCACHED_HOST=127.0.0.1                        # Host for Memcached (optional)
REDIS_HOST=127.0.0.1                            # Host for Redis (optional)
REDIS_PASSWORD=null                             # Redis password (if set, provide the password)
REDIS_PORT=6379                                 # Redis port (default: 6379)

MAIL_MAILER=smtp                                # Mailer to use for sending emails (default: smtp)
MAIL_HOST=mailhog                               # Your local mail server (MailHog is often used for local dev)
MAIL_PORT=1025                                  # SMTP port (default for MailHog is 1025)
MAIL_USERNAME=null                              # SMTP username (set if your SMTP server requires authentication)
MAIL_PASSWORD=null                              # SMTP password (set if required by your mail provider)
MAIL_ENCRYPTION=null                            # Encryption for mail (e.g., 'tls', 'ssl')
MAIL_FROM_ADDRESS="hello@example.com"           # The email address used for sending emails
MAIL_FROM_NAME="${APP_NAME}"                    # The name displayed as the sender (usually the app's name)

# AWS Configuration (Optional)
AWS_ACCESS_KEY_ID=                              # Your AWS Access Key ID (remove if you're not using AWS)
AWS_SECRET_ACCESS_KEY=                          # Your AWS Secret Access Key (remove if not using AWS)
AWS_DEFAULT_REGION=us-east-1                    # Your AWS Region (remove if not using AWS)
AWS_BUCKET=                                     # Your AWS S3 bucket name (remove if not using AWS)
AWS_USE_PATH_STYLE_ENDPOINT=false               # Set to `true` if using path-style S3 endpoint (optional)

# Pusher Configuration (Optional)
PUSHER_APP_ID=                                  # Your Pusher App ID (remove if not using Pusher)
PUSHER_APP_KEY=                                 # Your Pusher App Key (remove if not using Pusher)
PUSHER_APP_SECRET=                              # Your Pusher App Secret (remove if not using Pusher)
PUSHER_HOST=                                    # Pusher Host URL (optional)
PUSHER_PORT=443                                 # Pusher Port (default 443)
PUSHER_SCHEME=https                             # Pusher Scheme (usually 'https')
PUSHER_APP_CLUSTER=mt1                          # Pusher Cluster (e.g., 'mt1', 'us2')

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"         # Used for frontend integration with Pusher
VITE_PUSHER_HOST="${PUSHER_HOST}"               # Frontend Pusher host URL
VITE_PUSHER_PORT="${PUSHER_PORT}"               # Frontend Pusher port
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"           # Frontend Pusher scheme (usually 'https')
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}" # Frontend Pusher cluster
```

5. Generate an application key:
  ```
  php artisan key:generate
  ```

6. Run migrations and seed the database:
  ```
  php artisan migrate --seed
  ```
  - command runs all pending database migrations to update the schema and then populates the database with seed data from the seeder classes.

7. Start the development server
  ```
  php artisan serve
  ```
  
# Database Schema
## Users Table

The `Users` table contains information about the users of the system.

| Column      | Type      | Description                  |
|-------------|-----------|------------------------------|
| `id`        | Integer   | Primary key                  |
| `name`      | String    | User's name                  |
| `email`     | String    | User's email                 |
| `password`  | String    | Encrypted password           |
| `role`      | String    | Role of the user (user or admin) |
| `created_at`| Timestamp | Auto-generated timestamp when the user was created |

## Tournaments Table

The `Tournaments` table stores information about various tournaments.

| Column       | Type      | Description                        |
|--------------|-----------|------------------------------------|
| `id`         | Integer   | Primary key                        |
| `event_name` | String    | Name of the tournament            |
| `country`    | String    | Location country                  |
| `city`       | String    | Location city                     |
| `ruleset`    | String    | Tournament ruleset                |
| `date`       | Date      | Date of the tournament            |
| `image_url`  | String    | URL for the tournament poster image |

## Products Table

The `Products` table contains information about the products available for sale.

| Column      | Type      | Description                        |
|-------------|-----------|------------------------------------|
| `id`        | Integer   | Primary key                        |
| `name`      | String    | Name of the product               |
| `price`     | Decimal   | Price of the product              |
| `category`  | String    | Category of the product           |
| `quantity`  | Integer   | Available stock quantity          |
| `brand`     | String    | Product brand                     |
| `description`| Text     | Description of the product        |

---


## Frontend  React

### For Admins:
- **Dashboard**: View system statistics and the number of registrations.
- **Tournaments**: Manage tournaments (Add, Edit, Delete).
- **Products**: Manage shop items (Add, Edit, Delete products).
- **User Registrations**: View, approve or reject user registrations for tournaments.
- **Profile Management**: Admin can view and edit their profile.

### For Regular Users:
- **Product Catalog**: Browse available products and add them to the cart.
- **Cart & Checkout**: Users can view their cart and complete the checkout process.
- **Tournament Registration**: Users can view available tournaments and register for them.
- **User Profile**: Users can view and update their profile.

### Dependencies
- React: JavaScript library for building user interfaces.
- React Router DOM: Declarative routing for React.
- Axios: Promise-based HTTP client for making API requests.
- SweetAlert2: Used to display beautiful pop-up alerts.Bootstrap: CSS framework for building responsive layouts.
- React Bootstrap: React components built using Bootstrap.
- React Icons: For icons in the app.

## How to Run the Application
1.  Clone the repository
2.  Install dependencies
  ```
  npm install
  ```
3. Run the app
  ```
  npm start
  ```
  - The application will run on http://localhost:3000. Open this in your browser to access the app.

## Contributors
- [Adriana Vasović](https://github.com/AdrianaV1999)
- [Sara Filipović](https://github.com/Filipovic13)

  
