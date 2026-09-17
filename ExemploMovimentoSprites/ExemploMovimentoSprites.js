class ExemploMovimentoSprites extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.dir = this.carregarFrames("pac_direita", 4);
    this.esq = this.carregarFrames("pac_esquerda", 4);
    this.ci = this.carregarFrames("pac_cima", 4);
    this.ba = this.carregarFrames("pac_baixo", 4);
    this.jogador = new Sprite(0, 200, 50, 50);
    this.jogador.setAnimacao(this.dir);

    this.teclas = {};

    // Botões Touch
    this.criarBotaoTouch("btnCima", 70, 455, 55, 55, "▲", "ArrowUp");
    this.criarBotaoTouch("btnEsq", 10, 515, 55, 55, "◄", "ArrowLeft");
    this.criarBotaoTouch("btnDir", 130, 515, 55, 55, "►", "ArrowRight");
    this.criarBotaoTouch("btnBaixo", 70, 575, 55, 55, "▼", "ArrowDown");
  }

  teclaPressionada(e) {
    this.teclas[e.key] = true;
  }

  teclaLiberada(e) {
    this.teclas[e.key] = false;
  }

  atualizar(dt) {
    let vx = 0;
    let vy = 0;

    // Atualiza direção da velocidade
    if (this.teclas["ArrowLeft"]) {
      vx = -1;
    }
    if (this.teclas["ArrowRight"]) {
      vx = 1;
    }
    if (this.teclas["ArrowUp"]) {
      vy = -1;
    }
    if (this.teclas["ArrowDown"]) {
      vy = 1;
    }

    // Seta a velocidade correta
    this.jogador.setVelocidade(vx, vy);
    
    // Seta a direção da animação
    if (vx < 0) {
      this.jogador.setAnimacao(this.esq);
    } else if (vx > 0) {
      this.jogador.setAnimacao(this.dir);
    } else if (vy < 0) {
      this.jogador.setAnimacao(this.ci);
    } else if (vy > 0) {
      this.jogador.setAnimacao(this.ba);
    }

    // Atualiza o jogador
    this.jogador.atualizar();

    // Manter dentro dos limites da tela
    if (this.jogador.px < 0) {
      this.jogador.px = 0;
    }
    if (this.jogador.px > this.larguraTela() - this.jogador.l) {
      this.jogador.px = this.larguraTela() - this.jogador.l;
    }    
    if (this.jogador.py < 0) {
      this.jogador.py = 0;
    }
    if (this.jogador.py > this.alturaTela() - this.jogador.a) {
      this.jogador.py = this.alturaTela() - this.jogador.a;
    }
  }

  desenhar() {
    this.limparTela("#088a6e");
    this.desenharSprite(this.jogador);
  }
}

window.addEventListener("load", () => {
  new ExemploMovimentoSprites("Jogo com Sprite", "meuJogo", 360, 640);
});