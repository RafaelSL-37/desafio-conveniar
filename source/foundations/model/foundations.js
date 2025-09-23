export class FoundationsModel {
    cnpj; //UNIQUE, PK
    name;
    email;
    phone;
    supportedInstitution;
    createdAt;
    updatedAt;
    deletedAt;

    constructor(entity) {
        this.cnpj = entity.cnpj;
        this.name = entity.name;
        this.email = entity.email;
        this.phone = entity.phone;
        this.supportedInstitution = entity.supportedInstitution;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        this.deletedAt = entity.deletedAt;
    }
}