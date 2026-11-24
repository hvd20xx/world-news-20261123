import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface StoryPin {
  id: string;
  x: number;
  y: number;
  color: string;
}

const PINS: StoryPin[] = [
  { id: '2', x: 44, y: 52, color: '#175E6E' },    // Santa Clara Nvidia
  { id: '3', x: 182, y: 35, color: '#B93122' },   // Brussels NATO / Poland
  { id: '4', x: 207, y: 35, color: '#B93122' },   // Perm & Rostov Russia
  { id: '5', x: 214, y: 69, color: '#B93122' },   // Strait of Hormuz / N. Iraq
  { id: '6', x: 192, y: 51, color: '#8A4F16' },   // Antalya COP31 fallout
  { id: '7', x: 74, y: 49, color: '#175E6E' },    // Washington Rubio-Qatar / Delta
  { id: '8', x: 56, y: 68, color: '#8A4F16' },    // Sinaloa El Chapo Isidro
  { id: '9', x: 96, y: 112, color: '#8A4F16' },   // Southern Brazil storms / Vaca Muerta
  { id: '10', x: 82, y: 88, color: '#B93122' },   // Colombia counter-drone race
  { id: '11', x: 174, y: 45, color: '#175E6E' },  // Brussels EU 22nd sanctions / Skopje
  { id: '13', x: 190, y: 92, color: '#6E2F26' },  // Ituri DRC WHO / Libya UN
  { id: '15', x: 268, y: 102, color: '#175E6E' }, // EU-Indonesia trade pact
  { id: '16', x: 278, y: 50, color: '#175E6E' },  // Beijing China-Dutch FM talks
  { id: '17', x: 242, y: 68, color: '#B86A14' },  // Bangladesh / Punjab Pakistan
];

function dataUri(filePath: string): string {
  const b64 = readFileSync(filePath).toString('base64');
  const mime = filePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${b64}`;
}

function renderMapSvg(): string {
  const pinMarkup = PINS.map(
    (p) => `
      <g transform="translate(${p.x}, ${p.y})">
        <circle r="6.7" fill="${p.color}" stroke="#FFFDF8" stroke-width="1.4"/>
        <text y="2.8" text-anchor="middle" fill="#FFFDF8" font-size="7.3" font-weight="800" font-family="Segoe UI, system-ui, sans-serif">${p.id}</text>
      </g>`,
  ).join('');

  return `
  <svg viewBox="0 0 340 138" width="100%" height="122" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #141B24;background:#D6E4E7;flex-shrink:0;">
    <defs>
      <pattern id="g23" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#BED2D6" stroke-width="0.6"/>
      </pattern>
    </defs>
    <rect width="340" height="138" fill="url(#g23)"/>
    <line x1="0" y1="84" x2="340" y2="84" stroke="#89ACB3" stroke-width="0.7" stroke-dasharray="3,3"/>
    <path d="M14,24 L48,18 L86,24 L94,38 L82,52 L68,60 L61,74 L52,71 L45,60 L30,52 L18,38 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M98,11 L120,10 L125,21 L110,26 L96,20 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M72,76 L92,77 L110,92 L104,112 L90,131 L81,134 L76,118 L72,98 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M146,22 L176,18 L198,24 L196,43 L182,48 L164,50 L150,46 L143,36 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M146,54 L176,52 L194,62 L202,80 L195,104 L183,123 L171,124 L163,104 L156,85 L144,72 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M196,20 L260,16 L308,28 L302,50 L290,64 L272,74 L252,80 L238,74 L224,80 L208,72 L194,58 L190,46 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M254,90 L274,96 L292,100 L289,107 L266,104 L252,97 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    <path d="M268,112 L300,110 L310,123 L298,134 L274,131 L265,121 Z" fill="#EFE6D4" stroke="#4D5B65" stroke-width="0.9"/>
    ${pinMarkup}
    <rect x="5" y="5" width="146" height="15" rx="2" fill="#141B24"/>
    <text x="78" y="15.2" text-anchor="middle" fill="#F6F1E7" font-size="7.7" font-weight="800" letter-spacing="0.45" font-family="Segoe UI, system-ui, sans-serif">7-REGION FLASHPOINT ATLAS</text>
    <rect x="242" y="5" width="93" height="15" rx="2" fill="#175E6E"/>
    <text x="288.5" y="15.2" text-anchor="middle" fill="#FFFDF8" font-size="7.5" font-weight="800" font-family="Segoe UI, system-ui, sans-serif">1 · 1 LIGHT-DAY DEEP</text>
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
    background: #F5EFE3;
    color: #131A22;
    font-family: Georgia, "Times New Roman", serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 13px 18px 11px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(180deg, #FAF6EE 0%, #F2EBDD 100%);
  }
  .masthead {
    border-top: 4.5px solid #131A22;
    border-bottom: 3px double #131A22;
    padding: 5px 0;
  }
  .mast-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    color: #175E6E;
    margin-bottom: 2px;
  }
  .mast-pill {
    background: #B93122;
    color: #FFFDF8;
    padding: 2px 9px;
    border-radius: 2px;
    font-size: 10.5px;
    letter-spacing: 0.9px;
  }
  .mast-date {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .mast-date h1 {
    font-size: 35px;
    line-height: 1.02;
    font-weight: 900;
    letter-spacing: 0.4px;
    color: #111820;
  }
  .mast-edition {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 11.5px;
    font-weight: 800;
    color: #394652;
    letter-spacing: 0.7px;
  }
  .row-lead {
    display: grid;
    grid-template-columns: 1.46fr 1fr;
    gap: 10px;
    height: 316px;
  }
  .lead-card {
    border: 1.5px solid #131A22;
    background: #FFFDF9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .lead-img-wrap {
    position: relative;
    height: 196px;
    overflow: hidden;
    border-bottom: 1.5px solid #131A22;
  }
  .lead-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .tag {
    position: absolute;
    top: 7px;
    left: 7px;
    background: #B93122;
    color: #FFFDF8;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.7px;
    padding: 3px 7px;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.35);
  }
  .tag.ink { background: #141B24; }
  .tag.teal { background: #175E6E; }
  .lead-body {
    padding: 8px 11px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .lead-body h2 {
    font-size: 20.5px;
    line-height: 1.12;
    font-weight: 900;
    color: #111820;
  }
  .lead-body p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 11.4px;
    line-height: 1.32;
    color: #27323C;
  }
  .side-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 7px;
  }
  .flash-box {
    border: 1.5px solid #131A22;
    background: #FFFDF9;
    padding: 6px 9px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .kicker {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 9.6px;
    font-weight: 800;
    letter-spacing: 0.65px;
    color: #B93122;
    text-transform: uppercase;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .kicker.ochre { color: #9A5510; }
  .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 15px;
    height: 15px;
    padding: 0 3px;
    border-radius: 8px;
    background: #B93122;
    color: #FFFDF8;
    font-size: 9px;
    font-weight: 800;
  }
  .num.teal { background: #175E6E; }
  .num.ochre { background: #B86A14; }
  .num.plum { background: #6E2F26; }
  .flash-box h3 {
    font-size: 14px;
    line-height: 1.14;
    font-weight: 800;
    margin-bottom: 2px;
    color: #111820;
  }
  .flash-box p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10.6px;
    line-height: 1.27;
    color: #2B3640;
  }
  .row-mid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    height: 244px;
  }
  .mid-card {
    border: 1.5px solid #131A22;
    background: #FFFDF9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .mid-img {
    position: relative;
    height: 128px;
    border-bottom: 1.5px solid #131A22;
    overflow: hidden;
  }
  .mid-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .mid-body {
    padding: 6px 9px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .mid-body h3 {
    font-size: 14.8px;
    line-height: 1.14;
    font-weight: 800;
    color: #111820;
  }
  .mid-body p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10.7px;
    line-height: 1.28;
    color: #2B3640;
  }
  .row-desks {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 9px;
    height: 318px;
  }
  .desk {
    border: 1.5px solid #131A22;
    background: #FFFDF9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .desk-head {
    background: #131A22;
    color: #FAF6EE;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.8px;
    padding: 4px 8px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
  }
  .desk-head.teal { background: #175E6E; }
  .desk-head.ochre { background: #8A4F16; }
  .desk-head.plum { background: #6E2F26; }
  .desk-items {
    padding: 6px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 5px;
  }
  .item {
    border-bottom: 1px dashed #CBBFA8;
    padding-bottom: 5px;
  }
  .item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .item h4 {
    font-size: 12.2px;
    line-height: 1.15;
    font-weight: 800;
    color: #111820;
    margin-bottom: 2px;
  }
  .item p {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10.2px;
    line-height: 1.25;
    color: #2B3640;
  }
  .footer {
    background: #131A22;
    color: #F5EFE3;
    padding: 4px 10px;
    display: flex;
    justify-content: space-between;
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 9.8px;
    font-weight: 800;
    letter-spacing: 0.75px;
  }
</style>
</head>
<body>
  <div class="page">
    <header class="masthead">
      <div class="mast-top">
        <span>THE WORLD IN ONE DAY · GLOBAL DISPATCH &amp; NEWS ATLAS</span>
        <span class="mast-pill">17 STORIES · ALL 7 REGIONS + INTERSTELLAR</span>
      </div>
      <div class="mast-date">
        <h1>MONDAY, 23 NOVEMBER 2026</h1>
        <span class="mast-edition">EDITION 327 · VERIFIED 24-HOUR WORLD BRIEFING</span>
      </div>
    </header>

    <section class="row-lead">
      <article class="lead-card">
        <div class="lead-img-wrap">
          <img src="${voyager}" alt="Voyager 1 reaches one light-day from Earth" />
          <span class="tag ink">1 · INTERSTELLAR MILESTONE · 25.9 BILLION KM</span>
        </div>
        <div class="lead-body">
          <h2>Voyager 1 Crosses One Light-Day From Earth</h2>
          <p>Forty-nine years after launch, NASA's interstellar spacecraft stands 16.1 billion miles (25.9B km) away—the first human-made object where every one-way radio command takes a full 24 hours.</p>
        </div>
      </article>

      <aside class="side-col">
        ${renderMapSvg()}
        <article class="flash-box">
          <div class="kicker"><span class="num">3</span> NATO &amp; EUROPE · BRUSSELS / POLAND</div>
          <h3>NATO Emergency Talks on Polish Airspace</h3>
          <p>Allied defense chiefs convene in Brussels after suspected Russian drone/missile incursions into Poland as the EU advances its 22nd sanctions package.</p>
        </article>
        <article class="flash-box">
          <div class="kicker ochre"><span class="num ochre">6</span> CLIMATE FALLOUT · ANTALYA / GLOBAL</div>
          <h3>COP31 Deadlock Leaves 190+ Nations Split</h3>
          <p>Governments weigh next steps after Turkey climate talks collapse with no cover text—the first UN climate summit failure since 2009.</p>
        </article>
      </aside>
    </section>

    <section class="row-mid">
      <article class="mid-card">
        <div class="mid-img">
          <img src="${nvidia}" alt="Nvidia reinstates Jensen Huang as CEO" />
          <span class="tag teal">2 · TECH &amp; MARKETS · SANTA CLARA, USA</span>
        </div>
        <div class="mid-body">
          <h3>Nvidia Reinstates Jensen Huang as CEO</h3>
          <p>Nvidia's board unanimously restores Jensen Huang as president &amp; CEO after U.S. clearance; Colette Kress returns to CFO.</p>
        </div>
      </article>

      <article class="mid-card">
        <div class="mid-img">
          <img src="${refinery}" alt="Ukrainian drones strike Russian oil refineries" />
          <span class="tag">4 · WAR &amp; ENERGY · PERM &amp; ROSTOV</span>
        </div>
        <div class="mid-body">
          <h3>Drones Strike Perm &amp; Rostov Refineries</h3>
          <p>Long-range Ukrainian UAVs hit major Russian oil refining complexes deep inside Perm Krai and Novoshakhtinsk, Rostov Oblast.</p>
        </div>
      </article>

      <article class="mid-card">
        <div class="mid-img">
          <img src="${hormuz}" alt="Strait of Hormuz standoff and PKK withdrawal" />
          <span class="tag">5 · MIDDLE EAST · HORMUZ &amp; N. IRAQ</span>
        </div>
        <div class="mid-body">
          <h3>Hormuz Blockade &amp; PKK Base Exit</h3>
          <p>U.S. naval forces enforce oil blockade pressure amid Hormuz shipping attacks; PKK fighters withdraw from 14 northern Iraq bases.</p>
        </div>
      </article>
    </section>

    <section class="row-desks">
      <div class="desk">
        <div class="desk-head teal"><span>AMERICAS</span><span>#7–#10</span></div>
        <div class="desk-items">
          <div class="item">
            <h4><span class="num teal">7</span> Rubio–Qatar Talks &amp; Delta Glitch</h4>
            <p>Sec. Rubio meets Qatar's PM in Washington; weight-and-balance outage delays Delta flights ahead of Thanksgiving rush.</p>
          </div>
          <div class="item">
            <h4><span class="num ochre">8</span> Sinaloa Clampdown After Capture</h4>
            <p>U.S.-backed Mexican forces hold FBI fugitive "El Chapo Isidro" amid Sinaloa security sweeps; SpaceX debris cleanup urged.</p>
          </div>
          <div class="item">
            <h4><span class="num ochre">9</span><span class="num">10</span> Brazil Storms &amp; Colombia</h4>
            <p>Rio Grande do Sul storm toll hits 5 (250+ hurt); Colombia races for counter-drone defenses after base strikes.</p>
          </div>
        </div>
      </div>

      <div class="desk">
        <div class="desk-head"><span>EUROPE &amp; DIPLOMACY</span><span>#11–#12</span></div>
        <div class="desk-items">
          <div class="item">
            <h4><span class="num teal">11</span> EU 22nd Russia Sanctions Push</h4>
            <p>European capitals move to tighten energy and war-finance curbs on Moscow following weekend drone and maritime escalations.</p>
          </div>
          <div class="item">
            <h4><span class="num">12</span> Skopje Arrests Over Plot</h4>
            <p>North Macedonia detains five suspects over an alleged cross-border plot targeting an executive in neighboring Greece.</p>
          </div>
          <div class="item">
            <h4>Argentina Falklands Oil Protest</h4>
            <p>Buenos Aires sanctions offshore drilling entities over UK-backed North Malvinas Basin plans while signing Brazil gas export deal.</p>
          </div>
        </div>
      </div>

      <div class="desk">
        <div class="desk-head plum"><span>AFRICA &amp; MIDEAST</span><span>#13–#14</span></div>
        <div class="desk-items">
          <div class="item">
            <h4><span class="num plum">13</span> Ituri Clashes Trap WHO Team</h4>
            <p>Heavy fighting in eastern DR Congo traps WHO health responders; humanitarian agencies warn of civilian displacement.</p>
          </div>
          <div class="item">
            <h4><span class="num plum">14</span> Libya Files UN Port Complaint</h4>
            <p>Eastern Libyan authorities lodge a formal UN complaint after sea-drone strikes sink a Russian corvette in Benghazi.</p>
          </div>
          <div class="item">
            <h4>Gaza Environmental Toll Report</h4>
            <p>UN and environmental monitors warn destroyed water and power infrastructure leaves severe toxic contamination risks.</p>
          </div>
        </div>
      </div>

      <div class="desk">
        <div class="desk-head ochre"><span>ASIA-PACIFIC</span><span>#15–#17</span></div>
        <div class="desk-items">
          <div class="item">
            <h4><span class="num teal">15</span> EU–Indonesia Sign Trade Pact</h4>
            <p>Brussels and Jakarta formally sign a comprehensive economic partnership agreement concluding 10 years of negotiations.</p>
          </div>
          <div class="item">
            <h4><span class="num teal">16</span> Beijing Hosts Dutch FM Talks</h4>
            <p>Chinese FM Wang Yi meets Dutch FM Tom Berendsen in Beijing on semiconductor supply chains and bilateral trade ties.</p>
          </div>
          <div class="item">
            <h4><span class="num ochre">17</span> Bangladesh &amp; Punjab Crashes</h4>
            <p>Rival faction clashes in Jhenaidah injure 15; an overturned stone truck in Punjab, Pakistan kills seven.</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <span>MONDAY, 23 NOVEMBER 2026 — GLOBAL NEWS ATLAS</span>
      <span>SPACE · TECH · NATO · ENERGY · HORMUZ · AMERICAS · EUROPE · AFRICA · ASIA-PACIFIC</span>
    </footer>
  </div>
</body>
</html>`;
}

if (process.argv[1]?.endsWith('compose.ts')) {
  const assetsDir = process.argv[2] ?? '../news23-assets';
  const outHtml = process.argv[3] ?? '../news23-assets/poster_v2.html';
  writeFileSync(outHtml, buildNews23Html(assetsDir), 'utf8');
  console.log(`Wrote ${outHtml}`);
}
