class Ponto {
  constructor(sceneX, sceneY) {
    this.x = Math.floor(sceneX);
    this.y = Math.floor(sceneY);
  }
}

class ExemploPontoFugitivo extends JS_CG_2D_API {  
  iniciarEstado() {
    this.score = 0;
    this.statusHUD = "normal"; // "normal", "ganhou", "perdeu"
    this.mostrarColisores = false;
    this.pontos = [];
    this.pf = new Ponto(0, 0);
  }

  mudarPosicaoAlvo() {
    let w = this.larguraTela();
    let h = this.alturaTela();
    this.pf = new Ponto(
      Math.random() * (w - 40),
      Math.random() * (h - 40)
    );

    
    this.iniciarTimer("fugaAlvo", 2, true, () => {
      this.mudarPosicaoAlvo();
      this.statusHUD = "normal";
    });
  }

  acaoAoIniciar() {
    this.iniciarEstado();
    this.mudarPosicaoAlvo();
    EfeitosSonoros.carregarSom("clique", "sons/resgate.wav");
    this.icone("alvo.png");
  }

  acaoAoSair() {
    console.log(`Jogo finalizado. Pontuação atual: ${this.score}`);
  }

  teclaPressionada(e) {
    if (e.altKey && e.code === "KeyF") this.telaCheia();
    if (e.altKey && e.code === "KeyC")
      this.mostrarColisores = !this.mostrarColisores;
  }

  mousePressionado(e) {
    let cx = this.larguraTela() / 2;
    let cy = this.alturaTela() / 2;

    let px = e.offsetX - cx;
    let py = e.offsetY - cy;

    this.pontos.push(new Ponto(px, py));

    let targetX = this.pf.x - cx;
    let targetY = this.pf.y - cy;

    let colisorTarget = new Retangulo2D(targetX, targetY, 40, 40);
    let colisorClique = new Retangulo2D(px - 5, py - 5, 12, 12);

    if (this.colisao(colisorTarget, colisorClique)) {
      this.score++;
      this.statusHUD = "ganhou";
      this.pontos = []; // Limpa os pontos vermelhos ao acertar
      this.mudarPosicaoAlvo(); // Muda de lugar e reinicia o timer da API
    } else {
      this.score = Math.max(0, this.score - 1);
      this.statusHUD = "perdeu";
    }

    EfeitosSonoros.tocarSom("clique", true, true);
  }

  desenhar() {
    let w = this.larguraTela();
    let h = this.alturaTela();
    let cx = w / 2;
    let cy = h / 2;

    // Limpeza e Eixos Centrais
    this.preenchimento("white");
    this.retangulo(0, 0, w, h, Estilo.PREENCHIDO);
    this.linha(cx, 0, cx, h, Estilo.PREENCHIDO);
    this.linha(0, cy, w, cy, Estilo.PREENCHIDO);

    // Renderização centralizada
    this.empilhar();
    this.transladar(cx, cy);

    let targetX = this.pf.x - cx;
    let targetY = this.pf.y - cy;

    // Alvo (Ponto Fugitivo)
    if (this.mostrarColisores) {
      this.contorno(1, "blue");
      this.retangulo(new Retangulo2D(targetX, targetY, 40, 40), Estilo.LINHAS);
    }

    this.contorno(4, "black");
    this.circulo(targetX, targetY, 40, 40, Estilo.LINHAS);
    this.circulo(targetX + 10, targetY + 10, 20, 20, Estilo.LINHAS);
    this.circulo(targetX + 19, targetY + 19, 2, 2, Estilo.LINHAS);

    // Marcadores vermelhos dos cliques
    for (let p of this.pontos) {
      this.preenchimento("red");
      this.contorno(10, "red");
      this.ponto(p.x, p.y);

      if (this.mostrarColisores) {
        this.contorno(1, "blue");
        this.retangulo(
          new Retangulo2D(p.x - 5, p.y - 5, 12, 12),
          Estilo.LINHAS
        );
      }
    }

    this.desempilhar();

    // HUD
    let coresHUD = { ganhou: "green", perdeu: "red", normal: "black" };
    this.preenchimento(coresHUD[this.statusHUD] || "black");
    this.texto(`PONTUAÇÃO: ${this.score}`, 10, 20, 20);
    
    let tempoRestante = this.getTimer("fugaAlvo");
    if (tempoRestante !== -1) {
      this.texto(`Tempo: ${tempoRestante.toFixed(1)}s`, 660, 20, 16);
    }
  }
}

window.addEventListener("load", () => {
  new ExemploPontoFugitivo("Exemplo Ponto Fugitivo!", "gameCanvas", 100, 800, 600);
});