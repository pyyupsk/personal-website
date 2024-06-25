import { MusicalComponent } from '@/components/Musical';
import { author } from '@/data';
import { commonMetaData } from '@/lib/meta';

export async function generateMetadata() {
    const title = 'Latest Musical Videos';
    const description = `Explore the musical world of ${author.name.en} (${author.name.jp}), featuring original compositions and creative collaborations. Dive into a variety of genres, from ambient soundscapes to energetic beats, crafted with passion and precision. Immerse yourself in unique melodies and rhythmic journeys.`;

    return commonMetaData({ title, description });
}

export default function MusicPage() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">My Music</h2>
            <MusicalComponent />
        </section>
    );
}
