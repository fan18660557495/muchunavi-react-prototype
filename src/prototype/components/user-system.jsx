// Design system primitives — distilled from MyPage canonical layout.
// Rules:
//   - Hero cards: radius 8 + soft shadow, large surfaces only
//   - Flat cards: radius 0, hairline border, cream surface
//   - Flat rows: no card wrapper, hairline dividers, serif title + caps EN subtitle + chevron
//   - Stats: no card, vertical hairlines between columns, ink serif numbers
//   - Filter chips: outlined, active = gold border + goldDeep text
//   - Icons: outlined SVG, stroke 1.5px, ink color
//   - Gold accents only — never large filled gradients
//
// All components are attached to window.MU_* for parity with existing primitives.

import React from 'react';

const T = () => window.MU_TOKENS;

// ============== MU_PageHeader ==============
// Top action icons row (share / settings / etc). Right-aligned, ink icons.
window.MU_PageHeader = function MU_PageHeader({ children, padX = 20, padY = 8, gap = 18 }) {
  return (
    <div style={{ padding: `${padY}px ${padX}px`, display: 'flex', justifyContent: 'flex-end', gap }}>
      {children}
    </div>
  );
};

// Outlined icon button — uniform stroke ink icon
window.MU_HeaderIconButton = function MU_HeaderIconButton({ onClick, ariaLabel, children, size = 22 }) {
  const t = T();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, color: t.ink }}
    >
      {children}
    </button>
  );
};

// ============== MU_HeroCard ==============
// Large prominent card — radius 8, soft shadow. Customizable bg.
window.MU_HeroCard = function MU_HeroCard({ children, bg, padding = '18px 20px 14px', style = {} }) {
  const t = T();
  return (
    <div style={{
      borderRadius: t.r.md,
      position: 'relative',
      background: bg || t.ink,
      boxShadow: t.shadowMd,
      padding,
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
};

// ============== MU_FlatCard ==============
// Medium card — no radius, hairline border, soft cream surface.
window.MU_FlatCard = function MU_FlatCard({ children, padding = '12px 14px', style = {} }) {
  const t = T();
  return (
    <div style={{
      borderRadius: t.r.none,
      background: '#FBF8F4',
      border: `0.5px solid ${t.hairline}`,
      padding,
      ...style,
    }}>
      {children}
    </div>
  );
};

// ============== MU_FlatRow / MU_FlatRowGroup ==============
// List row pattern: serif Japanese label + small caps EN + optional tag + optional count + chevron.
window.MU_FlatRow = function MU_FlatRow({ label, en, tagText, count, onClick, padding = '12px 0' }) {
  const t = T();
  return (
    <div
      onClick={onClick}
      style={{ padding, display: 'flex', alignItems: 'center', gap: 10, cursor: onClick ? 'pointer' : 'default' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flex: 1 }}>
        <div style={{ fontSize: 14, color: t.ink, fontFamily: t.fontSerif, letterSpacing: '0.03em', fontWeight: 500 }}>{label}</div>
        {en ? <div style={{ fontSize: 9, color: t.inkMid, letterSpacing: '0.16em', fontFamily: t.fontBrand }}>{en}</div> : null}
        {tagText ? <div style={{ fontSize: 9, color: t.goldDeep, letterSpacing: '0.04em' }}>{tagText}</div> : null}
      </div>
      {count != null ? <div style={{ fontSize: 13, color: t.ink, fontFamily: t.fontSerif, fontWeight: 500 }}>{count}</div> : null}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.inkLow} strokeWidth="1.5"><path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
};

// Wraps a list of rows, drawing 0.5px hairline between them. Optionally adds a top border (for group separation).
window.MU_FlatRowGroup = function MU_FlatRowGroup({ children, topBorder = false, padX = 20, marginTop = 14 }) {
  const t = T();
  const arr = React.Children.toArray(children);
  return (
    <div style={{ margin: `${marginTop}px ${padX}px 0`, paddingTop: topBorder ? 6 : 0, borderTop: topBorder ? `0.5px solid ${t.hairline}` : 'none' }}>
      {arr.map((child, i) => (
        <div key={i} style={{ borderTop: i > 0 ? `0.5px solid ${t.hairline}` : 'none' }}>{child}</div>
      ))}
    </div>
  );
};

// ============== MU_StatColumns ==============
// Multi-column stat row, no card wrapper, vertical hairlines between columns.
window.MU_StatColumns = function MU_StatColumns({ items, onItemClick, padX = 20, marginTop = 14, numFontSize = 24 }) {
  const t = T();
  return (
    <div style={{ margin: `${marginTop}px ${padX}px 0`, padding: '4px 0', display: 'flex' }}>
      {items.map((item, i) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onItemClick?.(item)}
          style={{ flex: 1, textAlign: 'center', borderLeft: i > 0 ? `0.5px solid ${t.hairline}` : 'none', cursor: 'pointer', background: 'transparent', padding: '2px 0', border: 'none' }}
        >
          <div style={{ fontFamily: t.fontSerif, fontSize: numFontSize, color: t.ink, fontWeight: 500, lineHeight: 1.1 }}>{item.num}</div>
          <div style={{ fontSize: 9, color: t.inkMid, marginTop: 3, letterSpacing: '0.02em', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 2px' }}>{item.label}</div>
        </button>
      ))}
    </div>
  );
};

// ============== MU_FilterChip ==============
// Outlined chip; active state gets gold border + ink text.
// Uniform width: weight stays 500 to avoid layout shift on toggle.
window.MU_FilterChip = function MU_FilterChip({ active, onClick, children, height = 44, radius = 3, fullWidth = true }) {
  const t = T();
  return (
    <button
      type="button"
      onClick={onClick}
      data-no-global-translate="true"
      style={{
        flex: fullWidth ? 1 : undefined,
        height,
        borderRadius: radius,
        border: `0.5px solid ${active ? t.gold : t.hairlineStrong}`,
        background: 'transparent',
        color: active ? t.ink : t.inkLow,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        fontFamily: t.fontSans,
      }}
    >
      {children}
    </button>
  );
};

// ============== MU_OutlinedButton ==============
// Reusable secondary CTA — white/cream bg + hairline + goldDeep text. Sharp corners.
window.MU_OutlinedButton = function MU_OutlinedButton({ children, onClick, padding = '6px 12px' }) {
  const t = T();
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding,
        borderRadius: t.r.none,
        background: '#FBF8F4',
        border: `0.5px solid ${t.hairlineStrong}`,
        color: t.goldDeep,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.04em',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

// ============== MU_SectionDivider ==============
// 0.5px hairline divider — full width or specified width.
window.MU_SectionDivider = function MU_SectionDivider({ width = '100%', marginY = 0 }) {
  const t = T();
  return <div style={{ width, height: 1, background: t.hairline, margin: `${marginY}px auto` }} />;
};
