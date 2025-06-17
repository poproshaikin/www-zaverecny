import z from 'zod';
import { createListCollection } from '@ark-ui/react';

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

export const columnDataTypes = createListCollection({
    items: ColumnDataTypeSchema.options,
});

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

export type ColumnInfo = z.infer<typeof ColumnInfoSchema>;

export const CreateColumnSchema = ColumnInfoSchema.pick({
    name: true,
    type: true,
    isNullable: true,
    isPrimaryKey: true,
    isUnique: true,
    isForeignKey: true,
}).extend({
    foreignKeyTableName: z.string().optional(),
    foreignKeyColumnName: z.string().optional(),
});

export type CreateColumn = z.infer<typeof CreateColumnSchema>;

export const TableInfoSchema = z.object({
    id: z.string().uuid(),
    i_oid: z.string().uuid(),
    userId: z.string().uuid(),
    dbId: z.string().uuid(),
    name: z.string(),
});

export type TableInfo = z.infer<typeof TableInfoSchema>;

export const CreateTableSchema = z.object({
    name: z.string().uuid(),
});

export type CreateTable = z.infer<typeof CreateTableSchema>;
