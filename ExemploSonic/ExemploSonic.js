class ExemploSonic extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.pontos = 0;
    this.sonic = new Sprite(0, 0);    
    
    EfeitosSonoros.carregarSom("anel", "sons/som_anel.mp3");
    EfeitosSonoros.volumeSom("anel", 0.1);

    this.anim_indo = this.carregarFrames("sonic_i", 12);
    this.anim_voltando = this.carregarFrames("sonic_v", 12);
    this.anim_esperando = this.carregarFrames("sonic_p", 28);
    this.anim_cima_baixo = this.carregarFrames("sonic_c_b", 2);
    this.anim_anel = this.carregarFrames("sonic_anel", 16);

    this.sonic.setAnimacao(this.anim_esperando);

    this.listaAneis = [];
    for (let i = 0; i < 20; i++) {
      let anel = new Sprite(Math.random() * 420 + 20, Math.random() * 400 + 80);
      anel.setAnimacao(this.anim_anel);
      this.listaAneis.push(anel);
    }
  }

  teclaPressionada(e) {
    let controles = {
      ArrowRight: [2, 0, this.anim_indo],
      ArrowLeft: [-2, 0, this.anim_voltando],
      ArrowUp: [0, -2, this.anim_cima_baixo],
      ArrowDown: [0, 2, this.anim_cima_baixo],
    };

    let acao = controles[e.key];
    if (acao) {
      this.sonic.setVelocidade(acao[0], acao[1]);
      this.sonic.setAnimacao(acao[2]);
    }
  }

  teclaLiberada() {
    this.sonic.setVelocidade(0, 0);
    this.sonic.setAnimacao(this.anim_esperando);
  }

  atualizar() {
    let w = this.larguraTela(),
      h = this.alturaTela();

    // Teletransporte nas bordas da tela
    if (this.sonic.px > w) this.sonic.px = 0;
    if (this.sonic.px < 0) this.sonic.px = w;
    if (this.sonic.py > h) this.sonic.py = 0;
    if (this.sonic.py < 0) this.sonic.py = h;

    this.sonic.atualizar();

    // Atualização e remoção de anéis coletados usando um
    // laço for invertido com splice(), tradicional em jogos.
    // Correr o laço de trás para frente evita problemas com os
    // índices do array quando um item é removido
    for (let i = this.listaAneis.length - 1; i >= 0; i--) {
      let anel = this.listaAneis[i];
      anel.atualizar();
      if (this.sonic.colisao(anel)) {
        EfeitosSonoros.tocarSom("anel", false, true);
        this.pontos += 100;
        this.listaAneis.splice(i, 1); // Remove o anel coletado
      }
    }
  }

  desenhar() {
    this.limparTela("white");

    this.desenharSprite(this.sonic);
    this.listaAneis.forEach((anel) => this.desenharSprite(anel));

    this.preenchimento("black");
    this.texto(`Pontuação: ${this.pontos}!!`, 100, 50, 30, "bold");
  }
}

window.addEventListener("load", () => {
  new ExemploSonic("Sprites com o Sonic!", "gameCanvas", 60, 512, 512);
});
