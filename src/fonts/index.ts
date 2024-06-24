import { Source_Sans_3 as FontSans, Noto_Serif as FontSerif, Noto_Serif_JP as FontSerifJP } from 'next/font/google';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const fontSerif = FontSerif({
    subsets: ['latin'],
    variable: '--font-serif',
    weight: ['100', '300', '400', '500', '700', '900', '200', '600', '800'],
});

export const fontSerifJP = FontSerifJP({
    subsets: ['latin'],
    variable: '--font-serif-jp',
    weight: ['300', '400', '500', '700', '900', '200', '600'],
});
