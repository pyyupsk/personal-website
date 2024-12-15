import { Fa6BrandsXTwitter } from '@/components/icons/Fa6BrandsXTwitter';
import { MdiAt } from '@/components/icons/MdiAt';
import { MdiGithub } from '@/components/icons/MdiGithub';
import { Globe } from 'lucide-react';

import { BASE_URL } from './base-url';

type Social = {
    description: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    name: string;
};

export const email: Social = {
    description: 'Check out my repositories and code.',
    href: 'mailto:pyyupsk@proton.me',
    icon: MdiAt,
    name: 'Email',
};

const portfolio: Social = {
    description: 'Discover my work and read my latest posts.',
    href: BASE_URL,
    icon: Globe,
    name: 'Portfolio & Blog',
};

const gitHub: Social = {
    description: 'Check out my repositories and code.',
    href: 'https://github.com/pyyupsk',
    icon: MdiGithub,
    name: 'GitHub',
};

const x: Social = {
    description: 'Follow me for tech insights and updates.',
    href: 'https://x.com/pyyupsk_',
    icon: Fa6BrandsXTwitter,
    name: 'X (Twitter)',
};

export const socials: Social[] = [portfolio, gitHub, x, email];
