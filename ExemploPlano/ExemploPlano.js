class ExemploPlano extends JS_CG_2D_API {
    
    acaoAoIniciar() {
        this.pontos = [];
        this.resolucao = 30; // Unidade do plano (30px = 1 unidade)

        EfeitosSonoros.carregarSom("tiro", "sons/resgate.wav");
        EfeitosSonoros.volumeSom("tiro", 0.04);
    }

    cliqueDoMouse(e) {
        // Converte as coordenadas da tela para a origem no centro (0,0)
        let x = Math.floor(e.offsetX - this.larguraTela() / 2);
        let y = Math.floor(e.offsetY - this.alturaTela() / 2);

        this.pontos.push({ x, y });
        EfeitosSonoros.tocarSom("tiro", true, true);
    }

    atualizar() {
        // Reservado para lógica do jogo, se necessário
    }

    desenhar() {
        // Limpeza do fundo
        this.limparTela("white");        

        // 2. Centraliza a origem no meio da tela e desenha os componentes
        this.empilhar();
            this.transladar(this.larguraTela() / 2, this.alturaTela() / 2);
            
            this.desenharEixos();
            this.desenharPontos();
        this.desempilhar();
    }

    desenharEixos() {
        let meiaLargura = this.larguraTela() / 2;
        let meiaAltura = this.alturaTela() / 2;

        this.contorno(1, "black");
        this.preenchimento("black");

        // Linhas dos eixos X e Y
        this.linha(-meiaLargura, 0, meiaLargura, 0, Estilo.PREENCHIDO);
        this.linha(0, -meiaAltura, 0, meiaAltura, Estilo.PREENCHIDO);

        // Riscos de marcação no eixo X
        for (let x = -meiaLargura; x < meiaLargura; x += this.resolucao) {
            this.linha(x, -3, x, 3, Estilo.PREENCHIDO);
        }

        // Riscos de marcação no eixo Y
        for (let y = -meiaAltura; y < meiaAltura; y += this.resolucao) {
            this.linha(-3, y, 3, y, Estilo.PREENCHIDO);
        }
    }

    desenharPontos() {
        for (let p of this.pontos) {
            // Projeções em direção aos eixos (Azul)
            this.contorno(1, "blue");
            this.preenchimento("blue");
            this.linha(p.x, p.y, 0, p.y, Estilo.LINHAS);
            this.linha(p.x, p.y, p.x, 0, Estilo.LINHAS);

            // O ponto cartesiano (Vermelho)
            this.contorno(5, "red");
            this.preenchimento("red");
            this.ponto(p.x, p.y);

            // Rótulo de texto das coordenadas (Verde)
            let cartX = (p.x / this.resolucao).toFixed(2);
            let cartY = (-p.y / this.resolucao).toFixed(2);
            let offsetY = p.y < 0 ? -10 : 20;

            this.contorno(1, "green");
            this.preenchimento("green");
            this.texto(`[${cartX}; ${cartY}]`, p.x, p.y + offsetY, 15);
        }
    }
}

window.addEventListener("load", () => {
    new ExemploPlano("O Plano Cartesiano", "gameCanvas", 60, 600, 600);
});