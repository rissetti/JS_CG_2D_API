class ExemploRotacao extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.ang = 0;
    this.x = 0;
    this.y = 0;
    this.xp = -200;
    this.dir = -50 / this.fps();
    this.estilo = Estilo.PREENCHIDO;

    // Vértices da forma, centrados na origem (0,0)
    this.vX = [-50, 50, 50, 0, -50];
    this.vY = [50, 50, -50, 0, -50];
  }

  teclaPressionada(e) {
    if (e.altKey && e.code === "KeyF") this.telaCheia();

    const estilos = {
      c: Estilo.PREENCHIDO,
      p: Estilo.PONTOS,
      l: Estilo.LINHAS,
    };
    const tecla = e.key.toLowerCase();
    if (estilos[tecla]) this.estilo = estilos[tecla];
  }

  atualizarPosicaoMouse(e) {
    this.x = Math.floor(e.x - this.larguraTela() / 2);
    this.y = Math.floor(e.y - this.alturaTela() / 2);
  }

  mousePressionado(e) {
    this.atualizarPosicaoMouse(e);
  }
  movimentoDoMousePressionado(e) {
    this.atualizarPosicaoMouse(e);
  }

  atualizar() {
    this.ang = (this.ang + 1) % 360;

    if (this.xp <= -200 || this.xp >= 200) this.dir *= -1;
    this.xp += this.dir;
  }

  desenhar() {
    let cx = this.larguraTela() / 2;
    let cy = this.alturaTela() / 2;

    // Fundo e Eixos
    this.preenchimento("white");
    this.retangulo(
      0,
      0,
      this.larguraTela(),
      this.alturaTela(),
      Estilo.PREENCHIDO,
    );
    this.linha(cx, 0, cx, this.alturaTela(), Estilo.PREENCHIDO);
    this.linha(0, cy, this.larguraTela(), cy, Estilo.PREENCHIDO);

    // Origem Central da Tela
    this.empilhar();
        this.contorno(3, "blue");
        this.transladar(cx, cy);
        this.preenchimento("black");

        // Rotação do Polígono
        this.empilhar();
            this.transladar(this.x, this.y); // Posiciona o objeto
            this.rotacionar(this.ang); // Gira no próprio eixo (0,0)
            this.poligono(this.vX, this.vY, this.estilo);
        this.desempilhar();

        // Elementos Auxiliares
        this.linha(0, 0, 10, 10);
        this.ponto(this.xp, -20, 30);

    this.desempilhar();
  }
}

window.addEventListener("load", () => {
  new ExemploRotacao("Exemplo de Rotação Limpa", "gameCanvas", 640, 480);
});