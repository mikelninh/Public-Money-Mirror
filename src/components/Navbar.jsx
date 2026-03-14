import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const links = [
    { label: 'Themen', href: '#themen' },
    { label: 'Haushalt', href: '#haushalt' },
    { label: 'Parteien', href: '#parteien' },
    { label: 'Zeugnis', href: '#zeugnis' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Mitmachen', href: '#mitmachen' },
];

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
        );
        const hero = document.getElementById('hero');
        if (hero) observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    // Close mobile menu on link click
    const handleLinkClick = () => setMobileOpen(false);

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
                        <a href="#hero" className="text-sm font-bold text-[var(--color-text)]">PMM</a>

                        {/* Desktop links */}
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

                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-2)]"
                            >
                                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden overflow-hidden border-t border-[var(--color-border)]"
                            >
                                <div className="px-4 py-3 space-y-1">
                                    {links.map(link => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={handleLinkClick}
                                            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
