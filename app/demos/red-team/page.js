'use client';

import { TerminalNotFound, hackerLines } from '@/components';

export default function RedTeamPage() {
  return (
    <TerminalNotFound
      lines={hackerLines}
      title="DENIED"
      statusText="ACCESS DENIED — THREAT LEVEL: CRITICAL"
      subtitle="Intrusion detected. Connection terminated. Incident logged."
      terminalUser="root@kali:~#"
      homeUrl="/"
      homeLabel="← Back"
      accentFrom="#dc2626"
      accentTo="#991b1b"
      gradientColors="135deg, #ef4444, #f97316"
      cursorColor="255, 80, 80"
      footerText="incident #7734 · firewall_block · access_revoked · threat_neutralised"
    />
  );
}
