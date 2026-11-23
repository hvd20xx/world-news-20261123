import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface Pin {
  id: number;
  x: number;
  y: number;
  color: string;
}

const PINS: Pin[] = [
  { id: 1, x: 46, y: 58, color: '#1E6B7B' },   // Santa Clara / US
  { id: 2, x: 204, y: 39, color: '#C83E2B' },  // Perm / Rostov Russia
  { id: 3, x: 210, y: 71, color: '#C83E2B' },  // Strait of Hormuz / Iraq
  { id: 4, x: 190, y: 55, color: '#B06F12' },  // Antalya COP31
  { id: 5, x: 185, y: 97, color: '#8C3B2B' },  // Ituri DR Congo
  { id: 6, x: 175, y: 49, color: '#141B24' },  // Skopje / Greece
  { id: 7, x: 245, y: 73, color: '#1E6B7B' },  // Dhaka / Punjab
  { id: 8, x: 268, y: 105, color: '#1E6B7B' }, // Jakarta / EU-Indonesia
];

function dataUri(filePath: string): string {
  const b64 = readFileSync(filePath).toString('base64');
  const mime = filePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${b64}`;
}

function mapSvg(): string {
  const dots = PINS.map(
    (p) => `
      <g transform="translate(${p.x}, ${p.y})">
        <circle r="7.5" fill="${p.color}" stroke="#F6F1E7" stroke-width="1.6"/>
        <text y="3" text-anchor="middle" fill="#FFFDF8" font-size="8.5" font-weight="800" font-family="system-ui, sans-serif">${p.id}</text>
      </g>`,
  ).join('');

  return `
  <svg viewBox="0 0 340 156" width="100%" height="134" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #141B24;background:#DCE7E8;flex-shrink:0;">
    <defs>
      <pattern id="g23" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#BDD1D4" stroke-width="0.6"/>
      </pattern>
    </defs>
    <rect width="340" height="156" fill="url(#g23)"/>
    <line x1="0" y1="96" x2="340" y2="96" stroke="#8EB0B6" stroke-width="0.7" stroke-dasharray="3,3"/>
    <path d="M18,28 L55,22 L88,28 L96,42 L84,56 L70,64 L62,78 L52,75 L46,65 L32,58 L20,44 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M98,14 L118,12 L124,24 L110,30 L96,24 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M74,84 L92,84 L108,98 L104,116 L90,136 L82,142 L76,126 L72,106 L68,94 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M148,26 L176,22 L196,28 L194,46 L182,52 L166,54 L152,50 L144,40 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M148,60 L176,58 L192,68 L200,86 L194,108 L182,128 L170,130 L162,110 L156,92 L144,78 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M194,24 L256,20 L300,32 L296,54 L284,68 L268,78 L250,86 L236,80 L224,86 L208,78 L192,64 L188,50 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M254,96 L272,102 L286,105 L284,112 L264,108 L252,102 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    <path d="M266,118 L296,116 L306,130 L294,142 L272,138 L262,128 Z" fill="#EFE6D5" stroke="#55626B" stroke-width="0.9"/>
    ${dots}
    <rect x="6" y="6" width="106" height="16" rx="2" fill="#141B24"/>
    <text x="59" y="17" text-anchor="middle" fill="#F6F1E7" font-size="8.5" font-weight="700" letter-spacing="0.8" font-family="system-ui, sans-serif">GLOBAL FLASHPOINTS</text>
  </svg>`;
}

export function buildNews23Html(assetsDir: string): string {
  const voyager = dataUri(join(assetsDir, 'voyager.jpg'));
  const nvidia = dataUri(join(assetsDir, 'nvidia.jpg'));
  const refinery = dataUri(join(assetsDir, 'refinery.jpg'));
  const hormuz = dataUri(join(assetsDir, 'hormuz.jpg'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #F6F1E7;
    color: #141B24;
    font-family: Georgia, "Times New Roman", serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 18px 22px 14px 22px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    background: radial-gradient(circle at 50% 0%, #FAF6EE 0%, #F3ECE0 100%);
  }
  .masthead {
    border-top: 5px solid #141B24;
    border-bottom: 3px double #141B24;
    padding: 8px 0;
  }
  .mast-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #1E6B7B;
    margin-bottom: 3px;
  }
  .mast-pill {
    background: #C83E2B;
    color: #FFFDF8;
    padding: 3px 10px;
    border-radius: 2px;
    font-size: 11.5px;
    letter-spacing: 1px;
  }
  .mast-date {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .mast-date h1 {
    font-size: 46px;
    font-weight: 900;
    letter-spacing: -0.8px;
    line-height: 1.02;
    color: #141B24;
  }
  .mast-edition {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #4A5562;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  .row-lead {
    display: grid;
    grid-template-columns: 598px 368px;
    gap: 14px;
    height: 374px;
  }
  .lead-card {
    display: flex;
    flex-direction: column;
    border: 1.5px solid #141B24;
    background: #FFFDF8;
    overflow: hidden;
  }
  .lead-img-wrap {
    position: relative;
    height: 224px;
    overflow: hidden;
    border-bottom: 1.5px solid #141B24;
  }
  .lead-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .tag {
    position: absolute;
    top: 8px;
    left: 8px;
    background: #C83E2B;
    color: #FFFDF8;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    padding: 3px 8px;
  }
  .tag.teal { background: #1E6B7B; }
  .tag.ink { background: #141B24; }
  .lead-body {
    padding: 11px 15px 12px 15px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    justify-content: center;
  }
  .lead-body h2 {
    font-size: 27px;
    font-weight: 900;
    line-height: 1.08;
    color: #141B24;
  }
  .lead-body p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 14.2px;
    line-height: 1.32;
    color: #25303C;
  }
  .side-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 374px;
  }
  .flash-box {
    border: 1.5px solid #141B24;
    background: #FFFDF8;
    padding: 8px 11px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    overflow: hidden;
  }
  .kicker {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: #C83E2B;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .kicker.teal { color: #1E6B7B; }
  .kicker.ochre { color: #9E620C; }
  .kicker.ink { color: #141B24; }
  .num {
    display: inline-flex;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #C83E2B;
    color: #FFFDF8;
    font-size: 10px;
    font-weight: 800;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .num.teal { background: #1E6B7B; }
  .num.ochre { background: #B06F12; }
  .num.dark { background: #8C3B2B; }
  .num.ink { background: #141B24; }
  .flash-box h3 {
    font-size: 17px;
    font-weight: 900;
    line-height: 1.15;
    color: #141B24;
  }
  .flash-box p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 12.6px;
    line-height: 1.28;
    color: #2A3542;
  }
  .row-mid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    height: 288px;
  }
  .mid-card {
    border: 1.5px solid #141B24;
    background: #FFFDF8;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .mid-img {
    position: relative;
    height: 146px;
    border-bottom: 1.5px solid #141B24;
    overflow: hidden;
  }
  .mid-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .mid-body {
    padding: 9px 12px 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
    justify-content: center;
  }
  .mid-body h3 {
    font-size: 19px;
    font-weight: 900;
    line-height: 1.12;
    color: #141B24;
  }
  .mid-body p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 13px;
    line-height: 1.3;
    color: #25303C;
  }
  .row-bottom {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    flex: 1;
  }
  .wire-card {
    border-top: 3px solid #141B24;
    border-left: 1px solid #C8BFA9;
    border-right: 1px solid #C8BFA9;
    border-bottom: 1px solid #C8BFA9;
    background: #FAF6EE;
    padding: 9px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }
  .wire-card h3 {
    font-size: 18px;
    font-weight: 900;
    line-height: 1.14;
    color: #141B24;
  }
  .wire-card p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 13px;
    line-height: 1.32;
    color: #25303C;
  }
  .footer {
    background: #141B24;
    color: #F6F1E7;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
</head>
<body>
  <div class="page">
    <header class="masthead">
      <div class="mast-top">
        <span>THE WORLD IN ONE DAY · GLOBAL FRONT PAGE</span>
        <span class="mast-pill">8 STORIES · 6 CONTINENTS + DEEP SPACE</span>
      </div>
      <div class="mast-date">
        <h1>MONDAY, 23 NOVEMBER 2026</h1>
        <span class="mast-edition">NO. 327 · WORLD ATLAS</span>
      </div>
    </header>

    <section class="row-lead">
      <article class="lead-card">
        <div class="lead-img-wrap">
          <img src="${voyager}" alt="Voyager 1 reaches one light-day from Earth" />
          <span class="tag ink">SPACE MILESTONE · 25.9 BILLION KM FROM EARTH</span>
        </div>
        <div class="lead-body">
          <h2>Voyager 1 Reaches One Light-Day From Earth</h2>
          <p>Forty-nine years after launch, NASA's interstellar probe becomes the first human-made object to reach one full light-day from Earth—a milestone where every radio signal takes 24 hours each way.</p>
        </div>
      </article>

      <aside class="side-col">
        ${mapSvg()}
        <article class="flash-box">
          <div class="kicker ochre"><span class="num ochre">4</span> CLIMATE FALLOUT · ANTALYA / GLOBAL</div>
          <h3>COP31 Collapse Shakes Global Climate</h3>
          <p>Over 190 nations leave Turkey with no final cover text—the first total UN climate deadlock since 2009—alarming mountain states.</p>
        </article>
        <article class="flash-box">
          <div class="kicker"><span class="num dark">5</span> AFRICA · DR CONGO / LIBYA</div>
          <h3>Ituri Clashes Trap WHO; Libya UN Filing</h3>
          <p>Heavy fighting traps WHO Ebola responders in eastern DR Congo; eastern Libya files a UN complaint over Benghazi ship attacks.</p>
        </article>
      </aside>
    </section>

    <section class="row-mid">
      <article class="mid-card">
        <div class="mid-img">
          <img src="${nvidia}" alt="Nvidia reinstates Jensen Huang as CEO" />
          <span class="tag teal">1 · TECH &amp; MARKETS · CALIFORNIA, USA</span>
        </div>
        <div class="mid-body">
          <h3>Nvidia Reinstates Jensen Huang as CEO</h3>
          <p>Nvidia's board unanimously restores Jensen Huang as president and CEO less than two weeks after his exit; Colette Kress returns to CFO.</p>
        </div>
      </article>

      <article class="mid-card">
        <div class="mid-img">
          <img src="${refinery}" alt="Ukrainian drones strike Russian oil refineries" />
          <span class="tag">2 · WAR &amp; ENERGY · PERM &amp; ROSTOV, RUSSIA</span>
        </div>
        <div class="mid-body">
          <h3>Drones Hit Perm &amp; Novoshakhtinsk Refineries</h3>
          <p>A large-scale Ukrainian drone barrage strikes major Russian oil refining sites deep inside Perm Krai and Rostov Oblast.</p>
        </div>
      </article>

      <article class="mid-card">
        <div class="mid-img">
          <img src="${hormuz}" alt="Strait of Hormuz standoff and PKK withdrawal" />
          <span class="tag">3 · MIDDLE EAST · HORMUZ &amp; N. IRAQ</span>
        </div>
        <div class="mid-body">
          <h3>Hormuz Tensions Rise; PKK Exits 14 Bases</h3>
          <p>Trump warns U.S. strikes on Iran may resume if talks fail amid naval blockades; PKK withdraws from 14 northern Iraq bases.</p>
        </div>
      </article>
    </section>

    <section class="row-bottom">
      <article class="wire-card">
        <div class="kicker teal"><span class="num teal">1</span> AMERICAS · U.S. TRAVEL &amp; OTTAWA</div>
        <h3>Delta Outage Delays Flights; Canada–Qatar</h3>
        <p>A weight-and-balance computer outage disrupts Delta domestic flights nationwide; Canada and Qatar set their inaugural Strategic Dialogue in Ottawa.</p>
      </article>

      <article class="wire-card">
        <div class="kicker ink"><span class="num ink">6</span><span class="num teal">8</span> EUROPE &amp; TRADE · SKOPJE / JAKARTA</div>
        <h3>Skopje Plot Arrests; EU–Indonesia Trade</h3>
        <p>North Macedonia arrests five over an alleged plot targeting an executive in Greece; the EU and Indonesia advance a decade-long trade pact.</p>
      </article>

      <article class="wire-card">
        <div class="kicker teal"><span class="num teal">7</span> SOUTH ASIA · BANGLADESH / PAKISTAN</div>
        <h3>Dhaka Party Clashes &amp; Punjab Road Tragedy</h3>
        <p>Rival BNP faction clashes in Jhenaidah injure 15 and damage 28 homes and shops; an overturned stone truck kills seven in Punjab, Pakistan.</p>
      </article>
    </section>

    <footer class="footer">
      <span>MONDAY, 23 NOVEMBER 2026 — WORLD NEWS IN ONE IMAGE</span>
      <span>SPACE · TECH · SECURITY · CLIMATE · AFRICA · AMERICAS · EUROPE · ASIA</span>
    </footer>
  </div>
</body>
</html>`;
}

if (process.argv[1]?.endsWith('compose.ts')) {
  const assetsDir = process.argv[2] ?? '../news23-assets';
  const outHtml = process.argv[3] ?? '../news23-assets/poster.html';
  writeFileSync(outHtml, buildNews23Html(assetsDir), 'utf8');
  console.log(`Wrote ${outHtml}`);
}
