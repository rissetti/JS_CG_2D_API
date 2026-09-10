class ExemploMobileSimples extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.reiniciar();
  }

  reiniciar() {
    this.pontos = 0;
    this.gameOver = false;
    this.player = { x: 150, y: 550, largura: 60, altura: 20 };
    this.item = { x: 170, y: -20, largura: 20, altura: 20, vel: 250 };
  }

  // Mover o jogador com o toque/arraste do dedo
  movimentoDoMousePressionado(e) {
    this.player.x = e.x - this.player.largura / 2;
  }

  cliqueDoMouse() {
    if (this.gameOver){
      this.reiniciar();
    } 
  }

  atualizar(dt) {
    if (this.gameOver) return;

    // Queda do item
    this.item.y += this.item.vel * dt;

    // Colisão (Coletou)
    if (this.colisao(this.player, this.item)) {
      this.pontos++;
      this.item.y = -20;
      this.item.x = Math.random() * (this.larguraTela() - 20);
      this.item.vel += 15; // Fica levemente mais rápido
    }

    // Errou (Game Over)
    if (this.item.y > this.alturaTela()) {
      this.gameOver = true;
    }
  }

  desenhar() {
    this.limparTela("#121214");

    if (this.gameOver) {
      this.preenchimento("#ffffff");
      this.texto("GAME OVER", 110, 300, 24, "bold");
      this.texto(`Pontos: ${this.pontos}`, 130, 340, 18, "normal");
      this.texto("Toque para reiniciar", 100, 380, 14, "normal");
      return;
    }

    // Jogador (Verde) e Item (Vermelho)
    this.preenchimento("#00ff88");
    this.retangulo(this.player.x, this.player.y, this.player.largura, this.player.altura, Estilo.PREENCHIDO);

    this.preenchimento("#ff3355");
    this.retangulo(this.item.x, this.item.y, this.item.largura, this.item.altura, Estilo.PREENCHIDO);

    // Placar
    this.preenchimento("#ffffff");
    this.texto(`Pontos: ${this.pontos}`, 20, 40, 20, "bold");
  }
}

window.addEventListener("load", () => {
  new ExemploMobileSimples("Exemplo Mobile Simples", "gameCanvas", 360, 640);
});