import { Fa6BrandsXTwitter } from '@/components/icons/Fa6BrandsXTwitter';
import { MdiAt } from '@/components/icons/MdiAt';
import { MdiGithub } from '@/components/icons/MdiGithub';

type Social = {
    name: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const socials: Social[] = [
    {
        name: 'Email',
        href: 'mailto:pyyupsk@proton.me',
        icon: MdiAt,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/pyyupsk',
        icon: MdiGithub,
    },
    {
        name: 'X',
        href: 'https://x.com/pyyupsk_',
        icon: Fa6BrandsXTwitter,
    },
];
