import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, X, Check } from 'lucide-react';

/**
 * ShareCard — generates a shareable summary card
 * Usage: <ShareCard title="..." lines={[...]} color="..." onClose={fn} />
 */
const ShareCard = ({ title, subtitle, lines, accentColor = 'var(--color-blue)', onClose }) => {
    const cardRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const shareAsText = () => {
        const text = `${title}\n${subtitle ? subtitle + '\n' : ''}\n${lines.map(l => `${l.label}: ${l.value}`).join('\n')}\n\n→ publicmoneymirror.de`;

        if (navigator.share) {
            navigator.share({ title, text });
        } else {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadAsImage = async () => {
        const card = cardRef.current;
        if (!card) return;

        try {
            // Use canvas to create image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const w = 600;
            const h = 400 + lines.length * 40;
            canvas.width = w * 2;
            canvas.height = h * 2;
            ctx.scale(2, 2);

            // Background
            ctx.fillStyle = '#0a0a0f';
            ctx.roundRect(0, 0, w, h, 16);
            ctx.fill();

            // Accent top border
            ctx.fillStyle = '#4f8ff7';
            ctx.fillRect(0, 0, w, 4);

            // Title
            ctx.fillStyle = '#f0f0f5';
            ctx.font = 'bold 22px Inter, system-ui, sans-serif';
            ctx.fillText(title, 32, 52);

            // Subtitle
            if (subtitle) {
                ctx.fillStyle = '#9898ab';
                ctx.font = '14px Inter, system-ui, sans-serif';
                ctx.fillText(subtitle, 32, 80);
            }

            // Lines
            lines.forEach((line, i) => {
                const y = 120 + i * 44;
                ctx.fillStyle = '#55556a';
                ctx.font = '13px Inter, system-ui, sans-serif';
                ctx.fillText(line.label, 32, y);
                ctx.fillStyle = '#f0f0f5';
                ctx.font = 'bold 15px Inter, system-ui, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(line.value, w - 32, y);
                ctx.textAlign = 'left';

                // Divider
                ctx.strokeStyle = '#1e1e2a';
                ctx.beginPath();
                ctx.moveTo(32, y + 14);
                ctx.lineTo(w - 32, y + 14);
                ctx.stroke();
            });

            // Footer
            const footerY = h - 32;
            ctx.fillStyle = '#55556a';
            ctx.font = '11px Inter, system-ui, sans-serif';
            ctx.fillText('publicmoneymirror.de — Daten: BMF 2025', 32, footerY);

            // Download
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'public-money-mirror.png';
            a.click();
        } catch {
            // Fallback: just copy text
            shareAsText();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-md"
            >
                {/* Preview card */}
                <div ref={cardRef} className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)] mb-4">
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${accentColor}, var(--color-purple))` }} />
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">{title}</h3>
                        {subtitle && <p className="text-sm text-[var(--color-text-3)] mb-5">{subtitle}</p>}

                        <div className="space-y-3">
                            {lines.map((line, i) => (
                                <div key={i} className="flex items-center justify-between py-1 border-b border-[var(--color-border)] last:border-0">
                                    <span className="text-sm text-[var(--color-text-2)]">{line.label}</span>
                                    <span className="text-sm font-bold font-mono text-[var(--color-text)]">{line.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 text-[10px] text-[var(--color-text-3)]">
                            publicmoneymirror.de — Daten: BMF 2025
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={shareAsText}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                        style={{ background: copied ? 'var(--color-green)' : 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                    >
                        {copied ? <><Check size={14} /> Kopiert!</> : <><Share2 size={14} /> Teilen</>}
                    </button>
                    <button
                        onClick={downloadAsImage}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors"
                    >
                        <Download size={14} /> Bild
                    </button>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center p-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-3)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ShareCard;
