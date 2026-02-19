'use client';

import { TerminalNotFound, spaceLines } from '@/components';

export default function SpacePage() {
  return (
    <TerminalNotFound
      lines={spaceLines}
      title="LOST"
      statusText="MISSION STATUS: FAILED"
      subtitle="Adrift in the cosmic void. No signal. No coordinates."
      terminalUser="cmdr@iss-alpha:~/nav$"
      homeUrl="/"
      homeLabel="← Back"
      accentFrom="#0ea5e9"
      accentTo="#6366f1"
      gradientColors="135deg, #38bdf8, #818cf8, #c084fc"
      cursorColor="56, 189, 248"
      footerText="sector_unknown · signal_lost · coordinates_null · oxygen_critical"
      renderLine={(line, i) => {
        const isCommand = line.text.startsWith('>');
        const isDots = line.text.startsWith('...');
        const colorClass =
          line.special === 'red'
            ? 'text-red-400/90'
            : line.special === 'green'
            ? 'text-sky-400/90'
            : isCommand
            ? 'text-sky-400/90'
            : isDots
            ? 'text-white/25'
            : line.text.startsWith(' ')
            ? 'text-white/40'
            : 'text-indigo-300/70';

        return (
          <div key={i} className={`leading-relaxed ${colorClass}`}>
            {line.text || '\u00A0'}
          </div>
        );
      }}
    />
  );
}
