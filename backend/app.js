const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routers/task-routes');
const sequelize = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  try {
    // Initialize Express
    const app = express();
    const CLIENT_PORT = 3000;
    const corsOptions = {
      origin: [`http://127.0.0.1:${CLIENT_PORT}`, `http://localhost:${CLIENT_PORT}`],
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/api', routes);

    // Sync database
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');

    // Start server
    const PORT = process.env.SERVER_PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running, listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during app initialization:', error);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log('App initialized successfully');
  })
  .catch((error) => {
    console.error('App initialization failed:', error);
  });
