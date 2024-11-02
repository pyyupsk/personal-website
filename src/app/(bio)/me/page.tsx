'use client';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { socials } from '@/constants/socials';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionAvatar = motion(Avatar);
const MotionButton = motion(Button);

export default function Component() {
    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-md sm:rounded-xl sm:border sm:shadow-xl">
                <CardHeader className="items-center space-y-3 text-center">
                    <MotionAvatar
                        animate={{ scale: 1 }}
                        className="size-32 border-4 shadow-lg"
                        initial={{ scale: 0 }}
                        transition={{
                            damping: 20,
                            delay: 0.2,
                            stiffness: 260,
                            type: 'spring',
                        }}
                    >
                        <AvatarImage
                            alt="First (Pongsakorn Thipayanate)"
                            src="https://avatars.githubusercontent.com/u/166195305"
                        />
                        <AvatarFallback>FI</AvatarFallback>
                    </MotionAvatar>
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <CardTitle>First (Pongsakorn Thipayanate)</CardTitle>
                        <CardDescription>Independent Programmer</CardDescription>
                    </motion.div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <motion.p
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <p className="text-center">
                            Self-taught developer focused on Node.js and web solutions. Explore my
                            projects and insights on my website.
                        </p>
                    </motion.p>
                    <div className="grid gap-3">
                        {socials.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <MotionButton
                                    animate={{ opacity: 1, x: 0 }}
                                    asChild
                                    className="w-full justify-start"
                                    initial={{ opacity: 0, x: -50 }}
                                    key={index}
                                    transition={{
                                        damping: 10,
                                        delay: 0.5 + index * 0.1,
                                        stiffness: 120,
                                        type: 'spring',
                                    }}
                                    variant="outline"
                                >
                                    <Link
                                        className="flex items-center"
                                        href={link.href}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Icon className="mr-3 size-5" />
                                        {link.name}
                                    </Link>
                                </MotionButton>
                            );
                        })}
                    </div>
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 10 }}
                        transition={{ delay: socials.length * 0.1 + 0.5, duration: 0.5 }}
                    >
                        <div className="flex justify-center">
                            <ThemeSwitcher />
                        </div>
                    </motion.div>
                </CardContent>
            </div>
        </motion.div>
    );
}
