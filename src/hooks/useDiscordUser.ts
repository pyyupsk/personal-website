import useSWR from 'swr';

const fetcher = async (url: string): Promise<LanyardResponse> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
};

export const useDiscordUser = (userId: string) => {
    const { data, error, isLoading } = useSWR<LanyardResponse>(
        `https://api.lanyard.rest/v1/users/${userId}`,
        fetcher,
        {
            dedupingInterval: 60000,
            focusThrottleInterval: 5000,
            revalidateOnFocus: false,
        },
    );

    return {
        data,
        error,
        isLoading,
    };
};

export interface LanyardResponse {
    data: {
        discord_status: string;
        discord_user: {
            avatar: string;
            global_name: string;
            id: string;
            username: string;
        };
        listening_to_spotify: boolean;
        spotify: {
            album: string;
            album_art_url: string;
            artist: string;
            song: string;
            track_id: string;
        };
    };
    success: boolean;
}
