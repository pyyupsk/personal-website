import Link from 'next/link';
import { Suspense } from 'react';

import { ReviewsList } from './_components/reviews-list';
import { Skeleton } from './_components/skeleton';

export default function Page() {
    return (
        <div className="space-y-6">
            <section className="space-y-3">
                <p className="text-xl text-foreground">Customer Reviews</p>
                <p className="leading-relaxed">
                    The feedback from real clients I have worked with demonstrates my reliability in
                    my work and communication. On each job, it demonstrates my dedication to the job
                    and meeting the client&apos;s needs. These comments highlight my work experience
                    and the value I bring to every client.
                </p>
                <Link
                    className="relative underline after:content-['_↗'] hover:text-foreground"
                    href="https://fastwork.co/user/firstpsk"
                    target="_blank"
                >
                    See on Fastwork
                </Link>
            </section>
            <Suspense fallback={<Skeleton count={5} />}>
                <ReviewsList />
            </Suspense>
        </div>
    );
}
