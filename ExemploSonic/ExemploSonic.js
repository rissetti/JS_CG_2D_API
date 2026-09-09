class ExemploSonic extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.jogoPausado = false; 
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

    // Botões Touch com cores Padrão
    // Topo (Cima)
    this.criarBotaoTouch("btnCima", 80, 330, 55, 55, "▲", "ArrowUp");
    // Esquerda
    this.criarBotaoTouch("btnEsq", 20, 390, 55, 55, "◄", "ArrowLeft");
    // Direita
    this.criarBotaoTouch("btnDir", 140, 390, 55, 55, "►", "ArrowRight");
    // Base (Baixo)
    this.criarBotaoTouch("btnBaixo", 80, 450, 55, 55, "▼", "ArrowDown");
    // Pause (sem tecla associada) e customizado
    this.criarBotaoTouch("btnPause", 400, 20, 90, 40, "PAUSE")
      .setCores(
        "rgba(13, 110, 253, 0.6)",
        "rgba(10, 70, 160, 0.9)",
        "rgba(147, 197, 253, 0.8)",
        "#FFFFFF",
      )
      .setTamanhoFonte(16)
      .setVibracao(60);
  }

  teclaPressionada(e) {
    if (this.jogoPausado) return;

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
    if (this.jogoPausado) return;

    this.sonic.setVelocidade(0, 0);
    this.sonic.setAnimacao(this.anim_esperando);
  }

  cliqueDoMouse(e) {
    let btnPausa = this.getBotaoTouch("btnPause");
    if (btnPausa && btnPausa.foiClicado(e)) {
      this.jogoPausado = !this.jogoPausado;
      btnPausa.rotulo = this.jogoPausado ? "RETOMAR" : "PAUSA";
    }
  }

  atualizar(dt) {
    if (this.jogoPausado) return;

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

    if (this.jogoPausado) {
      this.preenchimento("rgba(0, 0, 0, 0.5)");
      this.retangulo(0,0,this.larguraTela(),this.alturaTela(),Estilo.PREENCHIDO);
      this.preenchimento("white");
      this.texto("JOGO PAUSADO", 150, 260, 28, "bold");
    }
  }
}

window.addEventListener("load", () => {
  new ExemploSonic("Sprites com o Sonic!", "gameCanvas", 512, 512);
});