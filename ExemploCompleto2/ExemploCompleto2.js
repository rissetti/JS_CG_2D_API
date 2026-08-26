class ExemploCompleto2 extends JS_CG_2D_API {
  acaoAoIniciar() {
    // ESTADO E VARIÁVEIS DO JOGO
    this.pontos = 0;
    this.anguloMatriz = 0;
    this.mousePos = new Retangulo2D(0, 0, 10, 10);

    // Geometria estática para o polígono (vértices em X e Y)
    this.starX = [0, 15, 50, 22, 33, 0, -33, -22, -50, -15];
    this.starY = [-50, -15, -15, 10, 45, 25, 45, 10, -15, -15];

    // OBJETOS DE COLISÃO (Retangulo2D)
    // Jogador (Controlado pelas setas)
    this.jogador = new Retangulo2D(100, 250, 40, 40);
    this.velocidade = 4;
    this.teclas = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    // Alvo (Item coletável)
    this.alvo = new Retangulo2D(400, 250, 30, 30);

    // ÁUDIO (EfeitosSonoros)
    EfeitosSonoros.carregarSom("coleta", "sons/resgate.wav");
    EfeitosSonoros.volumeSom("coleta", 0.2);

    // TEMPORIZADORES (Timers)
    // Timer de repetição (Troca a posição do alvo a cada 5 segundos)
    this.iniciarTimer("moverAlvo", 5.0, true, () => {
      this.reposicionarAlvo();
    });

    // Timer de disparo único (Cronômetro total de 30 segundos)
    this.iniciarTimer("tempoLimite", 30.0, false, () => {
      this.pararTimer("moverAlvo");
      console.log("Tempo esgotado!");
    });
  }

  reposicionarAlvo() {
    // Usa as funções de dimensão da tela da API: larguraTela() e alturaTela()
    this.alvo.x = Math.random() * (this.larguraTela() - 100) + 50;
    this.alvo.y = Math.random() * (this.alturaTela() - 150) + 50;
  }

  // ENTRADAS DE TECLADO
  teclaPressionada(e) {
    if (e.key in this.teclas) this.teclas[e.key] = true;

    // Atalho de Tela Cheia nativo
    if (e.altKey && e.code === "KeyF") this.telaCheia();
  }

  teclaLiberada(e) {
    if (e.key in this.teclas) this.teclas[e.key] = false;
  }

  // ENTRADAS DE MOUSE
  movimentoDoMouse(e) {
    // Captura a posição do mouse relativa ao canvas
    this.mousePos.x = e.offsetX;
    this.mousePos.y = e.offsetY;
  }

  cliqueDoMouse(e) {
    // Metade do tamanho do jogador (40px / 2 = 20px)
    let metadeTamanho = 20;

    // Reposiciona a partir do centro do clique
    this.jogador.x = e.offsetX - metadeTamanho;
    this.jogador.y = e.offsetY - metadeTamanho;
  }

  // LÓGICA E FÍSICA (Loop de Atualização)
  atualizar() {
    // Se o tempo acabou, congela a movimentação
    if (this.getTimer("tempoLimite") === -1) return;

    // Movimentação do Jogador
    if (this.teclas.ArrowUp) this.jogador.y -= this.velocidade;
    if (this.teclas.ArrowDown) this.jogador.y += this.velocidade;
    if (this.teclas.ArrowLeft) this.jogador.x -= this.velocidade;
    if (this.teclas.ArrowRight) this.jogador.x += this.velocidade;

    // Atualização da Rotação para a Matriz de Transformação
    this.anguloMatriz = (this.anguloMatriz + 2) % 360;

    // Teste de Colisão
    if (this.colisao(this.jogador, this.alvo)) {
      EfeitosSonoros.tocarSom("coleta", false, true);
      this.pontos += 10;
      this.reposicionarAlvo();
    }
  }

  // RENDERIZAÇÃO GRÁFICA (Loop de Desenho)
  desenhar() {
    // Limpeza de Tela
    this.limparTela("#f0f4f8");

    // Primitivas Básicas (Linhas, Pontos e Círculos)
    this.contorno(2, "#cccccc");
    this.linha(0, 450, this.larguraTela(), 450); // Linha divisória do HUD

    this.preenchimento("purple");
    this.contorno(8, "purple");
    this.ponto(this.mousePos.x, this.mousePos.y); // Ponto no cursor do mouse

    // Objeto Alvo
    this.contorno(2, "darkgreen");
    this.preenchimento("lightgreen");
    this.circulo(this.alvo.x + 15, this.alvo.y + 15, 15, 15, Estilo.PREENCHIDO);

    // Objeto Jogador
    this.contorno(2, "darkblue");
    this.preenchimento("dodgerblue");
    this.retangulo(this.jogador, Estilo.PREENCHIDO);

    // Transformações Matriciais (Pilha, Translação e Rotação)
    this.empilhar(); // Salva o estado atual do Canvas
    this.transladar(700, 100); // Move a origem local para o canto superior direito
    this.rotacionar(this.anguloMatriz); // Rotaciona o sistema de coordenadas local

    this.contorno(2, "darkorange");
    this.preenchimento("gold");
    this.poligono(this.starX, this.starY, Estilo.PREENCHIDO); // Desenha forma complexa
    this.desempilhar(); // Restaura o estado original da matriz

    // 6. Textos e Interface de Usuário (HUD)
    this.preenchimento("black");
    this.texto(`Pontuação: ${this.pontos}`, 20, 490, 20, "bold");

    let tempo = this.getTimer("tempoLimite");
    let txtTempo = tempo !== -1 ? `Tempo Restante: ${tempo.toFixed(2)}s` : "FIM DE JOGO!";
    this.texto(txtTempo, 20, 520, 18);

    this.preenchimento("#555555");
    this.texto(
      "Controles: Setas para mover | Clique para Teleportar | Alt+F Tela Cheia",
      20,
      560,
      14,
    );
  }

  acaoAoSair() {
    console.log("Aplicação encerrada.");
  }
}

// INICIALIZAÇÃO NA PÁGINA
window.addEventListener("load", () => {  
  new ExemploCompleto2("Exemplo Completo 2", "gameCanvas", 60, 800, 600);
});
