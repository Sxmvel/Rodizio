import { Estado }      from '../../nucleo/estado.js';
import { CORES }       from '../../nucleo/cores.js';
import { pizza, fatia } from '../../nucleo/desenhos.js';
import { $, $$ }       from '../../nucleo/dom.js';

const metades = $$('.metade');

const tremer = ms => navigator.vibrate?.(ms);

export function iniciar() {
  $$('.desfazer').forEach(botao => {
    const i = Number(botao.dataset.jogador);
    botao.querySelector('.desfazer__fatia').innerHTML = fatia({ cor: CORES[i] });

    botao.addEventListener('click', ev => {
      ev.stopPropagation();
      Estado.desfez(i);
      tremer([8, 40, 8]);
    });
  });

  metades.forEach(metade => {
    const i = Number(metade.dataset.jogador);

    metade.addEventListener('click', ev => {
      if (ev.target.closest('.desfazer')) return;
      Estado.comeu(i);
      tremer(12);
    });

    metade.addEventListener('keydown', ev => {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      ev.preventDefault();
      Estado.comeu(i);
    });
  });

  $('#btn-encerrar').addEventListener('click', () => Estado.vaiPara('resumo'));
}

export function render(jogo) {
  const totais = jogo.jogadores.map(j => j.fatias);

  metades.forEach(metade => {
    const i = Number(metade.dataset.jogador);
    const meu = totais[i], dele = totais[1 - i];

    metade.querySelector('.metade__pizza').innerHTML =
      pizza({ comidas: meu % Estado.fatiasPorPizza, cor: CORES[i] });
    metade.querySelector('.metade__placar').textContent   = Estado.placar(meu);
    metade.querySelector('.metade__situacao').textContent = Estado.situacao(meu, dele);
    metade.querySelector('.metade__nome').textContent     = Estado.nomeDe(i);
    metade.dataset.lidera = String(meu > dele);
    metade.setAttribute('aria-label',
      `${Estado.nomeDe(i)}: ${Estado.placar(meu)}. Tocar para comer mais uma.`);
  });
}
