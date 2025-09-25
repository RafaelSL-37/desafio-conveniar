import { Pool } from 'pg';

const poolConfig = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
}

export class FoundationsRepository {
    constructor() {
        this.pool = new Pool(poolConfig);
    }

    //TODO: PAGINATION
    async find() {
        const client = await this.pool.connect();

        try {
            const query = 'SELECT * FROM foundations WHERE deleted_at IS NULL';

            const { rows } = await client.query(query, []);

            return rows.length ? rows : null;
        } finally {
            client.release();
        }
    }

    //TODO: PAGINATION
    async findWithDeleted() {
        const client = await this.pool.connect();

        try {
            const query = 'SELECT * FROM foundations';

            const { rows } = await client.query(query, []);

            return rows.length ? rows : null;
        } finally {
            client.release();
        }
    }

    async findByField(fieldName, fieldValue) {
        const client = await this.pool.connect();

        try {
            const query = `SELECT * FROM foundations WHERE ${fieldName} = $1 AND deleted_at IS NULL`;

            const { rows } = await client.query(query, [fieldValue]);

            return rows.length ? rows : null;
        } finally {
            client.release();
        }
    }

    async findByFieldWithDeleted(fieldName, fieldValue) {
        const client = await this.pool.connect();

        try {
            const query = `SELECT * FROM foundations WHERE ${fieldName} = $1`;

            const { rows } = await client.query(query, [fieldValue]);

            return rows.length ? rows : null;
        } finally {
            client.release();
        }
    }

    async create({ cnpj, name, email, phone, supportedInstitution }) {
        const client = await this.pool.connect();

        try {
            const query = `INSERT INTO foundations(name, cnpj, email, phone, supported_institution) VALUES($1, $2, $3, $4, $5) RETURNING *`;

            const { rows } = await client.query(query, [name, cnpj, email, phone, supportedInstitution]);

            return rows.length ? rows[0] : null;
        } finally {
            client.release();
        }
    }

    //TODO: UPDATE ONLY WHOEVER IS PRESENT
    async update({ cnpj, name, email, phone, supportedInstitution }) {
        const client = await this.pool.connect();

        try {
            const query = `UPDATE foundations SET name = $1, email = $2, phone = $3, supported_institution = $4, updated_at = NOW() WHERE cnpj = $5 RETURNING *`;

            const { rows } = await client.query(query, [name, email, phone, supportedInstitution, cnpj]);

            return rows.length ? rows[0] : null;
        } finally {
            client.release();
        }
    }

    async delete(id, type='SOFT_DELETE') {
        const client = await this.pool.connect();

        try {
            const query = type === 'SOFT_DELETE' 
                ? `UPDATE foundations SET updated_at = NOW(), deleted_at = NOW() WHERE id = $1 RETURNING id`
                : `DELETE FROM foundations WHERE id = $1 RETURNING id`;

            const { rows } = await client.query(query, [id]);

            return rows.length ? rows[0] : null;
        } finally {
            client.release();
        }
    }
}