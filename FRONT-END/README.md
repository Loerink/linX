# linX Frontend

## Setup and Run Instructions

This project uses Tailwind CSS for styling and React for building the UI.

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Loerink/linX.git
   cd linX/FRONT-END
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Tailwind CSS Configuration

Tailwind CSS is already configured in this project. The configuration files are:

- `tailwind.config.js`:
  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

- `postcss.config.js`:
  ```javascript
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```

- `src/index.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### Running the Application

To start the development server, run:
```bash
npm start
```

This will start the application at [http://localhost:3000](http://localhost:3000).

### Additional Notes

- Ensure all necessary files are in place and paths are correct.
- If you encounter any issues, verify the Tailwind CSS setup and ensure dependencies are correctly installed.