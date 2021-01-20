import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolesTable1611145803373 implements MigrationInterface {
  private table = new Table({
    name: 'roles',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'role',
        type: 'varchar(45)',
        isNullable: false,
        isUnique: true,
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
    await queryRunner.query(
      `INSERT INTO "roles" (role) VALUES ('administrator'), ('employee')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
