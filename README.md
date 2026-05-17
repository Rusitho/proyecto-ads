# Sistema de Registro de Incidentes - ATU

Sistema web para el registro y seguimiento de incidentes en el transporte urbano.

## Estructura

```
├── api/          # Backend (Node.js + Express + MySQL)
├── frontend/     # Frontend (React + Vite + Material UI)
└── database/     # Script SQL de creación de BD
```

## Requisitos

- Node.js 18+
- MySQL 8.0+

## Instalacion

### 1. Base de datos

```sql
mysql -u root -p < database/schema.sql
```

### 2. Backend

```bash
cd api
cp .env.example .env
# Editar .env con las credenciales de MySQL
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estara disponible en `http://localhost:5173` y la API en `http://localhost:3000`.
