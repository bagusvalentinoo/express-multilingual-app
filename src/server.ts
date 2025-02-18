import app from '@/app'

import logger from '@/utils/logger.util'

// Get the port from the environment
const port = Number(process.env.APP_PORT) || 8000

// Start the server
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`)
})
