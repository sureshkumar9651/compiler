'use client';

import React from 'react';
import { Certificate } from '../types';
import { TerminalSquare, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { validateAndSanitizeLearnerName } from '../services/nameValidation';

interface CertificateDocumentProps {
  certificate: Certificate;
  className?: string;
}

export function CertificateDocument({ certificate, className = '' }: CertificateDocumentProps) {
  const nameResult = validateAndSanitizeLearnerName(certificate.learnerName);
  const displayName = nameResult.valid ? nameResult.sanitized : certificate.learnerName;

  const issueDateFormatted = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto bg-[#060913] text-white border-4 sm:border-8 border-blue-600 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl shadow-blue-950/60 overflow-hidden text-center select-none ${className}`}
      data-testid="certificate-document"
    >
      {/* 1. Outer Gold / Champagne Accent Pinstripe */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-400/40 rounded-2xl pointer-events-none" />

      {/* 2. Inner Fine Cyan Border */}
      <div className="absolute inset-3.5 sm:inset-5 border border-sky-500/20 rounded-xl pointer-events-none" />

      {/* 3. Subtle Ambient Lighting Glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 4. Luxury Corner Ornaments (All 4 Corners) */}
      <div className="absolute top-5 left-5 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-1 bg-gradient-to-r from-amber-400 to-sky-400" />
        <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-amber-400 to-sky-400" />
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rotate-45 bg-amber-400" />
      </div>

      <div className="absolute top-5 right-5 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 right-0 w-8 h-1 bg-gradient-to-l from-amber-400 to-sky-400" />
        <div className="absolute top-0 right-0 w-1 h-8 bg-gradient-to-b from-amber-400 to-sky-400" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rotate-45 bg-amber-400" />
      </div>

      <div className="absolute bottom-5 left-5 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-amber-400 to-sky-400" />
        <div className="absolute bottom-0 left-0 w-1 h-8 bg-gradient-to-t from-amber-400 to-sky-400" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rotate-45 bg-amber-400" />
      </div>

      <div className="absolute bottom-5 right-5 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-8 h-1 bg-gradient-to-l from-amber-400 to-sky-400" />
        <div className="absolute bottom-0 right-0 w-1 h-8 bg-gradient-to-t from-amber-400 to-sky-400" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rotate-45 bg-amber-400" />
      </div>

      {/* ================= 5. ELEGANT WATERMARK LAYER ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <svg
          viewBox="0 0 500 500"
          className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] opacity-[0.05] sm:opacity-[0.065] text-sky-400 animate-pulse-slow"
          fill="none"
          stroke="currentColor"
        >
          {/* Concentric Guilloche Circles */}
          <circle cx="250" cy="250" r="235" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="250" cy="250" r="215" strokeWidth="1" />
          <circle cx="250" cy="250" r="175" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="250" cy="250" r="140" strokeWidth="2" />
          <circle cx="250" cy="250" r="100" strokeWidth="1" strokeDasharray="8 4" />
          <circle cx="250" cy="250" r="70" strokeWidth="2.5" />

          {/* Radial Spokes (12 spokes) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="250"
              y1="250"
              x2={250 + 215 * Math.cos((deg * Math.PI) / 180)}
              y2={250 + 215 * Math.sin((deg * Math.PI) / 180)}
              strokeWidth="0.75"
            />
          ))}

          {/* Center Watermark Monogram */}
          <text
            x="250"
            y="262"
            textAnchor="middle"
            fontSize="54"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
            fill="currentColor"
            stroke="none"
          >
            &lt; / &gt;
          </text>

          {/* Watermark Arch Text */}
          <text
            x="250"
            y="125"
            textAnchor="middle"
            fontSize="12"
            letterSpacing="6"
            fontWeight="bold"
            fill="currentColor"
            stroke="none"
          >
            JS CODELAB ACADEMY
          </text>
          <text
            x="250"
            y="390"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="5"
            fontWeight="bold"
            fill="currentColor"
            stroke="none"
          >
            OFFICIAL CREDENTIAL · VERIFIED
          </text>
        </svg>
      </div>

      {/* ================= 6. FOREGROUND CERTIFICATE CONTENT ================= */}
      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* Website Logo Brand Header */}
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-950/90 border border-blue-500/50 text-blue-400 shadow-md shadow-blue-950/50 flex items-center justify-center">
            <TerminalSquare className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-2xl tracking-tight text-white font-sans">
                JS CodeLab
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-500/20 text-sky-300 border border-blue-400/30 uppercase tracking-wider">
                Academy
              </span>
            </div>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium text-neutral-400 leading-tight pt-0.5">
              Official Credential of Achievement
            </p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            Certificate of Achievement
          </h1>
          <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-amber-400/90">
            This certificate is proudly presented to
          </p>
        </div>

        {/* Recipient Name with Ornate Nameplate Underline */}
        <div className="py-2 sm:py-3 flex flex-col items-center">
          <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-sky-200 inline-block px-4 sm:px-8 max-w-full break-words drop-shadow-sm pb-3 sm:pb-4 leading-normal">
            {displayName}
          </span>

          {/* Ornate Diamond Underline with ample breathing room */}
          <div className="flex items-center justify-center gap-3 mt-2 sm:mt-3">
            <div className="h-0.5 w-16 sm:w-32 bg-gradient-to-r from-transparent via-blue-500 to-sky-400" />
            <div className="w-2.5 h-2.5 rotate-45 border border-amber-300 bg-amber-400/30" />
            <div className="h-0.5 w-16 sm:w-32 bg-gradient-to-l from-transparent via-blue-500 to-sky-400" />
          </div>
        </div>

        {/* Certification Details */}
        <div className="space-y-2.5 sm:space-y-3 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            has successfully demonstrated comprehensive technical proficiency and passed the examination for
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
            {certificate.certificationTitle}
          </p>
          <div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-600/80 shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Passing Score Achieved: {certificate.score}%</span>
            </div>
          </div>
        </div>

        {/* ================= 7. FOOTER SECTION ================= */}
        <div className="pt-6 sm:pt-8 border-t border-neutral-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          {/* Left: Metadata */}
          <div className="space-y-1 text-xs text-neutral-400 order-2 md:order-1">
            <p>
              Issue Date:{' '}
              <span className="text-neutral-200 font-semibold">{issueDateFormatted}</span>
            </p>
            <p className="font-mono text-[11px]">
              Certificate ID:{' '}
              <span className="text-neutral-100 font-bold">{certificate.id}</span>
            </p>
            <p className="font-mono text-[10px] text-neutral-500 truncate max-w-xs mx-auto md:mx-0">
              Checksum: {certificate.verificationHash.substring(0, 20)}...
            </p>
          </div>

          {/* Center: Golden Seal Medallion */}
          <div className="flex flex-col items-center justify-center order-1 md:order-2">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              {/* Ribbon Tails */}
              <div className="absolute -bottom-2 -left-1 w-4 h-8 bg-gradient-to-b from-amber-600 to-amber-900 rotate-12 shadow-sm rounded-b-xs" />
              <div className="absolute -bottom-2 -right-1 w-4 h-8 bg-gradient-to-b from-amber-600 to-amber-900 -rotate-12 shadow-sm rounded-b-xs" />

              {/* Outer Dashed Gold Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/80" />

              {/* Metallic Gold Ring */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#060c20] border border-amber-300/40 flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-[6px] sm:text-[7px] font-extrabold tracking-widest text-amber-300 uppercase leading-none">
                    OFFICIAL
                  </span>
                  <span className="text-xs sm:text-sm font-black tracking-tight text-white leading-tight font-serif">
                    JS
                  </span>
                  <span className="text-[6px] sm:text-[7px] font-extrabold tracking-wider text-amber-400 uppercase leading-none">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-300/80 pt-1.5">
              Credential Seal
            </span>
          </div>

          {/* Right: Issuing Authority */}
          <div className="text-center md:text-right space-y-1 text-xs order-3">
            <p className="font-bold text-sky-400 text-xs sm:text-sm">JS CodeLab Academy</p>
            <p className="text-[11px] text-neutral-400">Credential Verification Authority</p>
          </div>

        </div>
      </div>
    </div>
  );
}
