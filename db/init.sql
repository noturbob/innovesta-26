-- 1. Create the Enum type for the 6 specific events
CREATE TYPE event_enum AS ENUM (
  'Venture Vault',
  'Meme Market',
  'Brand Revival Challenge',
  'Tech Trek',
  'Tune Trap',
  'Corporate Canvas'
);

-- 2. Create the Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  
  -- Personal Details
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  
  -- College Details
  college_name VARCHAR(255) NOT NULL,
  college_address TEXT,
  discipline VARCHAR(100) NOT NULL,
  roll_number VARCHAR(100) NOT NULL,
  year_of_study VARCHAR(20) NOT NULL,
  
  -- Event Selection
  event_name event_enum NOT NULL,
  
  -- Payment Proof
  transaction_id VARCHAR(100) NOT NULL UNIQUE,
  
  -- STORES THE ACTUAL IMAGE DATA (Binary)
  screenshot BYTEA NOT NULL,
  
  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);