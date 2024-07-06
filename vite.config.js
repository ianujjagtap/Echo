import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host:true // Set the host to 0.0.0.0 to be accessible on the local network
  //          // You can specify a different port if you prefer
  // }
})
