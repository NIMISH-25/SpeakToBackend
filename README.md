# SpeakToBackend  

In an age where technology continues to redefine the boundaries of innovation, our project stands as a testament to seamless AI integration for backend operations. This cutting-edge solution boasts a rich and robust API framework, complete with user authentication for secure login/signup and comprehensive CRUD functionalities that meet the demands of modern applications. Our interface is designed for simplicity and efficiency, a user-friendly text input box allows users to communicate naturally with the AI agent, while the dynamically generated JSON output is conveniently displayed on the same page for easy review and modification. This ensures not only transparency but also empowers users to make instant adjustments before execution.

What sets our MVP apart is its dual functionality: the API we developed isn’t just an operational backbone, it solves the first problem statement of the hackathon itself, exemplifying the philosophy of achieving more with less effort. By integrating versatility with user-centric design, we’ve accomplished an MVP that is more than a solution; it’s a revolutionary tool poised to transform backend system management.  

---

## Overview  
SpeakToBackend enables users to interact with backend services using natural language commands, streamlining operations and reducing the need for technical expertise.  

---

## Prerequisites  
Before proceeding with the setup, ensure the following are installed on your system:  
- [Node.js](https://nodejs.org/) (v14 or higher recommended)  
- [npm](https://www.npmjs.com/)
- [React](https://react.dev/)
---

## Installation Steps for Backend Service

### 1. Navigate to the BackendService Directory  
```bash  
cd BackendService
```

### 2. Install Required Dependencies
Run the following command to install all necessary packages:

```bash
npm install
```

### 3. Running the Service
1. Start the service:
    ```bash
    npm start
    ```
2. Access the application at http://localhost:8080.

### 4. Create Users
To create users, refer to the Swagger documentation included in the project files:
1. Locate the Swagger file (swagger.json) in the project directory.
2. Use an online Swagger editor or a tool like Swagger UI to open and explore the API documentation.
3. Follow the documented routes to create:
    - *Normal User*: Basic access to the system.
    - *Admin User*: Privileged access for administrative operations

---

## Installation Steps for Agent Service

### 1. Navigate to the AgentService Directory  
```bash  
cd AgentService
```

### 2. Install Required Dependencies
Run the following command to install all necessary packages:

```bash
npm install
```

### 3. Add OpenAI and other credentials
Create .env file and add the following keys in the file and add your respective values-
```bash
API_KEY
ASSISTANT_ID
PROJECT_ID
ORGANIZATION_ID
BACKEND_DEMO_API(This is the URL for BackendService)
```

### 4. Running the Service
1. Start the service:
    ```bash
    npm start
    ```
2. Access the application at http://localhost:8000.

---

## Installation Steps for Agent View

### 1. Navigate to the AgentView Directory  
```bash  
cd AgentView
```

### 2. Install Required Dependencies
Run the following command to install all necessary packages:

```bash
npm install
```

### 3. Add credentials to env file
Create .env file and add the following keys in the file and add your respective values-
```bash
REACT_APP_BACKEND_API (This is the URL for AgentService)
```

### 3. Running the Service
1. Start the service:
    ```bash
    npm start
    ```
2. Access the application at http://localhost:3000.
