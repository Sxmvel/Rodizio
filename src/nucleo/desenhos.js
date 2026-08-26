const QUEIJO    = '#F5B93E';
const CASCA     = '#C97B2C';
const CALABRESA = '#A82419';
const OURO      = '#F5C842';
const OURO_ESC  = '#C9932C';

const rad = g => (g - 90) * Math.PI / 180;

const f = n => Math.round(n * 100) / 100;

function cunha(cx, cy, r, g0, g1) {
  const x0 = cx + r * Math.cos(rad(g0)), y0 = cy + r * Math.sin(rad(g0));
  const x1 = cx + r * Math.cos(rad(g1)), y1 = cy + r * Math.sin(rad(g1));
  return `M ${cx} ${cy} L ${f(x0)} ${f(y0)} A ${r} ${r} 0 0 1 ${f(x1)} ${f(y1)} Z`;
}

function svg(w, h, conteudo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ` +
         `width="${w}" height="${h}" fill="none">${conteudo}</svg>`;
}

export function pizza({ comidas = 0, cor = null } = {}) {
  const CX = 100, CY = 100, R = 97, GAP = 2.5;
  const partes = [];

  for (let i = 0; i < 8; i++) {
    const comida = cor !== null && i < comidas;
    const d = cunha(CX, CY, R, i * 45 + GAP / 2, (i + 1) * 45 - GAP / 2);
    partes.push(
      `<path d="${d}" fill="${comida ? cor : QUEIJO}" ` +
      `stroke="${CASCA}" stroke-opacity="${comida ? .35 : .9}" stroke-width="2"/>`
    );
    if (!comida) {
      const meio = i * 45 + 22.5;
      [[.48, -10], [.75, 9]].forEach(([rr, desvio]) => {
        const a = rad(meio + desvio);
        partes.push(
          `<circle cx="${f(CX + R * rr * Math.cos(a))}" ` +
          `cy="${f(CY + R * rr * Math.sin(a))}" r="8" fill="${CALABRESA}"/>`
        );
      });
    }
  }
  partes.push(`<circle cx="${CX}" cy="${CY}" r="${R - 3}" fill="none" stroke="${CASCA}" stroke-width="6"/>`);

  return svg(200, 200, partes.join(''));
}

export function fatia({ cor }) {
  const R = 100, ABERTURA = 27, INTERNO = Math.round(R * .72);
  const L = 2 * R * Math.sin(ABERTURA * Math.PI / 180);
  const APEX_X = L / 2, APEX_Y = R;

  const partes = [
    `<path d="${cunha(APEX_X, APEX_Y, R, -ABERTURA, ABERTURA)}" fill="${CASCA}"/>`,
    `<path d="${cunha(APEX_X, APEX_Y, INTERNO, -ABERTURA, ABERTURA)}" fill="${cor}"/>`
  ];
  [[.44, -11], [.72, 10]].forEach(([rr, desvio]) => {
    const a = rad(desvio), r = rr * INTERNO;
    partes.push(
      `<circle cx="${f(APEX_X + r * Math.cos(a))}" ` +
      `cy="${f(APEX_Y + r * Math.sin(a))}" r="9" fill="${CALABRESA}"/>`
    );
  });

  return svg(f(L), R, partes.join(''));
}

export function trofeu() {
  const partes = [
    `<path d="M47 12C15 12 13 58 51 60" fill="none" stroke="${OURO_ESC}" stroke-width="9" stroke-linecap="round"/>`,
    `<path d="M93 12C125 12 127 58 89 60" fill="none" stroke="${OURO_ESC}" stroke-width="9" stroke-linecap="round"/>`,
    `<path d="M46 0L94 0L80 74C73 96 21 96 14 74Z" transform="translate(0,0)" fill="${OURO}" stroke="${OURO_ESC}" stroke-width="4"/>`,
    `<path d="M70 18L75 31.1L89 31.8L78.1 40.6L81.8 54.2L70 46.5L58.2 54.2L61.9 40.6L51 31.8L65 31.1Z" fill="${OURO_ESC}"/>`,
    `<rect x="59" y="92" width="22" height="30" fill="${OURO}" stroke="${OURO_ESC}" stroke-width="4"/>`,
    `<rect x="24" y="120" width="92" height="20" rx="7" fill="${OURO}" stroke="${OURO_ESC}" stroke-width="4"/>`
  ];
  return svg(140, 145, partes.join(''));
}
