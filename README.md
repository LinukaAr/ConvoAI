# ConvoAI: A Conversational AI Application

This project is a user-friendly web application that leverages Google's Gemini AI model to provide conversational AI experiences. Users can interact with the AI through natural language prompts, receiving responses in a dynamic and engaging manner.

Project Live at: https://convoai-ad808.firebaseapp.com/

## Features

- **Google Sign-In**: Secure user authentication using Google Sign-In for personalized experiences.
- **Chat History**: Persistent chat history stored in Firestore, allowing users to revisit past conversations.
- **Dynamic Responses**: Utilizes Gemini AI to generate responses in real-time, providing a conversational feel.
- **User Interface**: Designed a clean and intuitive user interface for seamless interaction with the AI.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: A suite of services for web and mobile app development, including:
  - **Firestore**: A NoSQL database for storing and retrieving data.
  - **Authentication**: A service for managing user authentication.
  - **Hosting**: A service for deploying and hosting web applications.
- **Google Generative AI API**: An API for accessing Google's Gemini AI model.

## Project Structure

The project is structured as follows:
``` bash
ConvoAI
├── src
│ ├── components
│ │ ├── Main.jsx
│ │ ├── UserIcon.jsx
│ │ └── ...
│ ├── context
│ │ └── Context.jsx
│ ├── assets
│ │ └── assets.js
│ ├── firebaseConfig.js
│ └── ...
├── firebase.json
├── package.json
├── package-lock.json
└── ...
```

- **src**: Contains the source code for the application.
  - **components**: Contains reusable UI components.
  - **context**: Contains the application's global state and functions.
  - **assets**: Contains images and other assets used in the application.
  - **firebaseConfig.js**: Contains the configuration for Firebase.
- **firebase.json**: Contains the configuration for Firebase Hosting.
- **package.json**: Contains the project's dependencies and scripts.
- **package-lock.json**: Contains the locked versions of the project's dependencies.

## Getting Started

### Clone the Repository:

```bash
git clone https://github.com/LinukaAr/ConvoAI.git
```

### Install Dependencies
```bash
cd ConvoAI
npm install 
```

### Set Up Firebase
Create a new Firebase project.
Enable Firestore and Authentication in your Firebase project.
Create a new Firebase Hosting site.
Configure the Firebase project in firebaseConfig.js.

### Run the Development Server
```bash
npm run dev
```
### Deploy to Firebase Hosting
``` bash
npm run build
firebase deploy
```

## Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License
<div align = "center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)</br>
This project is licensed under the MIT License.
</div>
