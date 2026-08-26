class ExemploAtualizarDT extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.jogador = {
      x: 50,
      y: 200,
      velocidade: 100,
    };

    this.pontuacao = 0;
    this.teclas = {}; // Cria a estrutura para armazenar as teclas

    this.iniciarTimer("bonusScore", 10, true, () => {
      this.pontuacao += 100;
      console.log("Bônus de tempo concedido!");
    });
  }

  // 2. Mapeia as teclas pressionadas/soltas
  teclaPressionada(e) {
    this.teclas[e.key] = true;
  }

  teclaLiberada(e) {
    this.teclas[e.key] = false;
  }

  // 100 pixels por segundo
  /*Delta Time: tempo decorrido desde o último frame em segundos.
   *Permite criar movimentações independentes da taxa de FPS (ex: velocidade * dt).   
  /*atualizar(dt) {
    if (this.teclas["ArrowRight"]) {
      this.jogador.x += this.jogador.velocidade * dt;
    }
    if (this.teclas["ArrowLeft"]) {
      this.jogador.x -= this.jogador.velocidade * dt;
    }
    if (this.teclas["ArrowUp"]) {
      this.jogador.y -= this.jogador.velocidade * dt;
    }
    if (this.teclas["ArrowDown"]) {
      this.jogador.y += this.jogador.velocidade * dt;
    }
  }/**/

  // 100 pixels por frame
  atualizar() {
    if (this.teclas["ArrowRight"]) {
      this.jogador.x += this.jogador.velocidade;
    }
    if (this.teclas["ArrowLeft"]) {
      this.jogador.x -= this.jogador.velocidade;
    }
    if (this.teclas["ArrowUp"]) {
      this.jogador.y -= this.jogador.velocidade;
    }
    if (this.teclas["ArrowDown"]) {
      this.jogador.y += this.jogador.velocidade;
    }
  } /**/

  desenhar() {
    this.limparTela("white");

    this.preenchimento("blue");
    this.retangulo(this.jogador.x, this.jogador.y, 40, 40, Estilo.PREENCHIDO);

    const tempo = this.getTimer("bonusScore");
    const tempoRestante = tempo >= 0 ? tempo.toFixed(1) : "0.0";

    this.preenchimento("black");
    this.texto(`Próximo bônus em: ${tempoRestante}s`, 20, 30, 18);
    this.texto(`Pontos: ${this.pontuacao}`, 20, 60, 18);
  }
}

// Inicia o jogo
window.addEventListener("load", () => {
  new ExemploAtualizarDT("Exemplo Atualizar DT", "gameCanvas", 60, 800, 600);
});
