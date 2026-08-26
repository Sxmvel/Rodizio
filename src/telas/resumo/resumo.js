import { Estado }       from '../../nucleo/estado.js';
import { pizza, trofeu } from '../../nucleo/desenhos.js';
import { $ }            from '../../nucleo/dom.js';

const tela    = $('#tela-resumo');
const nome    = $('#resumo-nome');
const legenda = $('#resumo-legenda');

export function iniciar() {
  $('#pizza-resumo').innerHTML = pizza();
  $('.trofeu').innerHTML = trofeu();

  $('#btn-de-novo').addEventListener('click', () => Estado.novoJogo());
}

export function render() {
  const venc = Estado.vencedor();

  tela.dataset.vencedor = String(venc);
  nome.textContent    = venc === 'empate' ? 'EMPATE' : Estado.nomeDe(venc);
  legenda.textContent = venc === 'empate'
    ? 'ninguém levou a melhor'
    : 'venceu o rodízio';
}
