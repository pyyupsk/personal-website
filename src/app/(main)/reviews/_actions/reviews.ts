'use server';

import { env } from '@/env';

interface Reviews {
    data: Comment[];
}

interface Comment {
    created_at: string;
    description: null | string;
    id: string;
    is_anonymous: boolean;
    is_cancelled: boolean;
    order_id: string;
    rating: number;
    review_reply: null | string;
    reviewer: Reviewer;
    updated_at: string;
}

interface Reviewer {
    display_name: string;
    id: string;
    image: string;
}

interface Response {
    data: Comment[];
    error: null | string;
}

export async function getReviews(): Promise<Response> {
    const res = await fetch('https://api.fastwork.co/api/v4/user.getReviewsFromBuyer', {
        body: JSON.stringify({
            page: 1,
            page_size: 100,
            user_id: env.FASTWORK_USER_ID,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    if (!res.ok) return { data: [], error: 'Failed to fetch reviews' };

    const { data }: Reviews = await res.json();

    return { data, error: null };
}
