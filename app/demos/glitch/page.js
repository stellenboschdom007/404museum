'use client';

import { TerminalNotFound, glitchLines } from '@/components';

export default function GlitchPage() {
  return (
    <TerminalNotFound
      lines={glitchLines}
      title="ERR"
      statusText="█▓░ SYSTEM FAULT ░▓█"
      subtitle="Memory corrupted. Data unrecoverable. Kernel panic."
      terminalUser="kernel@panic:~#"
      homeUrl="/"
      homeLabel="← Back"
      accentFrom="#a855f7"
      accentTo="#ec4899"
      gradientColors="135deg, #c084fc, #f472b6, #fb923c"
      cursorColor="192, 132, 252"
      footerText="segfault_0x404 · stack_smash · heap_overflow · core_dumped"
      renderLine={(line, i) => {
        const isCommand = line.text.startsWith('$');
        const colorClass =
          line.special === 'red'
            ? 'text-red-400/90'
            : line.special === 'yellow'
            ? 'text-yellow-400/90'
            : line.special === 'green'
            ? 'text-green-400/90'
            : isCommand
            ? 'text-fuchsia-400/90'
            : line.text.startsWith(' ')
            ? 'text-white/40'
            : 'text-purple-300/70';

        return (
          <div
            key={i}
            className={`leading-relaxed ${colorClass}`}
            style={
              line.text.includes('SEGFAULT') || line.text.includes('panic')
                ? { textShadow: '2px 0 #f43f5e, -2px 0 #06b6d4', animation: 'none' }
                : undefined
            }
          >
            {line.text || '\u00A0'}
          </div>
        );
      }}
    >
      {/* Glitch scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
        }}
      />
    </TerminalNotFound>
  );
}
