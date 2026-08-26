class ExemploTimers extends JS_CG_2D_API {
    
    acaoAoIniciar() {
        this.jogador = new Retangulo2D(100, 100, 40, 40);
        this.velocidade = 3;
        this.pontos = 0;
        this.quadrados = [];
        this.teclas = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

        // Timer que cria quadrados a cada 1 segundo
        this.iniciarTimer("quadrados", 1.0, true, () => {
            let x = Math.random() * (this.larguraTela() - 60);
            let y = Math.random() * (this.alturaTela() - 60);
            this.quadrados.push(new Retangulo2D(x, y, 20, 20));
        });

        // Timer de encerramento do jogo (30s)
        this.iniciarTimer("fimDeJogo", 30.0, false, () => {
            this.pararTimer("quadrados");
            console.log("Tempo esgotado!");
        }); 
    }

    teclaPressionada(e) { this.mapearTeclas(e.key, true); }
    teclaLiberada(e) { this.mapearTeclas(e.key, false); }

    mapearTeclas(chave, estado) {
        if (chave in this.teclas) this.teclas[chave] = estado;
    }

    atualizar() {
        let tempoRestante = this.getTimer("fimDeJogo");
        if (tempoRestante === -1) return; // Congela o jogo ao finalizar

        // Movimentação do Jogador
        let dirX = (this.teclas.ArrowRight ? 1 : 0) - (this.teclas.ArrowLeft ? 1 : 0);
        let dirY = (this.teclas.ArrowDown ? 1 : 0) - (this.teclas.ArrowUp ? 1 : 0);

        this.jogador.x += dirX * this.velocidade;
        this.jogador.y += dirY * this.velocidade;

        // Processamento de Colisão
        for (let i = this.quadrados.length - 1; i >= 0; i--) {
            if (this.colisao(this.jogador, this.quadrados[i])) {
                this.quadrados.splice(i, 1);
                this.pontos += 100;
            }
        }
    }

    desenhar() {
        this.limparTela("lightblue");

        // Jogador e Quadrados
        this.preenchimento("blue"); 
        this.retangulo(this.jogador, Estilo.PREENCHIDO);

        this.preenchimento("gold");
        for (let q of this.quadrados) {
            this.retangulo(q, Estilo.PREENCHIDO);
        }

        // HUD / Interface
        this.preenchimento("black");
        this.texto(`Pontos: ${this.pontos}`, 10, 20, 16);

        let tempo = this.getTimer("fimDeJogo");
        let msg = tempo !== -1 ? `O jogo acaba em ${tempo.toFixed(2)} segundos!` : "Fim de Jogo";
        this.texto(msg, 10, 40, 16);
    }
}

window.addEventListener("load", () => {
    new ExemploTimers("Exemplo de Uso de Timers", "gameCanvas", 100, 800, 600);
});