import { relations } from 'drizzle-orm/relations';

import { post, postContent } from './schema';

export const postContentRelations = relations(postContent, ({ one }) => ({
    post: one(post, {
        fields: [postContent.postId],
        references: [post.id],
    }),
}));

export const postRelations = relations(post, ({ many }) => ({
    postContents: many(postContent),
}));
