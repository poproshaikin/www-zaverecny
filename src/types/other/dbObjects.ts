import z from 'zod';

export const TableInfoSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    dbId: z.string().uuid(),
    name: z.string(),
});

export type TableInfo = z.infer<typeof TableInfoSchema>;

export const ColumnDataTypeSchema = z.enum([
    'int',
    'bigint',
    'smallint',
    'decimal',
    'numeric',
    'real',
    'double precision',
    'serial',
    'bigserial',
    'money',
    'boolean',
    'char',
    'varchar',
    'text',
    'bytea',
    'date',
    'time',
    'timestamp',
    'timestamptz',
    'interval',
]);

export type ColumnDataType = z.infer<typeof ColumnDataTypeSchema>;

export const ColumnInfoSchema = z.object({
    id: z.string().uuid(),
    tableId: z.string().uuid(),
    name: z.string(),
    type: ColumnDataTypeSchema,
    isNullable: z.boolean(),
    isPrimaryKey: z.boolean(),
    isUnique: z.boolean(),
    isForeignKey: z.boolean(),
    foreignKeyTableId: z.string().uuid().nullable(),
    foreignKeyColumnId: z.string().uuid().nullable(),
    defaultValue: z.string().nullable(),
});
