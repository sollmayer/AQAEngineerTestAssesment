# Playlist App - UI Test Automation

This project contains automated UI tests for the Playlist App, implemented using Playwright and TypeScript.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or higher recommended)
-   npm (comes with Node.js)

## Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd aqa-playlist-assessment
    ```

2.  **Install dependencies:**
    This command installs Playwright and all other necessary packages.
    ```sh
    npm install
    ```

3.  **Create the Environment File:**
    This project uses a `.env` file to store the application's base URL. Create a new file named `.env` in the root directory of the project.
    Then, copy and paste the following line into your new `.env` file:
    ```env
    BASE_URL=https://vite-react-alpha-lemon.vercel.app/
    ```

## Running the Tests

You can execute the test suite using the following commands.

-   **Run all tests (headless):**
    ```sh
    npm run test
    ```

-   **Run tests with a visible browser (headed mode):**
    ```sh
    npm run test:headed
    ```

## Viewing the Test Report

After the tests have finished, an HTML report is available. To view it, run:
```sh
npm run report