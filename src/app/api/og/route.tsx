import { BASE_URL } from '@/constants/base-url';
import { cors } from '@/lib/cors';
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Default Title';
    const description = searchParams.get('description') || 'Default Description';
    const button = searchParams.get('button') || 'Default Button';
    const badge = searchParams.get('badge') || 'Default Badge';

    return cors(
        request,
        new ImageResponse(
            (
                <div
                    style={{
                        alignItems: 'flex-start',
                        backgroundColor: '#131316',
                        backgroundImage:
                            'radial-gradient(circle at 25px 25px, #303036 2%, transparent 0%), radial-gradient(circle at 75px 75px, #303036 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            alignItems: 'flex-start',
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: 80,
                            marginLeft: 80,
                            marginRight: 80,
                            maxWidth: '70%',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#c7c7c7',
                                borderRadius: '4px',
                                color: '#131316',
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 32,
                                padding: '8px 24px',
                            }}
                        >
                            {badge}
                        </div>
                        <h1
                            style={{
                                color: '#c7c7c7',
                                fontSize: 64,
                                fontWeight: 'bold',
                                lineHeight: 1.1,
                                margin: 0,
                                marginBottom: 24,
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                color: '#8e8e8e',
                                fontSize: 32,
                                lineHeight: 1.4,
                                margin: 0,
                                marginBottom: 32,
                            }}
                        >
                            {description}
                        </p>
                        <div
                            style={{
                                backgroundColor: '#c7c7c7',
                                borderRadius: '4px',
                                color: '#131316',
                                fontSize: 24,
                                fontWeight: 'bold',
                                padding: '16px 32px',
                            }}
                        >
                            {button}
                        </div>
                    </div>
                </div>
            ),
            {
                height: 630,
                width: 1200,
            },
        ),
        {
            methods: 'GET',
            origin: BASE_URL,
        },
    );
}
