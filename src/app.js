import { Estado }      from './nucleo/estado.js';
import { manterAcesa } from './nucleo/trava-tela.js';

import * as inicio   from './telas/inicio/inicio.js';
import * as contador from './telas/contador/contador.js';
import * as resumo   from './telas/resumo/resumo.js';

const TELAS = [inicio, contador, resumo];

function render() {
  const jogo = Estado.jogo;
  document.body.dataset.tela = jogo.tela;
  TELAS.forEach(tela => tela.render(jogo));

  manterAcesa(jogo.tela === 'contador');
}

TELAS.forEach(tela => tela.iniciar());
Estado.aoMudar(render);
render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
