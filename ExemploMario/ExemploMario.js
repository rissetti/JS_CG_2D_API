class ExemploMario extends JS_CG_2D_API {        
    acaoAoIniciar() {        
        // Controles de movimento horizontal do jogador
        this.esquerda = false;
        this.direita = false;
        this.velocidadeX = 5;

        // Controle de estado do jogo (JOGANDO ou VENCEU)
        this.estadoJogo = "JOGANDO";

        // Cenário (Plataformas)
        this.plataformas = [
            new Retangulo2D(0, 550, 800, 50),   // Chão principal
            new Retangulo2D(200, 450, 100, 20), // Plataforma flutuante 1
            new Retangulo2D(400, 350, 100, 20), // Plataforma flutuante 2
            new Retangulo2D(600, 250, 100, 20)  // Plataforma flutuante 3
        ];

        // Objetivo final (a "Estrela" no topo)
        this.objetivo = new Retangulo2D(640, 200, 30, 30);

        // Jogador
        this.jogador = new Personagem(50, 400, 30, 30, this.plataformas);
        this.jogador.setForcaPulo(-14.0); // Deixa o pulo um pouco mais leve/alto
    }

    teclaPressionada(e) {
        if (e.key === "ArrowLeft" || e.key === "a") this.esquerda = true;
        if (e.key === "ArrowRight" || e.key === "d") this.direita = true;
        
        if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
            this.jogador.pular();
        }
    }

    teclaLiberada(e) {
        if (e.key === "ArrowLeft" || e.key === "a") this.esquerda = false;
        if (e.key === "ArrowRight" || e.key === "d") this.direita = false;
    }


    atualizar() {
        if (this.estadoJogo !== "JOGANDO") return; // Trava o jogo se já venceu

        // Movimentação Horizontal
        if (this.esquerda) {
            this.jogador.setX(this.jogador.getX() - this.velocidadeX);
        }
        if (this.direita) {
            this.jogador.setX(this.jogador.getX() + this.velocidadeX);
        }

        // Barreiras da tela
        if (this.jogador.getX() < 0) this.jogador.setX(0);
        if (this.jogador.getX() + 30 > this.larguraTela()) this.jogador.setX(this.larguraTela() - 30);

        // Atualiza a física (Gravidade e colisão com o chão)
        this.jogador.atualizar();

        // Buraco (Se cair da tela, morre e volta pro início)
        if (this.jogador.getY() > this.alturaTela()) {
            this.jogador.setX(50);
            this.jogador.setY(400); 
            // Dica: num jogo real, você tiraria uma vida do jogador aqui
        }

        // Checa colisão com o objetivo (Vitória) usando Retangulo2D
        let caixaJogador = this.jogador.getColisor();
        if (caixaJogador.intersects(this.objetivo)) {
            this.estadoJogo = "VENCEU";
        }
    }

    desenhar() {
        // Fundo do céu (Azul clássico)
        this.limparTela("#5c94fc"); 
    
        // Plataformas (Tijolos)
        this.preenchimento("#cc4c00"); 
        for (let plat of this.plataformas) {           
            this.retangulo(plat, Estilo.PREENCHIDO);
            this.contorno(2, "black");
            this.retangulo(plat, Estilo.LINHAS);
        }

        // Objetivo (Estrela Dourada)
        this.preenchimento("gold");
        this.retangulo(this.objetivo, Estilo.PREENCHIDO);
        this.contorno(2, "black");
        this.retangulo(this.objetivo, Estilo.LINHAS);

        // Jogador (Vermelho)
        this.preenchimento("red"); 
        this.retangulo(this.jogador.getX(), this.jogador.getY(), 30, 30, Estilo.PREENCHIDO);
        this.contorno(2, "darkred");
        this.retangulo(this.jogador.getX(), this.jogador.getY(), 30, 30, Estilo.LINHAS);

        // Interface / HUD
        if (this.estadoJogo === "VENCEU") {
            this.preenchimento("white");
            this.contorno(2, "black");
            this.texto("FASE CONCLUÍDA!", this.larguraTela() / 2 - 130, this.alturaTela() / 2, 35, "bold");
        } else {
            this.preenchimento("white");
            this.texto("Mova com as Setas, Pule com Espaço", 20, 30, 20);
        }
    }
}

// Inicializa o jogo no carregamento da página
window.addEventListener("load", () => {  
    new ExemploMario("Exemplo Mario", "gameCanvas", 60, 800, 600);
});