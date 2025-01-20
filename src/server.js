import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

import app from './app.js'

import logger from './utils/logger.js'

// Get the port from environment variables
const PORT = Number(process.env.APP_PORT) || 8000

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
})
