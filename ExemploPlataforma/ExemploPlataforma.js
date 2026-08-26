class ExemploPlataforma extends JS_CG_2D_API {

  acaoAoIniciar() {
    this.plataformas = [
      new Retangulo2D(0, 550, 800, 50),
      new Retangulo2D(100, 500, 50, 50),
      new Retangulo2D(150, 420, 200, 20),
      new Retangulo2D(450, 320, 200, 20)
    ];

    this.jogador = new Personagem(50, 400, 40, 50, this.plataformas);
    
    // Ajustes físicos para alcance de plataformas mais altas
    this.jogador.setForcaPulo(-14.5);
    this.jogador.setGravidade(0.55);

    this.velocidadeHorizontal = 5;
    this.alvoMouseX = null;
    this.coletavel = new Retangulo2D(540, 280, 20, 20);
    this.pontos = 0;
    this.teclas = {};
  }

  teclaPressionada(e) {    
    this.teclas[e.key] = true;
    if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(e.key)) {
      this.alvoMouseX = null;
    }
    if (["ArrowUp", "w", "W", " "].includes(e.key)) {
      this.jogador.pular();
    }
  }

  teclaLiberada(e) {
    this.teclas[e.key] = false;
  }

  cliqueDoMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.largura / rect.width;
    const scaleY = this.altura / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    this.alvoMouseX = mouseX;

    if (mouseY < this.jogador.getY()) {
      this.jogador.pular();
    }
  }

  atualizar() {
    let movendoTeclado = false;

    if (this.teclas["ArrowLeft"] || this.teclas["a"] || this.teclas["A"]) {
      this.jogador.setX(this.jogador.getX() - this.velocidadeHorizontal);
      movendoTeclado = true;
    }
    if (this.teclas["ArrowRight"] || this.teclas["d"] || this.teclas["D"]) {
      this.jogador.setX(this.jogador.getX() + this.velocidadeHorizontal);
      movendoTeclado = true;
    }

    if (!movendoTeclado && this.alvoMouseX !== null) {
      const centroX = this.jogador.getX() + this.jogador.w / 2;
      const diffX = this.alvoMouseX - centroX;

      if (Math.abs(diffX) > 6) {
        this.jogador.setX(this.jogador.getX() + Math.sign(diffX) * this.velocidadeHorizontal);
      } else {
        this.alvoMouseX = null;
      }
    }

    this.jogador.atualizar();

    if (this.coletavel && this.colisao(this.jogador.getColisor(), this.coletavel)) {
      this.pontos += 10;
      const plat = this.plataformas[Math.floor(Math.random() * (this.plataformas.length - 1)) + 1];
      this.coletavel.x = plat.x + Math.random() * (plat.largura - 20);
      this.coletavel.y = plat.y - 30;
    }
  }

  desenhar() {
    this.limparTela("#1a1a2e");

    // Desenha Plataformas
    this.preenchimento("#16213e");
    this.contorno(2, "#0f3460");
    for (const plat of this.plataformas) {
      this.retangulo(plat, Estilo.PREENCHIDO);
      this.retangulo(plat, Estilo.LINHAS);
    }

    // Desenha Coletável
    if (this.coletavel) {
      this.preenchimento("#e94560");
      this.circulo(this.coletavel.x, this.coletavel.y, this.coletavel.largura, this.coletavel.altura, Estilo.PREENCHIDO);
    }

    // Desenha Personagem
    this.preenchimento("#00fff5");
    this.retangulo(this.jogador.getX(), this.jogador.getY(), this.jogador.w, this.jogador.h, Estilo.PREENCHIDO);

    // Interface HUD
    this.preenchimento("#ffffff");
    this.texto(`Pontos: ${this.pontos}`, 20, 40, 22, "bold");
    this.texto("Setas / WASD ou Clique na Tela para mover/pular", 20, 70, 14);
  }
}

window.addEventListener("load", () => {
  new ExemploPlataforma("Exemplo Jogo de Plataforma", "meuCanvas", 60, 800, 600);
});