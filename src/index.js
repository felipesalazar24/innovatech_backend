const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3001;

const {
  DB_HOST = "10.0.173.57",
  DB_USER = "root",
  DB_PASSWORD = "Password123", 
  DB_NAME = "innovatech_db", 
  DB_PORT = 3306,
} = process.env;

app.use(cors());
app.use(express.json());

let pool;

async function initDb() {
  try {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    });
    console.log("Conectado a la BD de Innovatech.");
  } catch (err) {
    console.error("Error de conexión a la BD:", err);
  }
}

app.get("/api/servidores", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM servidores");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error consultando la base de datos" });
  }
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Backend de Innovatech escuchando en puerto ${PORT}`);
  await initDb();
});
