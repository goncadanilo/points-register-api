import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1611147135013 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      },
      {
        name: 'name',
        type: 'varchar(45)',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar(45)',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'role',
        type: 'varchar(45)',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.query(`
      INSERT INTO "users" (name, email, password, role)
      VALUES (
        'Administrador',
        'admin@brainny.cc',
        '$2b$10$uaG7gZMCMZxhI.AnNq9gAui5scFh/cI9sVg4wTMN80M8TW935tLIm',
        'ADMINISTRATOR'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
