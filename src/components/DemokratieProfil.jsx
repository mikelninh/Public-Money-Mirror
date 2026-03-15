import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Star, Flame, ChevronRight, Lightbulb } from 'lucide-react';
import { achievements, getProfile, getLevel, getDailyFact, trackAction } from '../data/gamification';

const DemokratieProfil = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState(getProfile);
    const [showNewAchievement, setShowNewAchievement] = useState(null);
    const [dailyFact] = useState(getDailyFact);

    // Track first visit
    useEffect(() => {
        const p = trackAction('first-visit');
        setProfile(p);
    }, []);

    // Listen for custom achievement events from other components
    useEffect(() => {
        const handler = (e) => {
            const p = trackAction(e.detail);
            setProfile(p);
            const achievement = achievements.find(a => a.id === e.detail);
            if (achievement && !profile.achievements.includes(e.detail)) {
                setShowNewAchievement(achievement);
                setTimeout(() => setShowNewAchievement(null), 3000);
            }
        };
        window.addEventListener('pmm-achievement', handler);
        return () => window.removeEventListener('pmm-achievement', handler);
    }, [profile.achievements]);

    const { current: level, next: nextLevel, progress } = getLevel(profile.points);
    const earnedAchievements = achievements.filter(a => profile.achievements.includes(a.id));
    const unearnedAchievements = achievements.filter(a => !profile.achievements.includes(a.id) && a.category !== 'meilenstein');

    const categoryLabels = {
        start: 'Erste Schritte',
        wissen: 'Wissen',
        handeln: 'Handeln',
        teilen: 'Teilen',
        meilenstein: 'Meilensteine',
    };

    return (
        <>
            {/* Achievement toast */}
            <AnimatePresence>
                {showNewAchievement && (
                    <motion.div
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -80, opacity: 0 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-green)]/30 shadow-lg flex items-center gap-3"
                    >
                        <span className="text-2xl">{showNewAchievement.icon}</span>
                        <div>
                            <div className="text-xs font-bold text-[var(--color-green)]">Achievement freigeschaltet!</div>
                            <div className="text-sm font-semibold text-[var(--color-text)]">{showNewAchievement.name}</div>
                        </div>
                        <span className="text-xs font-mono text-[var(--color-green)]">+{showNewAchievement.points}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating trigger */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-20 right-3 md:right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:border-[var(--color-border-hover)] transition-colors"
            >
                <Trophy size={14} style={{ color: level.color }} />
                <span className="text-xs font-bold font-mono text-[var(--color-text)]">{profile.points}</span>
                {profile.streak > 1 && (
                    <span className="flex items-center gap-0.5 text-[10px] text-[var(--color-amber)] font-medium">
                        <Flame size={10} />{profile.streak}
                    </span>
                )}
            </motion.button>

            {/* Profile panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-start justify-end p-4 pt-16 bg-black/40 backdrop-blur-sm"
                        onClick={e => e.target === e.currentTarget && setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="w-full max-w-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <Trophy size={18} style={{ color: level.color }} />
                                    <div>
                                        <div className="text-sm font-bold text-[var(--color-text)]">Dein Demokratie-Profil</div>
                                        <div className="text-[10px] text-[var(--color-text-3)]">Level: <span style={{ color: level.color }} className="font-semibold">{level.name}</span></div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-3)]">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
                                {/* Points + Level */}
                                <div className="text-center">
                                    <div className="text-3xl font-bold font-mono text-[var(--color-text)]">{profile.points}</div>
                                    <div className="text-xs text-[var(--color-text-3)] mb-3">Demokratie-Punkte</div>
                                    {nextLevel && (
                                        <div>
                                            <div className="flex justify-between text-[10px] text-[var(--color-text-3)] mb-1">
                                                <span>{level.name}</span>
                                                <span>{nextLevel.name} ({nextLevel.minPoints} Punkte)</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: level.color }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress * 100}%` }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Streak */}
                                {profile.streak > 0 && (
                                    <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/15">
                                        <Flame size={14} className="text-[var(--color-amber)]" />
                                        <span className="text-sm font-semibold text-[var(--color-text)]">{profile.streak} Tage Streak</span>
                                    </div>
                                )}

                                {/* Daily fact */}
                                <div className="p-3 rounded-xl bg-[var(--color-blue)]/5 border border-[var(--color-blue)]/15">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <Lightbulb size={12} className="text-[var(--color-blue)]" />
                                        <span className="text-[10px] font-semibold text-[var(--color-blue)] uppercase tracking-wider">Fakt des Tages</span>
                                    </div>
                                    <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed">{dailyFact}</p>
                                </div>

                                {/* Earned achievements */}
                                <div>
                                    <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-2">
                                        Freigeschaltet ({earnedAchievements.length}/{achievements.filter(a => a.category !== 'meilenstein').length})
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {earnedAchievements.map(a => (
                                            <div key={a.id} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[var(--color-green)]/5 border border-[var(--color-green)]/10" title={`${a.name}: ${a.desc}`}>
                                                <span className="text-lg">{a.icon}</span>
                                                <span className="text-[8px] text-[var(--color-text-3)] text-center leading-tight">{a.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Next achievements */}
                                {unearnedAchievements.length > 0 && (
                                    <div>
                                        <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-2">Nächste Achievements</div>
                                        <div className="space-y-1.5">
                                            {unearnedAchievements.slice(0, 4).map(a => (
                                                <div key={a.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                    <span className="text-lg opacity-30">{a.icon}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[11px] font-medium text-[var(--color-text-2)]">{a.name}</div>
                                                        <div className="text-[9px] text-[var(--color-text-3)]">{a.desc}</div>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-[var(--color-text-3)]">+{a.points}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="text-center text-[10px] text-[var(--color-text-3)] pt-2 border-t border-[var(--color-border)]">
                                    {profile.actionsLog.length} Aktionen · Seit {profile.lastVisit || 'heute'} dabei
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Helper: dispatch achievement event from any component
export function triggerAchievement(id) {
    window.dispatchEvent(new CustomEvent('pmm-achievement', { detail: id }));
}

export default DemokratieProfil;
