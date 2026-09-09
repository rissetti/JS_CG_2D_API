class ExemploMobile extends JS_CG_2D_API {
  acaoAoIniciar() {
    
    this.plataformas = [
      new Retangulo2D(0, 550, 800, 50), // Chão
      new Retangulo2D(200, 420, 150, 20), // Plataforma 1
      new Retangulo2D(450, 320, 150, 20), // Plataforma 2
    ];

    
    this.player = new Personagem(100, 400, 40, 40, this.plataformas);
    this.player.setForcaPulo(-14.5);
    this.teclas = { esquerda: false, direita: false };

    
    this.criarBotaoTouch("btnEsq", 30, 460, 70, 70, "◄", "ArrowLeft")
      .setCores("rgba(0, 120, 255, 0.4)", "rgba(0, 120, 255, 0.8)", "#00d2ff")
      .setTamanhoFonte(24)
      .setVibracao(10);

    
    this.criarBotaoTouch("btnDir", 110, 460, 70, 70, "►", "ArrowRight")
      .setCores("rgba(0, 120, 255, 0.4)", "rgba(0, 120, 255, 0.8)", "#00d2ff")
      .setTamanhoFonte(24)
      .setVibracao(10);

    
    const botaoPulo = this.criarBotaoTouch("btnPulo",690, 460, 80, 70, "PULO", " ")
      .setCores(
        "rgba(255, 150, 0, 0.4)",
        "rgba(255, 150, 0, 0.9)",
        "#ffaa00",
        "#ffffff",
      )
      .setTamanhoFonte(16)
      .setVibracao(30);
    
    const pulo = this.getBotaoTouch("btnPulo");
    if (pulo) {
      pulo.setCorTexto("red");
    }

    botaoPulo.setCorTexto("#ffffff");
  }

  teclaPressionada(e) {
    if (e.key === "ArrowLeft" || e.key === "a") this.teclas.esquerda = true;
    if (e.key === "ArrowRight" || e.key === "d") this.teclas.direita = true;
    if (e.key === " ") this.player.pular();
  }

  teclaLiberada(e) {
    if (e.key === "ArrowLeft" || e.key === "a") this.teclas.esquerda = false;
    if (e.key === "ArrowRight" || e.key === "d") this.teclas.direita = false;
  }

  atualizar(dt) {
    // Movimentação horizontal
    if (this.teclas.esquerda) this.player.x -= 4;
    if (this.teclas.direita) this.player.x += 4;

    // Atualização da física do Personagem
    this.player.atualizar();
  }

  desenhar() {
    // Limpar tela
    this.limparTela("#1e1e24");

    // Desenhar Plataformas
    this.preenchimento("#3a3d4a");
    this.contorno(2, "#5a5e70");
    for (const plat of this.plataformas) {
      this.retangulo(
        plat.x,
        plat.y,
        plat.largura,
        plat.altura,
        Estilo.PREENCHIDO,
      );
      this.retangulo(plat.x, plat.y, plat.largura, plat.altura, Estilo.LINHAS);
    }

    // Desenhar Jogador
    this.preenchimento("#00e676");
    this.retangulo(
      this.player.x,
      this.player.y,
      this.player.w,
      this.player.h,
      Estilo.PREENCHIDO,
    );    
  }
}

window.addEventListener("load", () => {
  new ExemploMobile("Exemplo Mobile", "meuCanvas", 800, 600);
});
