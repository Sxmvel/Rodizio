let trava = null;
let queroAcesa = false;
let pedindo = false;

async function acender() {
  if (!('wakeLock' in navigator) || trava || pedindo) return;

  pedindo = true;
  try {
    const nova = await navigator.wakeLock.request('screen');
    nova.addEventListener('release', () => { if (trava === nova) trava = null; });
    trava = nova;
  } catch {
  } finally {
    pedindo = false;
  }

  if (!queroAcesa || document.visibilityState !== 'visible') apagar();
}

function apagar() {
  trava?.release?.().catch(() => {});
  trava = null;
}

function reconciliar() {
  if (queroAcesa && document.visibilityState === 'visible') acender();
  else apagar();
}

export function manterAcesa(ativo) {
  queroAcesa = ativo;
  reconciliar();
}

document.addEventListener('visibilitychange', reconciliar);
