class ExemploCompleto extends JS_CG_2D_API {
  acaoAoIniciar() {
    // Controles de entrada (Teclado)
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.rot = false;

    // Transformações da linha
    this.xl = 0;
    this.yl = 0;
    this.ang = 0.0;

    // Propriedades da Imagem / Jogador
    this.xImg = 200;
    this.yImg = 100;
    this.larguraImg = 20;
    this.alturaImg = 20;
    this.colidiu = false;

    // Bolinha autônoma
    this.x = 1;
    this.y = 1;
    this.vx = 2;
    this.vy = 2;
    this.cor = "red";

    this.teste = new Image();
    this.teste.src = "imagens/icone.jpg";
  }

  teclaPressionada(e) {
    if (e.key === "b" || e.key === "B") this.cor = "blue";
    if (e.key === "r" || e.key === "R") this.cor = "red";

    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") this.up = true;
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
      this.down = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
      this.right = true;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
      this.left = true;
    if (e.key === "q" || e.key === "Q") this.rot = true;
  }

  teclaLiberada(e) {
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") this.up = false;
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
      this.down = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
      this.right = false;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
      this.left = false;
    if (e.key === "q" || e.key === "Q") this.rot = false;
  }

  mousePressionado(e) {
    if (e.button === 0) {
      this.vx *= 2;
      this.vy *= 2;
    } else if (e.button === 2) {
      this.vx /= 2;
      this.vy /= 2;
    } else if (e.button === 1) {
      this.x = 1;
      this.y = 1;
      this.vx = 2;
      this.vy = 2;
    }
  }

  // Retorna os obstáculos estáticos
  obterColisores() {
    let xret = this.larguraTela() / 2;
    let yret = 140;
    let largura = 80;
    let altura = 20;

    return [
      new Retangulo2D(xret, yret, largura, altura),
      new Retangulo2D(xret / 2, yret * 2, largura, altura),
      new Retangulo2D(xret / 4, yret, largura / 3, altura * 4),
    ];
  }

  atualizar(dt) {
    // 1. Movimentação da bolinha autônoma
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.larguraTela() || this.x < 0) this.vx *= -1;
    if (this.y > this.alturaTela() || this.y < 0) this.vy *= -1;

    if (this.rot) this.ang++;

    // 2. Guarda a posição antes do movimento
    let prevX = this.xImg;
    let prevY = this.yImg;

    // --- TESTA EIXO X ---
    if (this.right) this.xImg++;
    if (this.left) this.xImg--;

    if (this.checarColisaoComMapa()) {
      this.xImg = prevX; // Desfaz apenas o movimento X
    }

    // --- TESTA EIXO Y ---
    if (this.up) this.yImg--;
    if (this.down) this.yImg++;

    if (this.checarColisaoComMapa()) {
      this.yImg = prevY; // Desfaz apenas o movimento Y
    }

    // Atualiza o estado de colisão
    this.colidiu = this.checarColisaoComMapa();
  }

  // Checa colisão utilizando Retangulo2D e a função this.colisao da API
  checarColisaoComMapa() {
    const jogadorColisor = new Retangulo2D(
      this.xImg,
      this.yImg,
      this.larguraImg,
      this.alturaImg,
    );

    for (let colisor of this.obterColisores()) {
      if (this.colisao(jogadorColisor, colisor)) {
        return true;
      }
    }
    return false;
  }

  desenhar() {
    // Fundo
    this.preenchimento("bisque");
    this.retangulo(
      0,
      0,
      this.larguraTela(),
      this.alturaTela(),
      Estilo.PREENCHIDO,
    );

    this.desenharTransformacoesEstaticas();
    this.desenharLinhasComTransformacao();
    this.desenharColisores();
    this.desenharJogador();
    this.desenharBolinha();

    // Alerta textual de colisão
    if (this.colidiu) {
      this.preenchimento("black");
      this.texto("COLIDIU!", 100, 200, 50);
    }

    // Texto informativo
    this.empilhar();
    this.contorno(1, "black");
    this.preenchimento("brown");
    this.texto("testando o texto...", 100, 100, 50);
    this.desempilhar();
  }

  desenharTransformacoesEstaticas() {
    this.preenchimento(this.cor);
    this.contorno(this.cor);
    this.empilhar();
    this.rotacionar(30);
    this.transladar(200, 0);
    this.escalar(2, 2);

    this.contorno(10, "green");
    this.linha(50, 50, 150, 30);
    this.linha(150, 30, 150, 150);
    this.linha(150, 150, 30, 30);
    this.desempilhar();
  }

  desenharLinhasComTransformacao() {
    this.empilhar();
    this.contorno(2, "black");
    this.linha(10, 50, 80, 80);
    this.transladar(this.xl, this.yl);
    this.rotacionar(this.ang);
    this.contorno(1, "blue");
    this.linha(0, 0, 100, 200);
    this.desempilhar();

    this.retangulo(10, 10, 40, 10, Estilo.LINHAS);
  }

  desenharColisores() {
    let colisores = this.obterColisores();
    this.preenchimento("black");

    // Passa os objetos Retangulo2D
    this.retangulo(colisores[0], Estilo.PREENCHIDO);
    this.retangulo(colisores[1], Estilo.LINHAS);
    this.retangulo(colisores[2], Estilo.PREENCHIDO);
  }

  desenharJogador() {
    this.imagem(this.teste, this.xImg, this.yImg);
  }

  desenharBolinha() {
    this.preenchimento(this.cor);
    this.contorno(1, this.cor);
    this.circulo(this.x, this.y, 20, 20, Estilo.PREENCHIDO);
  }
}

window.addEventListener("load", () => {
  new ExemploCompleto("Exemplo Completo", "gameCanvas", 100, 600, 400);
});
