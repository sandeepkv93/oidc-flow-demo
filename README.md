# OpenID Connect Flow Demonstration

## Overview

This React application provides an interactive demonstration of the OpenID Connect (OIDC) authentication flow. It aims to help developers and curious individuals understand the step-by-step process of how modern web applications handle user authentication and authorization using OIDC.

## Features

- Interactive step-by-step guide through the OIDC flow
- Detailed explanations of each step in the process
- Visualizations using Mermaid diagrams
- Responsive design for both desktop and mobile viewing

## Live Demo

You can view the live demo of this application at: https://sandeepkv93.github.io/oidc-flow-demo/

## Local Development

To run this project locally:

1. Clone the repository:

```sh
git clone https://github.com/your-username/your-repo-name.git
```

2. Navigate to the project directory:

```sh
cd your-repo-name
```

3. Install dependencies:

```sh
npm install
```

4. Start the development server:

```sh
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

To build the app for production:

1. Run the build command:
   npm run build
   Copy
2. The build artifacts will be stored in the `build/` directory.

## Deploying to GitHub Pages

1. Ensure your project's `package.json` has the correct `homepage` field:

```json
"homepage": "https://your-username.github.io/your-repo-name"
```

Run the deploy command:

```sh
npm run deploy
```

This will build the app and push it to the gh-pages branch of your repository.

## Understanding the OIDC Flow

This application demonstrates the following steps in the OIDC flow:

1. Developer Registers Application
1. User Attempts to Access Protected Resource
1. App Redirects to Authorization Server
1. User Authenticates and Grants Permissions
1. Authorization Server Issues Code
1. App Exchanges Code for Tokens
1. Authorization Server Returns Tokens
1. App Processes ID Token
1. App Requests Protected Resource
1. Resource Server Returns Protected Resource
1. App Displays Protected Resource

Each step is explained in detail within the application, along with visual representations using Mermaid diagrams.

## Technologies Used

- React
- Mermaid (for diagrams)
- Tailwind CSS (for styling)
