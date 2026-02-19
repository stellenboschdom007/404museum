'use client';

import { TerminalNotFound, devopsLines } from '@/components';

export default function DevOpsPage() {
  return (
    <TerminalNotFound
      lines={devopsLines}
      title="503"
      statusText="SERVICE UNAVAILABLE"
      subtitle="Pod crashed. Container exited. Pipeline broken."
      terminalUser="deploy@ci-runner:~/prod$"
      homeUrl="/"
      homeLabel="← Back"
      accentFrom="#2563eb"
      accentTo="#1d4ed8"
      gradientColors="135deg, #3b82f6, #f97316"
      cursorColor="96, 165, 250"
      footerText="pod_crash_loop · exit_code_137 · oom_killed · pipeline_failed"
    />
  );
}
