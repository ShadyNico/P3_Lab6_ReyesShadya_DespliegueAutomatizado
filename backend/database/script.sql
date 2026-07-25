CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO roles (nombre)
VALUES ('ADMIN'), ('VENDEDOR'), ('CLIENTE')
ON CONFLICT (nombre) DO NOTHING;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  id_rol INTEGER NOT NULL REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  imagen TEXT
);

INSERT INTO productos (nombre, descripcion, stock, price, imagen)
SELECT
  'Portal Gun Mini',
  'Réplica coleccionable del dispositivo de portales.',
  8,
  49.90,
  NULL
WHERE NOT EXISTS (SELECT 1 FROM productos);
