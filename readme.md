Playlist App Test Automation
**Prerequisites**
  Node.js (v18.x or higher recommended)
  npm (comes with Node.js)

**Setup**
Clone the repository:
  git clone https://github.com/sollmayer/AQAEngineerTestAssesment.git
  cd AQAEngineerTestAssesment

Install dependencies using the following command:
  npm install

Create the Environment File:
  This project uses a .env file to store the application's base URL. Create a new file named .env in the root directory of the project.
  Then, copy and paste the following line into your new .env file:
  BASE_URL=https://vite-react-alpha-lemon.vercel.app/

**Running the Tests**
You can execute the test suite using the following commands.
  Run all tests (headless):
  npm run test

Run tests with a visible browser (headed mode):
  npm run test:headed

Viewing the Test Report
  npm run report
