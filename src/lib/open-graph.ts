interface Props {
    button: string;
    description: string;
    title: string;
}

export function openGraph({ button, description, title }: Props) {
    return `/api/og?button=${encodeURIComponent(button)}&description=${encodeURIComponent(
        description,
    )}&title=${encodeURIComponent(title)}`;
}
