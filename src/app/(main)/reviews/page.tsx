import { generateMetadata } from '@/lib/metadata';
import { openGraph } from '@/lib/open-graph';
import { Suspense } from 'react';

import { ReviewsList } from './_components/reviews-list';
import { Skeleton } from './_components/skeleton';

export const metadata = generateMetadata({
    description:
        'Read feedback from clients who have worked with P. Thipayanate. See what real clients have to say about the quality, speed, and reliability of the work provided. Testimonials that highlight dedication and communication.',
    image: openGraph({
        badge: 'Reviews',
        button: 'See Reviews',
        description:
            'Explore the reviews from clients highlighting P. Thipayanate’s reliability, speed, and dedication in delivering quality work.',
        title: 'P. Thipayanate | Customer Reviews',
    }),
    title: 'P. Thipayanate | Customer Reviews',
});

export default function Page() {
    return (
        <div className="space-y-6">
            <section className="space-y-3">
                <p className="text-xl">Customer Reviews</p>
                <p className="leading-relaxed text-muted-foreground">
                    The feedback from real clients I have worked with demonstrates my reliability in
                    my work and communication. On each job, it demonstrates my dedication to the job
                    and meeting the client&apos;s needs. These comments highlight my work experience
                    and the value I bring to every client.
                </p>
                <a
                    className="relative underline"
                    href="https://fastwork.co/user/firstpsk"
                    rel="noreferrer"
                    target="_blank"
                >
                    See on Fastwork
                </a>
            </section>
            <Suspense fallback={<Skeleton count={5} />}>
                <ReviewsList />
            </Suspense>
        </div>
    );
}
