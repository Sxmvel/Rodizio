export const Estado = (() => {

  const CHAVE = 'rodizio:jogo';
  const FATIAS_POR_PIZZA = 8;

  const zerado = () => ({
    tela: 'inicio',
    jogadores: [
      { nome: '', fatias: 0 },
      { nome: '', fatias: 0 }
    ]
  });

  let jogo = ler() || zerado();
  const ouvintes = [];

  function ler() {
    try {
      const cru = localStorage.getItem(CHAVE);
      if (!cru) return null;
      const d = JSON.parse(cru);
      if (!d || !Array.isArray(d.jogadores) || d.jogadores.length !== 2) return null;
      return {
        tela: ['inicio', 'contador', 'resumo'].includes(d.tela) ? d.tela : 'inicio',
        jogadores: d.jogadores.map(j => ({
          nome: typeof j?.nome === 'string' ? j.nome.slice(0, 12) : '',
          fatias: Number.isFinite(j?.fatias) ? Math.max(0, Math.floor(j.fatias)) : 0
        }))
      };
    } catch { return null; }
  }

  function gravar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(jogo)); } catch {}
  }

  function mudou() {
    gravar();
    ouvintes.forEach(fn => fn(jogo));
  }

  function placar(total) {
    const pizzas = Math.floor(total / FATIAS_POR_PIZZA);
    const fatias = total % FATIAS_POR_PIZZA;
    const txtPizzas = `${pizzas} pizza${pizzas === 1 ? '' : 's'}`;
    const txtFatias = `${fatias} fatia${fatias === 1 ? '' : 's'}`;
    if (pizzas === 0) return txtFatias;
    if (fatias === 0) return txtPizzas;
    return `${txtPizzas} e ${txtFatias}`;
  }

  function situacao(minhas, dele) {
    const d = minhas - dele;
    if (d === 0) return 'empatado';
    return d > 0 ? `${d} à frente` : `${-d} atrás`;
  }

  function nomeDe(i) {
    const n = jogo.jogadores[i].nome.trim();
    return n || `JOGADOR ${i + 1}`;
  }

  function vencedor() {
    const [a, b] = jogo.jogadores.map(j => j.fatias);
    if (a === b) return 'empate';
    return a > b ? 0 : 1;
  }

  return {
    get jogo() { return jogo; },
    get fatiasPorPizza() { return FATIAS_POR_PIZZA; },

    aoMudar(fn) { ouvintes.push(fn); return fn; },

    comeu(i)    { jogo.jogadores[i].fatias += 1; mudou(); },
    desfez(i)   { jogo.jogadores[i].fatias = Math.max(0, jogo.jogadores[i].fatias - 1); mudou(); },
    renomeou(i, nome) { jogo.jogadores[i].nome = nome.slice(0, 12); mudou(); },

    vaiPara(tela) { jogo.tela = tela; mudou(); },

    novoJogo() {
      jogo.jogadores.forEach(j => { j.fatias = 0; });
      jogo.tela = 'inicio';
      mudou();
    },

    placar, situacao, nomeDe, vencedor
  };
})();
