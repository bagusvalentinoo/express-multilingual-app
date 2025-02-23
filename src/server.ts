import app from '@/app'
import { logInfo } from '@/utils/logger.util'

// Get the port from the environment
const port = Number(process.env.APP_PORT) || 8000

// Start the server
app.listen(port, () => {
  logInfo(`Server running on http://localhost:${port}`)
})
