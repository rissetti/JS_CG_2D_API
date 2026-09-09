
class ExemploMobileCompleto extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.jogoPausado = false;
    this.pontos = 0;
    this.tempo = 60;
    this.venceu = false;
    this.perdeu = false;

    this.esquerda = false;
    this.direita = false;

    this.plataformas = [
      { x: 0, y: 550, largura: 800, altura: 50 },
      { x: 120, y: 440, largura: 180, altura: 25 },
      { x: 430, y: 360, largura: 180, altura: 25 },
      { x: 220, y: 280, largura: 150, altura: 25 },
      { x: 560, y: 210, largura: 150, altura: 25 },
    ];

    this.jogador = new Personagem(70, 450, 40, 50, this.plataformas);

    this.jogador.setGravidade(0.6);
    this.jogador.setForcaPulo(-15);

    this.estrelas = [
      { x: 180, y: 395, coletada: false },
      { x: 250, y: 395, coletada: false },
      { x: 480, y: 315, coletada: false },
      { x: 550, y: 315, coletada: false },
      { x: 270, y: 235, coletada: false },
      { x: 335, y: 235, coletada: false },
      { x: 610, y: 165, coletada: false },
      { x: 675, y: 165, coletada: false },
      { x: 700, y: 500, coletada: false },
      { x: 380, y: 500, coletada: false },
    ];

    // Botão Touch sem tecla associada
    this.criarBotaoTouch("btnPause", 400, 20, 90, 40, "PAUSE")
      .setCores(
        "rgba(13, 110, 253, 0.6)",
        "rgba(10, 70, 160, 0.9)",
        "rgba(147, 197, 253, 0.8)",
        "#FFFFFF",
      )
      .setTamanhoFonte(16)
      .setVibracao(30);

    // Os botões utilizam as mesmas teclas tratadas
    // por teclaPressionada() e teclaLiberada().
    this.criarBotaoTouch("esquerda", 35, 480, 75, 65, "◀", "ArrowLeft");
    this.criarBotaoTouch("direita", 125, 480, 75, 65, "▶", "ArrowRight");
    this.criarBotaoTouch("pular", 690, 480, 75, 65, "▲", " ");

    this.iniciarTimer("contador", 1, true, () => {
      if (!this.venceu && !this.perdeu) {
        this.tempo--;
        if (this.tempo <= 0) {
          this.tempo = 0;
          this.perdeu = true;
        }
      }
    });
  }

  cliqueDoMouse(e) {
    let btnPausa = this.getBotaoTouch("btnPause");
    if (btnPausa && btnPausa.foiClicado(e)) {
      this.jogoPausado = !this.jogoPausado;
      if (this.jogoPausado) {
        btnPausa.rotulo = "RETOMAR";
        this.pausarTimer("contador");
      } else {
        btnPausa.rotulo = "PAUSA";
        this.retomarTimer("contador");
      }
    }
  }

  teclaPressionada(e) {
    if (this.venceu || this.perdeu || this.jogoPausado) {
      return;
    }
    if (e.key === "ArrowLeft") {
      this.esquerda = true;
    }
    if (e.key === "ArrowRight") {
      this.direita = true;
    }
    if (e.key === " ") {
      this.jogador.pular();
    }
  }

  teclaLiberada(e) {
    if (this.jogoPausado) {
      return;
    }
    if (e.key === "ArrowLeft") {
      this.esquerda = false;
    }
    if (e.key === "ArrowRight") {
      this.direita = false;
    }
  }

  atualizar(dt) {
    if (this.venceu || this.perdeu || this.jogoPausado) {
      return;
    }
    const velocidade = 260;
    if (this.esquerda) {
      this.jogador.x -= velocidade * dt;
    }
    if (this.direita) {
      this.jogador.x += velocidade * dt;
    }
    
    // Limites laterais do cenário.
    if (this.jogador.x < 0) {
      this.jogador.x = 0;
    }
    if (this.jogador.x + this.jogador.w > this.largura) {
      this.jogador.x = this.largura - this.jogador.w;
    }

    this.jogador.atualizar();

    this._verificarEstrelas();

    if (this.pontos === this.estrelas.length) {
      this.venceu = true;
      this.pararTimer("contador");
    }

    // Se cair abaixo do cenário, retorna ao início.
    if (this.jogador.y > this.altura + 100) {
      this.jogador.x = 70;
      this.jogador.y = 450;
      this.jogador.velY = 0;
    }
  }

  _verificarEstrelas() {
    const colisor = this.jogador.getColisor();

    for (const estrela of this.estrelas) {
      if (estrela.coletada) {
        continue;
      }
      const tocou = this.colisao(
        colisor.x,
        colisor.y,
        colisor.largura,
        colisor.altura,
        estrela.x - 12,
        estrela.y - 12,
        24,
        24,
      );

      if (tocou) {
        estrela.coletada = true;
        this.pontos++;
      }
    }
  }

  desenhar() {
    this.limparTela("#10131a");

    this._desenharFundo();
    this._desenharPlataformas();
    this._desenharEstrelas();
    this._desenharJogador();
    this._desenharInterface();

    if (this.venceu) {
      this._desenharMensagem(
        "VOCÊ VENCEU!",
        "Todas as estrelas foram coletadas.",
      );
    }

    if (this.perdeu) {
      this._desenharMensagem("TEMPO ESGOTADO!", "Tente novamente.");
    }

    if (this.jogoPausado) {
      this.preenchimento("rgba(0, 0, 0, 0.5)");
      this.retangulo(
        0,
        0,
        this.larguraTela(),
        this.alturaTela(),
        Estilo.PREENCHIDO,
      );
      this.preenchimento("white");
      this.texto("JOGO PAUSADO", 300, 260, 28, "bold");
    }
  }

  _desenharFundo() {
    // Lua
    this.preenchimento("#f5f5f5");
    this.circulo(650, 45, 70, 70, Estilo.PREENCHIDO);

    // Pequenas estrelas do cenário.
    this.preenchimento("#777");
    const pontos = [
      [80, 80],
      [180, 120],
      [300, 65],
      [420, 110],
      [540, 70],
      [750, 125],
    ];

    for (const [x, y] of pontos) {
      this.ponto(x, y, 4);
    }
  }

  _desenharPlataformas() {
    this.preenchimento("#555");

    for (const plataforma of this.plataformas) {
      this.retangulo(
        plataforma.x,
        plataforma.y,
        plataforma.largura,
        plataforma.altura,
        Estilo.PREENCHIDO,
      );
    }
  }

  _desenharEstrelas() {
    this.preenchimento("#ffffff");

    for (const estrela of this.estrelas) {
      if (estrela.coletada) {
        continue;
      }

      // Estrela estilizada com duas linhas
      this.linha(estrela.x - 10, estrela.y, estrela.x + 10, estrela.y);

      this.linha(estrela.x, estrela.y - 10, estrela.x, estrela.y + 10);

      this.ponto(estrela.x, estrela.y, 8);
    }
  }

  _desenharJogador() {
    this.preenchimento("#ffffff");

    this.retangulo(
      this.jogador.x,
      this.jogador.y,
      this.jogador.w,
      this.jogador.h,
      Estilo.PREENCHIDO,
    );

    // Olhos.
    this.preenchimento("#10131a");

    this.circulo(
      this.jogador.x + 10,
      this.jogador.y + 12,
      6,
      6,
      Estilo.PREENCHIDO,
    );

    this.circulo(
      this.jogador.x + 25,
      this.jogador.y + 12,
      6,
      6,
      Estilo.PREENCHIDO,
    );
  }

  _desenharInterface() {
    this.preenchimento("#ffffff");

    this.texto(
      "ESTRELAS: " + this.pontos + "/" + this.estrelas.length,
      20,
      35,
      22,
      "bold",
    );

    this.texto("TEMPO: " + this.tempo, 650, 35, 22, "bold");
  }

  _desenharMensagem(titulo, subtitulo) {
    this.preenchimento("rgba(0,0,0,0.75)");
    this.retangulo(150, 205, 500, 150, Estilo.PREENCHIDO);

    this.preenchimento("#ffffff");

    this.texto(titulo, 300, 260, 34, "bold");

    this.texto(subtitulo, 300, 305, 18);
  }
}

window.addEventListener("load", () => {
  new ExemploMobileCompleto("Exemplo Mobile Completo", "meuCanvas", 800, 600);
});
