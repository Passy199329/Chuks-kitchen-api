# Chuks Kitchen API - Backend Implementation

## Project Overview
This is the backend REST API for **Chuks Kitchen**, a food delivery application. This project satisfies the requirements for the Backend Developer Internship Task, focusing on user authentication, food management, and order lifecycle tracking.

## Key Features & Case Scenarios
Based on the project specifications, the following logic has been implemented:

### 1. User Access & Registration (Requirement A)
* **Dual-Method Signup:** Users can register using either their **Email** or **Phone Number**.
* **Referral System:** Includes an optional field for a **Referral Code** during registration.
* **Security:** Password hashing and account verification.

### 2. Account Verification (Requirement B)
* **OTP System:** Secure OTP generation sent via Email to verify user identity before full access is granted.

### 3. Ordering Flow (Requirement C)
* **Order Status Lifecycle:** The backend tracks orders through the following stages:
    * `Pending` (Default)
    * `Confirmed`
    * `Preparing`
    * `Out for Delivery`
    * `Completed`
    * `Cancelled`
* **Cart Management:** Logic to handle item selection, quantity updates, and total price calculation.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB via Mongoose
* **Authentication:** JWT (JSON Web Tokens) & OTP

## Project Structure
```text
config/         # Database connection settings
models/         # Database Schemas (User, Food, Order, Cart)
routes/         # API Endpoints (userRoutes, orderRoutes, etc.) utils/          # Helper functions (OTP generator, Email handler)
server.js       # Entry point
