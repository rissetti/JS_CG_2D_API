class ExemploPlataformaCameraSuave extends JS_CG_2D_API {
  acaoAoIniciar() {    
    this.plataformas = [
      // Chão
      new Retangulo2D(0, 500, 600, 100),
      new Retangulo2D(700, 500, 800, 100), // Buraco entre X: 600 e 700
      new Retangulo2D(1600, 500, 800, 100), // Buraco entre X: 1500 e 1600

      // Plataformas
      new Retangulo2D(200, 380, 140, 25),
      new Retangulo2D(400, 270, 140, 25),
      new Retangulo2D(620, 370, 120, 25), // Plataforma para ajudar a cruzar o 1º buraco
      new Retangulo2D(820, 280, 150, 25),
      new Retangulo2D(1050, 380, 130, 25),
      new Retangulo2D(1250, 260, 150, 25),
      new Retangulo2D(1480, 370, 130, 25), // Plataforma para ajudar a cruzar o 2º buraco

      // Pilares/muros
      new Retangulo2D(950, 420, 50, 80),
      new Retangulo2D(1800, 350, 60, 150)
    ];

    this.velocidadeHorizontal = 150; // Pixels por SEGUNDO (multiplicado pelo dt)
    this.teclas = {};
    
    // Fatores de suavização (Quanto menor o valor, mais suave/lento o movimento)
    this.suavidadeX = 0.1;  // Acompanha o movimento lateral
    this.suavidadeY = 0.005; // Bem menor no Y para amortecer a elevação do pulo

    // Botões
    this.criarBotaoTouch("btnEsq", 15, 550, 65, 65, "◄", "ArrowLeft");
    this.criarBotaoTouch("btnDir", 90, 550, 65, 65, "►", "ArrowRight");
    this.criarBotaoTouch("btnPulo", 280, 550, 65, 65, "▲", "ArrowUp");

    this.reiniciarJogo();

    // Posição inicial da câmera no jogador
    this.cameraX = this.jogador.getX() - this.larguraTela() / 2 + this.jogador.w / 2;
    this.cameraY = this.jogador.getY() - this.alturaTela() / 2 + this.jogador.h / 2;

  }

  reiniciarJogo() {
    this.jogador = new Personagem(100, 300, 40, 60, this.plataformas);
    this.jogador.setForcaPulo(-14);
    this.gameOver = false;
  }

  teclaPressionada(e) {
    this.teclas[e.key] = true;
  }

  teclaLiberada(e) {
    this.teclas[e.key] = false;
  }

  atualizar(dt) {
    // Se morreu, aguarda pulo/espaço para reiniciar
    if (this.gameOver) {
      if (this.teclas["ArrowUp"] || this.teclas[" "]) {
        this.reiniciarJogo();
      }
      return;
    }

    let passo = this.velocidadeHorizontal * dt;

    if (this.teclas["ArrowLeft"]) {
      this.jogador.x -= passo;
    }
    if (this.teclas["ArrowRight"]) {
      this.jogador.x += passo;
    }
    if (this.teclas["ArrowUp"] || this.teclas[" "]) {
      this.jogador.pular();
    }
    
    this.jogador.atualizar();

    // Verifica se morreu (caiu)
    if (this.jogador.getY() > 800) {
      this.gameOver = true;
    }

    // CÂMERA SUAVE COM INTERPOLAÇÃO
    // Onde a câmera GOSTARIA de estar (alvo ideal)
    let alvoX = this.jogador.getX() - this.larguraTela() / 2 + this.jogador.w / 2;
    let alvoY = this.jogador.getY() - this.alturaTela() / 2 + this.jogador.h / 2;

    // A câmera avança apenas uma fração da distância a cada frame
    this.cameraX += (alvoX - this.cameraX) * this.suavidadeX;
    this.cameraY += (alvoY - this.cameraY) * this.suavidadeY;    
  }

  desenhar() {
    this.limparTela("skyblue");

    // Aplica o deslocamento da câmera
    this.empilhar();
        this.transladar(-this.cameraX, -this.cameraY);
        this.preenchimento("green");
        for (let plat of this.plataformas) {
            this.retangulo(plat, Estilo.PREENCHIDO);
        }
        this.preenchimento("red");
        this.retangulo(this.jogador.getColisor(), Estilo.PREENCHIDO);
    this.desempilhar();

    if (this.gameOver) {      
      this.limparTela("rgba(0, 0, 0, 0.7)");
      this.preenchimento("white");
      this.texto("CAIU!", this.larguraTela() / 2, this.alturaTela() / 2 - 20, 28, "center", "bold");
      this.texto("Pressione PULO para reiniciar", this.larguraTela() / 2, this.alturaTela() / 2 + 20, "center");
    }
  }
}

window.addEventListener("load", () => {
  new ExemploPlataformaCameraSuave("Plataforma com Camera Suave", "meuJogo", 360, 640);
});