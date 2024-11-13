import type { Thing, WithContext } from 'schema-dts';

import Script from 'next/script';

export const JsonLd = ({ code }: { code: WithContext<Thing> }) => (
    <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
        id="json-ld"
        type="application/ld+json"
    />
);

export * from 'schema-dts';
