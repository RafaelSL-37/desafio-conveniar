import { Pool } from 'pg';

const dbConfig = {
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "pass123",
  database: process.env.DB_NAME || "appdb",
};

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

    async findByCnpj(cnpj) {
        query = 'SELECT * FROM foundations';

        const client = await this.pool.connect()

        const { rows } = cnpj 
            ? await client.query(query)
            : await client.query(query + ' WHERE cnpj = $1', [cnpj]);
        client.release() //TODO: CHECK IF THIS WORKS

        return rows || null;
    }

    async create({ cnpj, name, email, phone, supportedInstitution }) {
        const query = `INSERT INTO foundations(name, cnpj, email, phone, institution) VALUES($1,$2,$3,$4,$5) RETURNING *`;

        const { rows } = await this.pool.query(query, [name, cnpj, email, phone, supportedInstitution]);

        await pool.end()

        return rows[0];
    }

    async update({ cnpj, name, email, phone, supportedInstitution }) {
        const query = `UPDATE foundations SET name = $1, email = $2, phone = $3, supportedInstitution = $4 WHERE cnpj = $5 RETURNING *`;

        const { rows } = await this.pool.query(query, [name, email, phone, supportedInstitution, cnpj]);

        await pool.end()

        return rows[0];
    }

    async delete(cnpj) {
        const query = `DELETE FROM foundations WHERE cnpj = $1 RETURNING cnpj`;

        const { rows } = await this.pool.query(query, [cnpj]);

        await pool.end()

        return rows[0];
    }
}