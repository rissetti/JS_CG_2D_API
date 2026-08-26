class ExemploJogoResgate extends JS_CG_2D_API {
  acaoAoIniciar() {
    this.estado = "MENU";
    this.up = this.down = this.left = this.right = false;

    // Jogador
    this.jogadorX = this.jogadorY = 100;
    this.vidas = 3;
    this.pontos = 0;

    // NPCs
    this.npcs = [
      { x: 700, y: 500 }, { x: 100, y: 400 }, { x: 400, y: 200 },
      { x: 650, y: 150 }, { x: 300, y: 450 }, { x: 500, y: 100 }
    ];

    this.portal = { x: 700, y: 50, ativo: false };

    // Recursos
    EfeitosSonoros.carregarSom("resgate", "sons/resgate.wav");
    EfeitosSonoros.carregarSom("dano", "sons/dano.mp3");

    this.imgJogador = new Image(); this.imgJogador.src = "imagens/jogador.png";
    this.imgNPC = new Image();     this.imgNPC.src = "imagens/npc.png";
    this.imgInimigo = new Image(); this.imgInimigo.src = "imagens/inimigo.png";
    this.imgCenario = new Image(); this.imgCenario.src = "imagens/cenario.png";
  }

  iniciarJogo() {
    this.estado = "JOGANDO";
    this.vidas = 3;
    this.pontos = 0;
    this.jogadorX = this.jogadorY = 100;
    this.portal.ativo = false;

    // Reseta posição dos inimigos longe do início (100, 100)
    this.inimigos = [
      { x: 600, y: 100, vx: -3, vy: 0 },
      { x: 200, y: 400, vx: 0, vy: -2 },
      { x: 400, y: 300, vx: 2, vy: 2 },
      { x: 500, y: 500, vx: -1, vy: -1 }
    ];

    for (let npc of this.npcs) npc.resgatado = false;

    this.iniciarTimer("tempo", 90, false, () => {
      if (this.estado === "JOGANDO") this.estado = "DERROTA";
    });
  }

  teclaPressionada(e) {
    if (e.key === "Enter" && this.estado !== "JOGANDO") this.iniciarJogo();
    this.mudarTecla(e.key, true);
  }

  teclaLiberada(e) {
    this.mudarTecla(e.key, false);
  }

  mudarTecla(key, valor) {
    if (key === "ArrowUp" || key === "w") this.up = valor;
    if (key === "ArrowDown" || key === "s") this.down = valor;
    if (key === "ArrowLeft" || key === "a") this.left = valor;
    if (key === "ArrowRight" || key === "d") this.right = valor;
  }

  atualizar() {
    if (this.estado !== "JOGANDO") return;

    // Movimento do Jogador
    if (this.up) this.jogadorY -= 3;
    if (this.down) this.jogadorY += 3;
    if (this.left) this.jogadorX -= 3;
    if (this.right) this.jogadorX += 3;

    let pBox = new Retangulo2D(this.jogadorX, this.jogadorY, 40, 40);

    // Movimento e Colisão dos Inimigos
    for (let e of this.inimigos) {
      e.x += e.vx;
      e.y += e.vy;

      if (e.x < 0 || e.x > this.larguraTela() - 40) e.vx *= -1;
      if (e.y < 0 || e.y > this.alturaTela() - 40) e.vy *= -1;

      if (this.colisao(pBox, new Retangulo2D(e.x, e.y, 40, 40))) {
        this.vidas--;
        EfeitosSonoros.tocarSom("dano", true, false);
        
        // Reposiciona o jogador e afasta o inimigo que causou o dano
        this.jogadorX = this.jogadorY = 100;
        e.x = 600; 

        if (this.vidas <= 0) this.estado = "DERROTA";
        break;
      }
    }

    // Colisão com NPCs
    let resgatados = 0;
    for (let npc of this.npcs) {
      if (!npc.resgatado && this.colisao(pBox, new Retangulo2D(npc.x, npc.y, 40, 40))) {
        npc.resgatado = true;
        this.pontos += 100;
        EfeitosSonoros.tocarSom("resgate", true, false);
      }
      if (npc.resgatado) resgatados++;
    }

    if (resgatados === this.npcs.length) this.portal.ativo = true;

    // Colisão com Portal
    if (this.portal.ativo && this.colisao(pBox, new Retangulo2D(this.portal.x, this.portal.y, 40, 40))) {
      this.estado = "VITORIA";
    }
  }

  desenhar() {
    if (this.imgCenario.complete) this.imagem(this.imgCenario, 0, 0);
    else this.limparTela("white");

    if (this.estado === "MENU") {
      this.preenchimento("black");
      this.texto("RESGATE - Pressione ENTER para iniciar", 200, 300, 20);
      return;
    }

    if (this.estado !== "JOGANDO") {
      let cor = this.estado === "VITORIA" ? "green" : "darkred";
      let msg = this.estado === "VITORIA" ? "VOCÊ VENCEU!" : "FIM DE JOGO";
      this.preenchimento(cor);
      this.texto(msg, 300, 250, 24);
      this.texto(`Pontos: ${this.pontos} | ENTER para reiniciar`, 250, 300, 16);
      return;
    }

    this.imagem(this.imgJogador, this.jogadorX, this.jogadorY);

    for (let npc of this.npcs) {
      if (!npc.resgatado) this.imagem(this.imgNPC, npc.x, npc.y);
    }

    for (let e of this.inimigos) {
      this.imagem(this.imgInimigo, e.x, e.y);
    }

    if (this.portal.ativo) {
      this.preenchimento("purple");
      this.retangulo(this.portal.x, this.portal.y, 40, 40, Estilo.PREENCHIDO);
    }

    let tempo = this.getTimer("tempo");
    this.preenchimento("black");
    this.texto(`Tempo: ${tempo.toFixed(0)}s | Vidas: ${this.vidas} | Pontos: ${this.pontos}`, 10, 20, 16);
  }
}

window.addEventListener("load", () => {
  new ExemploJogoResgate("Exemplo Jogo Resgate", "gameCanvas", 60, 800, 600);
});