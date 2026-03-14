import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
    { label: 'Haushalt', href: '#haushalt' },
    { label: 'Parteien', href: '#parteien' },
    { label: 'Lobby', href: '#lobby' },
    { label: 'Projekte', href: '#vorort' },
    { label: 'Kontrolle', href: '#kontrolle' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Mitmachen', href: '#mitmachen' },
];

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(!entry.isIntersecting);
            },
            { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
        );

        const hero = document.getElementById('hero');
        if (hero) observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[var(--color-border)]"
                    style={{ background: 'color-mix(in srgb, var(--color-bg) 85%, transparent)' }}
                >
                    <div className="container-main flex items-center justify-between h-14">
                        <span className="text-sm font-bold text-[var(--color-text)]">PMM</span>

                        <div className="hidden md:flex items-center gap-1">
                            {links.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <ThemeToggle />
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
