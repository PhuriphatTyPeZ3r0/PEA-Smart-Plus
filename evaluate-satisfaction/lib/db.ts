import sql from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || '',
  database: process.env.DB_DATABASE || 'PEASmartPlus3_EvaluateSatisfaction',
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  },
};

let poolPromise: Promise<sql.ConnectionPool> | null = null;

export const getDb = async () => {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => {
        console.log('Connected to MSSQL');
        return pool;
      })
      .catch((err) => {
        console.error('Database Connection Failed!', err);
        poolPromise = null;
        throw err;
      });
  }
  return poolPromise;
};
