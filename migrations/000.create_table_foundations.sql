CREATE TABLE foundations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  email TEXT,
  phone TEXT,
  supported_institution TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP DEFAULT NULL
);