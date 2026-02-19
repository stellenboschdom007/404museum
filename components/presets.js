/**
 * ─── Default terminal line presets ───
 *
 * Each line: { delay: ms, text: string, special?: 'red' | 'green' | 'yellow' | 'cyan' }
 *
 * Import a preset and pass it as the `lines` prop to <TerminalNotFound />,
 * or build your own array from scratch.
 */

export const cybersecurityLines = [
  { delay: 0,    text: '$ ping ' },
  { delay: 600,  text: '$ ping this-page.local' },
  { delay: 1200, text: 'PING this-page.local: 56 data bytes' },
  { delay: 1800, text: 'Request timeout for icmp_seq 0' },
  { delay: 2400, text: 'Request timeout for icmp_seq 1' },
  { delay: 3000, text: 'Request timeout for icmp_seq 2' },
  { delay: 3600, text: '--- this-page.local ping statistics ---' },
  { delay: 4200, text: '3 packets transmitted, 0 packets received, 100.0% packet loss' },
  { delay: 4800, text: '' },
  { delay: 5000, text: '$ nmap -sV this-page.local' },
  { delay: 5600, text: 'Starting Nmap 7.94 ...' },
  { delay: 6200, text: 'Note: Host seems down.' },
  { delay: 6800, text: '' },
  { delay: 7000, text: '$ whois thispage.co.za' },
  { delay: 7600, text: 'No match for "THISPAGE.CO.ZA".' },
  { delay: 8200, text: '' },
  { delay: 8400, text: '$ traceroute this-page.local' },
  { delay: 9000, text: ' 1  router.local (192.168.1.1)  0.432 ms' },
  { delay: 9600, text: ' 2  * * *' },
  { delay: 10200, text: ' 3  * * *' },
  { delay: 10800, text: ' 4  void (0.0.0.0)  ∞ ms' },
  { delay: 11400, text: '' },
  { delay: 11600, text: '# Diagnosis: page does not exist.', special: 'red' },
  { delay: 12200, text: '# Recommendation: go back home.', special: 'green' },
];

export const minimalLines = [
  { delay: 0,    text: '$ curl -I https://example.com/this-page' },
  { delay: 800,  text: 'HTTP/2 404' },
  { delay: 1400, text: 'content-type: text/html' },
  { delay: 2000, text: 'x-error: PAGE_NOT_FOUND' },
  { delay: 2600, text: '' },
  { delay: 2800, text: '# 404 — Resource not found.', special: 'red' },
];

export const hackerLines = [
  { delay: 0,    text: '$ ssh root@target' },
  { delay: 600,  text: 'Connection refused.' },
  { delay: 1200, text: '' },
  { delay: 1400, text: '$ nmap -sS -p 80,443 target' },
  { delay: 2000, text: 'Starting Nmap 7.94 ( https://nmap.org )' },
  { delay: 2600, text: 'All 2 scanned ports on target are filtered' },
  { delay: 3200, text: '' },
  { delay: 3400, text: '$ dig target ANY' },
  { delay: 4000, text: ';; connection timed out; no servers could be reached' },
  { delay: 4600, text: '' },
  { delay: 4800, text: '$ hydra -l admin -P wordlist.txt target ssh' },
  { delay: 5400, text: '[ERROR] target does not exist or is unreachable' },
  { delay: 6000, text: '' },
  { delay: 6200, text: '# ACCESS DENIED — Target does not exist.', special: 'red' },
  { delay: 6800, text: '# Return to base.', special: 'green' },
];

export const devopsLines = [
  { delay: 0,    text: '$ kubectl get pod app-frontend-7f9a2' },
  { delay: 600,  text: 'Error from server (NotFound): pods "app-frontend-7f9a2" not found' },
  { delay: 1200, text: '' },
  { delay: 1400, text: '$ docker ps | grep frontend' },
  { delay: 2000, text: '(no results)' },
  { delay: 2600, text: '' },
  { delay: 2800, text: '$ systemctl status nginx' },
  { delay: 3400, text: '● nginx.service - not found' },
  { delay: 4000, text: '' },
  { delay: 4200, text: '$ cat /var/log/nginx/error.log | tail -1' },
  { delay: 4800, text: '[error] 404: upstream not found' },
  { delay: 5400, text: '' },
  { delay: 5600, text: '# Service unavailable. Page does not exist.', special: 'red' },
  { delay: 6200, text: '# Redirect to homepage.', special: 'green' },
];

export const matrixLines = [
  { delay: 0,    text: '> INITIATING NEURAL HANDSHAKE...' },
  { delay: 600,  text: '> Connecting to the Matrix...' },
  { delay: 1200, text: '> Carrier signal: LOST' },
  { delay: 1800, text: '' },
  { delay: 2000, text: '> run lookup --node 0x404' },
  { delay: 2600, text: 'ERROR: Node 0x404 does not exist in construct.' },
  { delay: 3200, text: '' },
  { delay: 3400, text: '> trace --path /requested/page' },
  { delay: 4000, text: 'Path resolves to: NULL_POINTER' },
  { delay: 4600, text: 'Reality check: FAILED' },
  { delay: 5200, text: '' },
  { delay: 5400, text: '> free your mind' },
  { delay: 6000, text: 'There is no page.' },
  { delay: 6600, text: '' },
  { delay: 6800, text: '# SIMULATION ERROR — Node not found.', special: 'red' },
  { delay: 7400, text: '# Follow the white rabbit home.', special: 'green' },
];

export const glitchLines = [
  { delay: 0,    text: '$ cat /proc/page/status' },
  { delay: 500,  text: 'SEGFAULT at 0x00000404' },
  { delay: 1000, text: '' },
  { delay: 1100, text: '$ hexdump -C /dev/null | head' },
  { delay: 1600, text: '00000000  00 00 00 00 00 00 00 00  |........|' },
  { delay: 2100, text: '00000008  ff ff ff ff de ad be ef  |....Þ­¾ï|' },
  { delay: 2600, text: '' },
  { delay: 2800, text: '$ dmesg | tail -3' },
  { delay: 3300, text: '[  404.000] BUG: unable to handle page request' },
  { delay: 3800, text: '[  404.001] CR2: 0000000000000000' },
  { delay: 4300, text: '[  404.002] Kernel panic - not syncing: Fatal exception' },
  { delay: 4800, text: '' },
  { delay: 5000, text: '$ fsck /dev/page' },
  { delay: 5500, text: 'e2fsck: No such device or address' },
  { delay: 6000, text: '' },
  { delay: 6200, text: '# MEMORY CORRUPTION — Data unrecoverable.', special: 'red' },
  { delay: 6800, text: '# Reboot to safe state.', special: 'yellow' },
];

export const spaceLines = [
  { delay: 0,    text: '> MISSION CONTROL: Telemetry check' },
  { delay: 600,  text: '> Scanning sector 0x404...' },
  { delay: 1200, text: 'Signal strength: 0.000%' },
  { delay: 1800, text: '' },
  { delay: 2000, text: '> nav --destination /requested/page' },
  { delay: 2600, text: 'NAV ERROR: Coordinates do not match any known body.' },
  { delay: 3200, text: '' },
  { delay: 3400, text: '> comms --hail target' },
  { delay: 4000, text: '...' },
  { delay: 4600, text: '... ... ...' },
  { delay: 5200, text: 'No response. Deep space silence.' },
  { delay: 5800, text: '' },
  { delay: 6000, text: '> status crew' },
  { delay: 6600, text: 'Crew status: ADRIFT' },
  { delay: 7200, text: 'Oxygen: 12 minutes remaining' },
  { delay: 7800, text: '' },
  { delay: 8000, text: '# DESTINATION NOT FOUND — Lost in the void.', special: 'red' },
  { delay: 8600, text: '# Engage return thrusters.', special: 'green' },
];
