export interface LanyardResponse {
    data: Data;
    success: boolean;
}

interface Data {
    discord_status: string;
    discord_user: DiscordUser;
    listening_to_spotify: boolean;
    spotify: Spotify;
}

export interface Spotify {
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
    track_id: string;
}

interface DiscordUser {
    avatar: string;
    global_name: string;
    id: string;
    username: string;
}
