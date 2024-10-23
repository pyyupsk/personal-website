import { cors } from '@/lib/cors';
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Default Title';
    const description = searchParams.get('description') || 'Default Description';
    const button = searchParams.get('button') || 'Default Button';

    return cors(
        request,
        new ImageResponse(
            (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'hsl(240 7% 8%)',
                        display: 'flex',
                        flexDirection: 'column',
                        fontFamily: 'system-ui',
                        height: '100%',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {/* Background pattern */}
                    <div
                        style={{
                            backgroundImage: `
                radial-gradient(circle at 10% 10%, rgba(48, 48, 54, 0.8) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(199, 199, 199, 0.3) 0%, transparent 40%)
                `,
                            bottom: 0,
                            left: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                    />

                    {/* Content container */}
                    <div
                        style={{
                            alignItems: 'flex-start',
                            backgroundColor: 'hsla(240, 7%, 6%, 0.8)',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '90%',
                            justifyContent: 'center',
                            padding: '60px',
                            position: 'relative',
                            width: '90%',
                        }}
                    >
                        {/* Decorative element */}
                        <div
                            style={{
                                background: '#1b1b1f',
                                borderRadius: '50%',
                                height: 80,
                                left: 40,
                                position: 'absolute',
                                top: 40,
                                width: 80,
                            }}
                        />

                        {/* Title */}
                        <h1
                            style={{
                                color: 'hsl(0, 0%, 78%)',
                                fontSize: 72,
                                fontWeight: 'bold',
                                lineHeight: 1.2,
                                margin: 0,
                                marginBottom: 20,
                                maxWidth: '80%',
                            }}
                        >
                            {title}
                        </h1>

                        {/* Description */}
                        <p
                            style={{
                                color: 'hsl(0, 0%, 55.66%)',
                                fontSize: 32,
                                lineHeight: 1.4,
                                margin: 0,
                                marginBottom: 40,
                                maxWidth: '70%',
                            }}
                        >
                            {description}
                        </p>

                        {/* Button container */}
                        <div
                            style={{
                                alignItems: 'center',
                                background: 'hsl(240, 5.88%, 20%)',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 'auto',
                                padding: '12px 24px',
                            }}
                        >
                            <p
                                style={{
                                    color: 'hsl(0, 0%, 85%)',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    margin: 0,
                                }}
                            >
                                {button}
                            </p>
                        </div>

                        {/* Decorative lines */}
                        <div
                            style={{
                                background: 'hsl(0, 0%, 78%)',
                                bottom: 40,
                                height: 3,
                                opacity: 0.6,
                                position: 'absolute',
                                right: 40,
                                transform: 'rotate(45deg)',
                                width: 120,
                            }}
                        />
                        <div
                            style={{
                                background: 'hsl(0, 0%, 55.66%)',
                                bottom: 60,
                                height: 3,
                                opacity: 0.4,
                                position: 'absolute',
                                right: 60,
                                transform: 'rotate(45deg)',
                                width: 80,
                            }}
                        />
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
            origin: 'https://pyyupsk.vercel.app',
        },
    );
}
