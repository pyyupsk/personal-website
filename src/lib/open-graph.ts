interface Props {
    badge: string;
    button: string;
    description: string;
    title: string;
}

export function openGraph({ badge, button, description, title }: Props) {
    return `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
        description,
    )}&button=${encodeURIComponent(button)}&badge=${encodeURIComponent(badge)}`;
}
