class ExemploMovimentoSpritesRotacao extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.dir = this.carregarFrames("pac_direita", 4);
    this.esq = this.carregarFrames("pac_esquerda", 4);
    this.ci = this.carregarFrames("pac_cima", 4);
    this.ba = this.carregarFrames("pac_baixo", 4);
    this.jogador = new Sprite(0, 200, 50, 50);
    this.jogador.setAnimacao(this.dir);

    this.teclas = {};

    // Rotação em graus
    this.jogador.angulo = 0; 

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

    // Movimentação na Diagonal, com rotação
    if (vx !== 0 && vy !== 0) {
      // Define a animação da DIREITA como ponto zero (0°).
      // Para a matemática da rotação funcionar sem deformar o sprite,
      // usamos uma imagem "ancora" padrão apontando para o eixo X positivo.
      this.jogador.setAnimacao(this.dir);

      // Ângulo de rotação:
      // Math.atan2(y, x) calcula o ângulo (em radianos) formado entre o eixo X positivo 
      // e a coordenada (x, y) no plano cartesiano. Em jogos 2D, ao passar a velocidade 
      // vertical (vy) e a velocidade horizontal (vx), a função retorna a direção exata 
      // para onde o objeto está se movendo.      
      let anguloRadianos = Math.atan2(vy, vx);

      // Multiplicar por (180 / Math.PI) para converter Radianos em Graus.
      this.jogador.angulo = anguloRadianos * (180 / Math.PI);
    } else {
      // Sem rotação
      this.jogador.angulo = 0;
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
    if (this.jogador.angulo !== 0) {
      this.empilhar();

      // Centro do personagem
      let centroX = this.jogador.px + this.jogador.l / 2;
      let centroY = this.jogador.py + this.jogador.a / 2;

      this.transladar(centroX, centroY);
      this.rotacionar(this.jogador.angulo);
      this.transladar(-centroX, -centroY);

      this.desenharSprite(this.jogador);
      this.desempilhar();
    } else {
      this.desenharSprite(this.jogador);
    }
  }
}

window.addEventListener("load", () => {
  new ExemploMovimentoSpritesRotacao("Jogo com Sprite e Rotação", "meuJogo", 360, 640);
});