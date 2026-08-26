# Rodízio — contador de fatias

App web para duas pessoas contarem quantas fatias de pizza cada uma comeu
durante um rodízio. Um celular só, deitado na mesa entre as duas: a tela é
dividida ao meio e a metade de cima fica girada 180°, para quem está do outro
lado ler do jeito certo.

Funciona offline depois da primeira carga e pode ser instalado como app.

## Rodando local

Site estático: sem build, sem dependências. Basta servir a pasta por HTTP.

```shell
py -m http.server 8000
```

Depois abra <http://localhost:8000>.

Alternativas, se preferir:

```shell
npx serve -l 8000
npx http-server -p 8000
```

Não abra o `index.html` direto pelo `file://` — o service worker não registra
e os módulos ES são bloqueados por CORS.

### Testando no celular

Suba com `--bind 0.0.0.0` e acesse pelo IP da máquina na mesma rede:

```shell
py -m http.server 8000 --bind 0.0.0.0
```

Por HTTP na rede local o service worker não registra (só `localhost` e HTTPS
contam como contexto seguro), então o modo offline e a instalação só dá para
testar por um túnel HTTPS.
