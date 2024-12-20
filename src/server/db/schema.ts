import { sql } from 'drizzle-orm';
import {
    foreignKey,
    index,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/pg-core';

export const postStatus = pgEnum('PostStatus', ['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const projectStatus = pgEnum('ProjectStatus', [
    'NOT_STARTED',
    'IN_PROGRESS',
    'COMPLETED',
    'ON_HOLD',
]);

export const project = pgTable(
    'project',
    {
        description: text(),
        id: serial().primaryKey().notNull(),
        link: text().notNull(),
        status: projectStatus().default('NOT_STARTED').notNull(),
        title: varchar({ length: 255 }).notNull(),
    },
    (table) => {
        return {
            statusIdx: index('project_status_idx').using('btree', table.status.asc().nullsLast()),
        };
    },
);

export const post = pgTable(
    'post',
    {
        description: text(),
        id: text().primaryKey().notNull(),
        publishDate: timestamp({ mode: 'string', precision: 3 })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        status: postStatus().default('DRAFT').notNull(),
        title: varchar({ length: 255 }).notNull(),
    },
    (table) => {
        return {
            idIdx: index('post_id_idx').using('btree', table.id.asc().nullsLast()),
            publishDateIdx: index('post_publishDate_idx').using(
                'btree',
                table.publishDate.asc().nullsLast(),
            ),
            statusIdx: index('post_status_idx').using('btree', table.status.asc().nullsLast()),
        };
    },
);

export const postContent = pgTable(
    'post_content',
    {
        content: text().notNull(),
        id: text().primaryKey().notNull(),
        postId: text().notNull(),
    },
    (table) => {
        return {
            postContentPostIdFkey: foreignKey({
                columns: [table.postId],
                foreignColumns: [post.id],
                name: 'post_content_postId_fkey',
            })
                .onUpdate('cascade')
                .onDelete('cascade'),
            postIdIdx: index('post_content_postId_idx').using(
                'btree',
                table.postId.asc().nullsLast(),
            ),
            postIdKey: uniqueIndex('post_content_postId_key').using(
                'btree',
                table.postId.asc().nullsLast(),
            ),
        };
    },
);
