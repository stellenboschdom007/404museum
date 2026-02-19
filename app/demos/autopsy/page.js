'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const now = new Date();
const reportDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const reportTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

const sections = [
  {
    title: 'IDENTIFYING INFORMATION',
    rows: [
      ['Case Number', 'WEB-404-' + String(Math.floor(Math.random() * 90000) + 10000)],
      ['Subject', '/requested/page.html'],
      ['Type', 'Web Page (text/html)'],
      ['Date of Incident', reportDate],
      ['Time of Discovery', reportTime],
      ['Examiner', 'Dr. Server Error, M.D., HTTP'],
    ],
  },
  {
    title: 'CIRCUMSTANCES OF DEATH',
    content: `The subject (hereinafter referred to as "The Page") was pronounced dead on arrival at ${reportTime} on ${reportDate}. The Page was discovered missing during a routine GET request by an unidentified User Agent (Mozilla/5.0 compatible). No prior medical history is available as all server logs have been rotated.`,
  },
  {
    title: 'EXTERNAL EXAMINATION',
    content: 'The Page presents as a complete absence of content with no visible HTML structure, CSS styling, or JavaScript functionality. No response body was detected. The HTTP status header reads "404 Not Found." There is an associated Content-Length of 0 bytes. No signs of partial content (206) or redirect (301/302) were observed.',
  },
  {
    title: 'CAUSE OF DEATH',
    content: 'Based on a thorough examination of the server filesystem, DNS records, routing configuration, and deployment pipeline, the cause of death is determined to be:\n\nPrimary: Resource Not Found (HTTP 404)\nContributing: Possible accidental deletion, route misconfiguration, or deployment failure\nManner of Death: Undetermined (possible homicide by git force-push)',
  },
  {
    title: 'TOXICOLOGY',
    rows: [
      ['Malware', 'Negative'],
      ['SQL Injection', 'Negative'],
      ['XSS Payload', 'Negative'],
      ['Deprecated Dependencies', 'Positive (lethal levels)'],
      ['Technical Debt', 'Positive (chronic)'],
    ],
  },
  {
    title: 'OPINION',
    content: 'It is the opinion of this examiner that The Page is irretrievably deceased. Resuscitation efforts including cache retrieval, CDN purge, and Wayback Machine consultation have been unsuccessful. The Page is survived by its parent directory, a sitemap.xml, and several orphaned CSS files.',
  },
];

export default function AutopsyPage() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => {
        if (v >= sections.length) { clearInterval(interval); return v; }
        return v + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#f0f0f0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      <div
        style={{
          maxWidth: 680,
          width: '100%',
          background: 'white',
          padding: '48px 48px 40px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          position: 'relative',
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            fontSize: 60,
            fontWeight: 900,
            color: 'rgba(200, 0, 0, 0.04)',
            letterSpacing: 12,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          DECEASED
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: 20, marginBottom: 24 }}>
          <p style={{ fontSize: 10, color: '#999', letterSpacing: 4, marginBottom: 4 }}>
            OFFICE OF THE CHIEF SERVER EXAMINER
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#222', letterSpacing: 3, marginBottom: 4 }}>
            AUTOPSY REPORT
          </h1>
          <p style={{ fontSize: 10, color: '#999', letterSpacing: 2 }}>
            DEPARTMENT OF WEB PATHOLOGY
          </p>
        </div>

        {/* Sections */}
        {sections.slice(0, visible).map((section, i) => (
          <div
            key={i}
            style={{
              marginBottom: 24,
              opacity: 1,
              animation: 'fadeUp 0.4s ease',
            }}
          >
            <h2
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#666',
                letterSpacing: 3,
                borderBottom: '1px solid #ddd',
                paddingBottom: 6,
                marginBottom: 10,
              }}
            >
              {section.title}
            </h2>

            {section.rows ? (
              <table style={{ width: '100%', fontSize: 12 }}>
                <tbody>
                  {section.rows.map(([label, value], j) => (
                    <tr key={j}>
                      <td style={{ color: '#888', padding: '3px 0', width: '40%', verticalAlign: 'top' }}>{label}:</td>
                      <td style={{ color: '#333', padding: '3px 0' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ fontSize: 12, color: '#444', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                {section.content}
              </p>
            )}
          </div>
        ))}
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>

        {/* Signature area */}
        {visible >= sections.length && (
          <div
            style={{
              borderTop: '1px solid #ddd',
              paddingTop: 24,
              marginTop: 32,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <div
                style={{
                  borderBottom: '1px solid #333',
                  width: 200,
                  marginBottom: 4,
                  paddingBottom: 4,
                  fontStyle: 'italic',
                  color: '#333',
                  fontSize: 14,
                  fontFamily: 'cursive',
                }}
              >
                Dr. S. Error
              </div>
              <p style={{ fontSize: 10, color: '#888' }}>Chief Server Examiner</p>
              <p style={{ fontSize: 10, color: '#888' }}>{reportDate}</p>
            </div>
            <Link
              href="/"
              style={{
                fontSize: 12,
                color: '#888',
                textDecoration: 'none',
                border: '1px solid #ccc',
                padding: '6px 16px',
                borderRadius: 2,
              }}
            >
              ← Close File
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
