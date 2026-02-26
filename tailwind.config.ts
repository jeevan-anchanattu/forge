/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // Dark theme background layers
                'bg-primary': '#0A0E1A',
                'bg-secondary': '#0F1629',
                'bg-card': '#141B2D',
                surface: '#1A2440',
                'border-subtle': '#1E2D4A',
                // Accents
                'accent-primary': '#00D4FF',
                'accent-secondary': '#FF6B35',
                'accent-tertiary': '#7B2FBE',
                // Semantic
                success: '#00E5A0',
                warning: '#FFB800',
                error: '#FF3B5C',
                // Text
                'text-primary': '#E8F0FF',
                'text-secondary': '#8B9CC4',
                'text-tertiary': '#4A5980',
                // Status colors (manufacturing lifecycle)
                'status-planning': '#4A5980',
                'status-active': '#00D4FF',
                'status-quotation': '#FFB800',
                'status-approved': '#00E5A0',
                'status-plan-started': '#7B2FBE',
                'status-plan-complete': '#00D4FF',
                'status-mfg-review': '#FF6B35',
                'status-mfg-progress': '#1A6FFF',
                'status-mfg-qa': '#FFB800',
                'status-mfg-complete': '#00E5A0',
                'status-mfg-signoff': '#00C853',
                'status-delivered': '#00C853',
                'status-feedback': '#FFD600',
                'status-retrospective': '#FFD600',
                'status-archived': '#4A5980',
            },
            fontFamily: {
                primary: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            boxShadow: {
                'glow-sm': '0 0 8px rgba(0,212,255,0.2)',
                glow: '0 0 16px rgba(0,212,255,0.3)',
                'glow-lg': '0 0 32px rgba(0,212,255,0.4)',
                card: '0 4px 24px rgba(0,212,255,0.08)',
                'card-hover': '0 4px 32px rgba(0,212,255,0.16)',
            },
            animation: {
                scan: 'scan 2s linear infinite',
                'pulse-cyan': 'pulse-cyan 2s ease-in-out infinite',
                float: 'float 6s ease-in-out infinite',
            },
            keyframes: {
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'pulse-cyan': {
                    '0%, 100%': { boxShadow: '0 0 8px rgba(0,212,255,0.2)' },
                    '50%': { boxShadow: '0 0 24px rgba(0,212,255,0.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
            },
        },
    },
    plugins: [],
};
