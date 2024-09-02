import { cors } from '@/lib/cors';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Default Title';
    const description = searchParams.get('description') || 'Default Description';

    return cors(
        request,
        new ImageResponse(
            (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'white',
                        backgroundImage:
                            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        height: '100%',
                        justifyContent: 'center',
                        padding: '0 50px',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            color: 'black',
                            display: 'flex',
                            fontSize: 60,
                            fontStyle: 'normal',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        <b>{title}</b>
                    </div>
                    <div
                        style={{
                            color: 'black',
                            fontSize: 40,
                            marginTop: 10,
                        }}
                    >
                        {description}
                    </div>
                </div>
            ),
            {
                height: 630,
                width: 1200,
            },
        ),
        {
            methods: ['GET'],
            origin: 'https://pyyupsk.vercel.app',
        },
    );
}
