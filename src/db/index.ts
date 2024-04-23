import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config();
const pool = new Pool({
  max: 20,
  connectionString: `${process.env.DB}`,
  idleTimeoutMillis: 30000,
});

export default pool;
