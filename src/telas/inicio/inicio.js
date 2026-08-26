import { Estado }      from '../../nucleo/estado.js';
import { CORES }       from '../../nucleo/cores.js';
import { pizza, fatia } from '../../nucleo/desenhos.js';
import { $, $$ }       from '../../nucleo/dom.js';

const entradas = [$('#nome-0'), $('#nome-1')];

export function iniciar() {
  $('#pizza-inicio').innerHTML = pizza();

  $$('.ficha').forEach((ficha, i) => {
    ficha.querySelector('.ficha__fatia').innerHTML = fatia({ cor: CORES[i] });
  });

  entradas.forEach((campo, i) => {
    campo.addEventListener('input', () => Estado.renomeou(i, campo.value));
    campo.addEventListener('keydown', ev => { if (ev.key === 'Enter') campo.blur(); });
  });

  $('#btn-comecar').addEventListener('click', () => Estado.vaiPara('contador'));
}

export function render(jogo) {
  entradas.forEach((campo, i) => {
    if (document.activeElement !== campo) campo.value = jogo.jogadores[i].nome;
  });
}
