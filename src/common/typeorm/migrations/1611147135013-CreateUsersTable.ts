import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
        type: 'varchar(100)',
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

  private foreignKey = new TableForeignKey({
    columnNames: ['role'],
    referencedColumnNames: ['role'],
    onDelete: 'CASCADE',
    referencedTableName: 'roles',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.foreignKey);
    await queryRunner.query(`
      INSERT INTO "users" (name, email, password, role)
      VALUES (
        'Administrador',
        'adm@brainny.cc',
        '$2b$10$iFTN41FnmxY6ONYlmU4W8eb60UqAIfJVQ7AlwM5ZfACR3rK/IVM.y',
        'administrator'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
