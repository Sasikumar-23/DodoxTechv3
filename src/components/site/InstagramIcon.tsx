// Self-hosted so the contact row doesn't depend on yet another third-party
// origin (the other brand icons hotlink Wikimedia). Draws the full Instagram
// glyph — gradient squircle, camera-body outline, lens and flash — rather than
// a flat mark, so it reads correctly next to the Gmail/WhatsApp logos.
export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Instagram">
      <defs>
        {/* Official brand gradient: warm yellow at lower-left sweeping through
            orange and magenta to indigo at upper-right. */}
        <radialGradient id="ig-g" cx="28%" cy="102%" r="140%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="10%" stopColor="#FFDD55" />
          <stop offset="28%" stopColor="#FA7E1E" />
          <stop offset="45%" stopColor="#FF543E" />
          <stop offset="62%" stopColor="#C837AB" />
          <stop offset="82%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </radialGradient>
      </defs>

      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="url(#ig-g)" />

      {/* Camera body */}
      <rect
        x="5.9"
        y="5.9"
        width="12.2"
        height="12.2"
        rx="3.7"
        fill="none"
        stroke="#fff"
        strokeWidth="1.85"
      />
      {/* Lens */}
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.85" />
      {/* Flash */}
      <circle cx="16.9" cy="7.1" r="1.15" fill="#fff" />
    </svg>
  );
}
