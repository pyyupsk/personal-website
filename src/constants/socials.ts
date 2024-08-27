import { Fa6BrandsXTwitter } from '@/components/icons/Fa6BrandsXTwitter';
import { MdiAt } from '@/components/icons/MdiAt';
import { MdiGithub } from '@/components/icons/MdiGithub';

type Social = {
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    name: string;
};

export const socials: Social[] = [
    {
        href: 'mailto:pyyupsk@proton.me',
        icon: MdiAt,
        name: 'Email',
    },
    {
        href: 'https://github.com/pyyupsk',
        icon: MdiGithub,
        name: 'GitHub',
    },
    {
        href: 'https://x.com/pyyupsk_',
        icon: Fa6BrandsXTwitter,
        name: 'X',
    },
];
