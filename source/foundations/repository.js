import { Pool } from 'pg';

// const dbConfig = {
//   host: process.env.DB_HOST || "db",
//   port: process.env.DB_PORT || "3306",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "pass123",
//   database: process.env.DB_NAME || "appdb",
// };

const poolConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60
}

export class FoundationsRepository {
    constructor() {
        // this.connection = true; //TODO: POSTGRESQL CONNECTION
        this.pool = new Pool(poolConfig);
    }

    // const client = await pool.connect();
    // try {
    //     const res = await client.query('SELECT NOW()');
    //     console.log(res.rows[0].now);
    // } finally {
    //     client.release();
    // }


    async find() {
        const query = 'SELECT * FROM foundations';

        const client = await this.pool.connect()
        const { rows } = await client.query(query);
        client.release() //TODO: CHECK IF THIS WORKS

        return rows || null;
    }

    async findByField(fieldName, fieldValue) {
        const query = 'SELECT * FROM foundations WHERE $1 = $2';

        const { rows } = await client.query(query, [fieldName, fieldValue]);

        return rows || null;
    }

    async create({ cnpj, name, email, phone, supportedInstitution }) {
        const query = `INSERT INTO foundations(name, cnpj, email, phone, institution) VALUES($1,$2,$3,$4,$5) RETURNING *`;

        const client = await this.pool.connect()
        const { rows } = await client.query(query, [name, cnpj, email, phone, supportedInstitution]);
        client.release() //TODO: CHECK IF THIS WORKS

        return rows[0];
    }

    async update({ cnpj, name, email, phone, supportedInstitution }) {
        const query = `UPDATE foundations SET name = $1, email = $2, phone = $3, supportedInstitution = $4, updated_at = NOW() WHERE cnpj = $5 RETURNING *`;

        const { rows } = await this.pool.query(query, [name, email, phone, supportedInstitution, cnpj]);

        return rows[0];
    }

    async delete(id, type='SOFT_DELETE') {
        const query = type === 'SOFT_DELETE' 
            ? `UPDATE foundations SET updated_at = NOW(), deleted_at = NOW() WHERE id = $1 RETURNING id`
            : `DELETE FROM foundations WHERE id = $1 RETURNING id`;

        const { rows } = await this.pool.query(query, [id]);

        return rows[0];
    }
}