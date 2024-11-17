# SpeakToBackend  

A natural language processing (NLP)-based AI agent for seamlessly operating backend systems.  

---

## Overview  
SpeakToBackend enables users to interact with backend services using natural language commands, streamlining operations and reducing the need for technical expertise.  

---

## Prerequisites  
Before proceeding with the setup, ensure the following are installed on your system:  
- [Node.js](https://nodejs.org/) (v14 or higher recommended)  
- [npm](https://www.npmjs.com/)  

---

## Installation Steps  

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
2. Access the application at http://localhost:<PORT> (default port is typically 3000).


### 4. Create Users
To create users, refer to the Swagger documentation included in the project files:
1. Locate the Swagger file (swagger.json) in the project directory.
2. Use an online Swagger editor or a tool like Swagger UI to open and explore the API documentation.
3. Follow the documented routes to create:
    - *Normal User*: Basic access to the system.
    - *Admin User*: Privileged access for administrative operations
