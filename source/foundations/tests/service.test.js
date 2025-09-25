import assert from "assert";
import { FoundationsService } from "../service.js";

async function test(nome, fn) {
    await fn()
        .then(() => console.log(`✅ ${nome}`))
        .catch(err => console.error(`❌ ${nome}\n   ${err.message}`));
}

class MockRepository {
  constructor() {
    this.data = [];
    this.idCounter = 1;
  }

  async find() {
    return this.data.filter(f => !f.deleted);
  }

  async findWithDeleted() {
    return this.data;
  }

  async findByField(field, value) {
    return this.data.find(f => f[field] === value && !f.deleted) || null;
  }

  async findByFieldWithDeleted(field, value) {
    return this.data.find(f => f[field] === value) || null;
  }

  async create(body) {
    const newFoundation = { id: this.idCounter++, deleted: false, ...body };
    this.data.push(newFoundation);
    return newFoundation;
  }

  async update(body) {
    const index = this.data.findIndex(f => f.id === body.id);
    if (index >= 0) {
      this.data[index] = { ...this.data[index], ...body };
      return this.data[index];
    }
    return null;
  }

  async delete(id, type = "SOFT_DELETE") {
    const index = this.data.findIndex(f => f.id === id);
    if (index >= 0) {
      if (type === "SOFT_DELETE") {
        this.data[index].deleted = true;
        return this.data[index];
      } else {
        this.data.splice(index, 1);
        return true;
      }
    }
    return null;
  }
}

async function runTests() {
    const service = new FoundationsService();
    service.foundationsRepository = new MockRepository();

    const tests = [
        ["createFoundations deve adicionar se não existir", async () => {
            const result = await service.createFoundations({ cnpj: "789", name: "Fundação A" });
            assert.ok(result);
            assert.strictEqual(result.cnpj, "789");
        }],

        ["createFoundations deve adicionar um segundo caso se não existir", async () => {
            const result = await service.createFoundations({ cnpj: "123", name: "Fundação B" });
            assert.ok(result);
            assert.strictEqual(result.cnpj, "123");
        }],

        ["createFoundations deve retornar null se já existir", async () => {
            const result = await service.createFoundations({ cnpj: "789", name: "Duplicada" });
            assert.strictEqual(result, null);
        }],

        ["updateFoundations deve atualizar fundação existente", async () => {
            const result = await service.updateFoundations({ id: 1, name: "Fundação A Atualizada" });
            assert.ok(result);
            assert.strictEqual(result.name, "Fundação A Atualizada");
        }],

        ["updateFoundations deve retornar null se não existir", async () => {
        const result = await service.updateFoundations({ id: 99, name: "Inexistente" });
        assert.strictEqual(result, null);
        }],

        ["deleteFoundations deve aplicar soft delete", async () => {
            const result = await service.deleteFoundations(1);
            assert.ok(result);
            assert.strictEqual(result.deleted, true);
        }],

        ["deleteFoundations deve retornar null se não existir", async () => {
            const result = await service.deleteFoundations(99);
            assert.strictEqual(result, null);
        }],

        ["getFoundations deve retornar apenas ativos", async () => {
            const result = await service.getFoundations();
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].cnpj, "123");
        }],

        ["getFoundations com withDeleted=true deve retornar todos", async () => {
            const result = await service.getFoundations(null, true);
            assert.strictEqual(result.length, 2);
        }],

        ["deleteFoundations deve aplicar hard delete quando for solicitado", async () => {
            const result = await service.deleteFoundations(2, "HARD_DELETE");
            assert.strictEqual(result, true);
        }]
    ];

    for (const [nome, fn] of tests) {
        await test(nome, fn);
    }
}

runTests();