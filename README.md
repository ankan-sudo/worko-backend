# Worko Backend API

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/ankan-sudo/worko-backend.git
    cd worko-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:
    ```plaintext
    DB_URI=mongodb://localhost:27017/worko
    PORT=3000
    SECRET_KEY=your_secret_key
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Run tests:
    ```bash
    npm test
    ```

## Usage

### Endpoints

- `GET /worko/user` - List all users
- `GET /worko/user/:userId` - Get user details
- `POST /worko/user` - Create a new user
- `PUT /worko/user/:userId` - Update user details
- `DELETE /worko/user/:userId` - Soft delete a user

## Authentication

Basic authentication is implemented. Use `admin` as the username and `adminpass` as the password for authentication.
