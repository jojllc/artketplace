// Import the tools we need
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the Supabase client (our kitchen key)
const supabase = require('./src/config/supabaseClient');

// Create our Express app (our restaurant manager)
const app = express();

// Set up middleware (our restaurant's rules and procedures)

// 1. CORS middleware (our bouncer)
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://localhost:3001'] 
    : ['https://your-frontend-domain.com'], // Change this to your actual frontend URL
  credentials: true
}));

// 2. JSON parser middleware (translates messages)
app.use(express.json());

// 3. URL-encoded parser middleware (handles form data)
app.use(express.urlencoded({ extended: true }));

// Basic route to test if our server is working
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Artketplace Backend! 🎨',
    status: 'Server is running',
    environment: process.env.NODE_ENV
  });
});

// Health check route (like checking if the restaurant is open)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Test Supabase connection route
// This route checks if your backend can talk to Supabase and read from a real table
app.get('/test-supabase', async (req, res) => {
  try {
    // Fetch all rows from the public.test_table
    const { data, error } = await supabase.from('test_table').select('*');
    if (error) {
      // If there's an error, show it
      return res.status(500).json({ success: false, error: error.message });
    }
    // If it works, show the data (should include your "Hello World" row)
    res.json({ success: true, data });
  } catch (err) {
    // Catch any unexpected errors
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /artworks - List all artworks
// This route fetches all artworks from the database and returns them as JSON
app.get('/artworks', async (req, res) => {
  try {
    // Query the artworks table for all rows
    const { data, error } = await supabase.from('artworks').select('*');
    if (error) {
      // If there's an error, show it
      return res.status(500).json({ success: false, error: error.message });
    }
    // Return the list of artworks
    res.json({ success: true, artworks: data });
  } catch (err) {
    // Catch any unexpected errors
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /artworks - Add a new artwork
// This route accepts artwork data and inserts it into the database
app.post('/artworks', async (req, res) => {
  try {
    // Get artwork data from the request body
    const { title, description, image_url, price, artist_id } = req.body;

    // Basic validation (make sure required fields are present)
    if (!title || !price || !artist_id) {
      return res.status(400).json({ success: false, error: 'Missing required fields: title, price, or artist_id' });
    }

    // Insert the new artwork into the artworks table
    const { data, error } = await supabase
      .from('artworks')
      .insert([{ title, description, image_url, price, artist_id }])
      .select(); // .select() returns the inserted row(s)

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    // Return the newly created artwork
    res.status(201).json({ success: true, artwork: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get the port from our environment variables (or use 3001 as backup)
const PORT = process.env.PORT || 3001;

// Start the server (open the restaurant for business!)
app.listen(PORT, () => {
  console.log(`🎨 Artketplace Backend Server is running!`);
  console.log(`📍 Server address: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('🚀 Ready to handle requests!');
});

// Handle graceful shutdown (like closing the restaurant properly)
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  process.exit(0);
});

module.exports = app; 