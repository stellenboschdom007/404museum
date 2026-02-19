'use client';

import { TerminalNotFound, matrixLines } from '@/components';

export default function MatrixPage() {
  return (
    <TerminalNotFound
      lines={matrixLines}
      title="VOID"
      statusText="SIMULATION ERROR"
      subtitle="There is no page. Free your mind."
      terminalUser="neo@construct:~$"
      homeUrl="/"
      homeLabel="← Back"
      accentFrom="#16a34a"
      accentTo="#15803d"
      gradientColors="135deg, #22c55e, #86efac"
      cursorColor="34, 197, 94"
      footerText="wake_up_neo · the_matrix_has_you · follow_the_white_rabbit"
      renderLine={(line, i) => {
        const isCommand = line.text.startsWith('>');
        const colorClass =
          line.special === 'red'
            ? 'text-red-400/90'
            : line.special === 'green'
            ? 'text-green-300/90'
            : isCommand
            ? 'text-green-400/90'
            : 'text-green-500/60';

        return (
          <div key={i} className={`leading-relaxed ${colorClass}`}>
            {line.text || '\u00A0'}
          </div>
        );
      }}
    />
  );
}
