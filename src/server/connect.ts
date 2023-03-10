import { Client as PgClient } from 'pg';
var fs = require('fs');

export const connect = async (): Promise<PgClient> => {
  const client = new PgClient({
    user: 'doadmin',
    host: 'db-postgresql-blr1-83856-do-user-13723828-0.b.db.ondigitalocean.com',
    database: 'defaultdb',
    password: 'AVNS_ump0AKJ208D-psUbMrL',
    port: 25060,
    ssl  : {
        ca : fs.readFileSync('C:\\Users\\Shubham\\Downloads\\ca-certificate.crt')
      }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    return client;
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database', error);
    throw error;
  }
};


// var con = client.connect();

//   export const connection = async (): Promise<Connection | undefined> => {
//     try {
//       const conn = (function(err:any) {
//         if (err) throw err;
//         console.log("Connected!");
//       });
//       console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
//       return conn;
//     } catch (err) {
//       console.log(err);
//     }
//     return undefined;
//   };


// client.query('SELECT * FROM public.user', (err, res) => {
//     if (err) {
//       console.error('ERRRR',err);
//     } else {
//       console.log(res.rows);
//     }
//     client.end();
//   });
