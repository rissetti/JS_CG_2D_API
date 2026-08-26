class Ponto {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class ExemploSnake extends JS_CG_2D_API {
    
    acaoAoIniciar() {
        EfeitosSonoros.carregarSom("comida", "sons/resgate.wav");
        EfeitosSonoros.carregarSom("tiro", "sons/tiro.mp3");
        EfeitosSonoros.volumeSom("comida", 0.1);

        this.tamanhoQuadrado = 30;
        this.resetarJogo();
    }

    resetarJogo() {
        this.atualizarDimensoes();
        this.tamanhoCobra = 5;
        this.velocidade = new Ponto(0, 0);
        this.posicao = new Ponto(10, 15);
        this.cobra = [];
        this.gerarComida();
    }

    atualizarDimensoes() {
        this.cols = Math.floor(this.larguraTela() / this.tamanhoQuadrado);
        this.rows = Math.floor(this.alturaTela() / this.tamanhoQuadrado);
    }

    gerarComida() {
        this.comida = new Ponto(
            Math.floor(Math.random() * this.cols),
            Math.floor(Math.random() * this.rows)
        );
    }

    teclaPressionada(e) {
        // Bloqueia rotação imediata de 180 graus (evita colisão instantânea)
        if (e.code === "ArrowLeft" && this.velocidade.x === 0)  this.velocidade = new Ponto(-1, 0);
        if (e.code === "ArrowRight" && this.velocidade.x === 0) this.velocidade = new Ponto(1, 0);
        if (e.code === "ArrowUp" && this.velocidade.y === 0)    this.velocidade = new Ponto(0, -1);
        if (e.code === "ArrowDown" && this.velocidade.y === 0)  this.velocidade = new Ponto(0, 1);

        if (e.altKey && e.code === "KeyF") {
            this.telaCheia();
            this.atualizarDimensoes();
            this.gerarComida();
        }
    }

    atualizar() {
        // Parado no início do jogo
        if (this.velocidade.x === 0 && this.velocidade.y === 0) return;

        // Movimentação com limite infinito
        this.posicao.x = (this.posicao.x + this.velocidade.x + this.cols) % this.cols;
        this.posicao.y = (this.posicao.y + this.velocidade.y + this.rows) % this.rows;

        // Colisão com o próprio corpo (Game Over)
        for (let p of this.cobra) {
            if (p.x === this.posicao.x && p.y === this.posicao.y) {
                EfeitosSonoros.tocarSom("tiro", false, true);
                this.resetarJogo();
                return;
            }
        }

        // Atualiza o rastro da cobra
        this.cobra.unshift(new Ponto(this.posicao.x, this.posicao.y));

        // Colisão com a comida
        if (this.posicao.x === this.comida.x && this.posicao.y === this.comida.y) {
            EfeitosSonoros.tocarSom("comida", false, true);
            this.tamanhoCobra++;
            this.gerarComida();
        }

        // Mantém o tamanho do rastro alinhado com a pontuação
        while (this.cobra.length > this.tamanhoCobra) {
            this.cobra.pop();
        }
    }

    desenhar() {
        let sz = this.tamanhoQuadrado;

        // Fundo
        this.preenchimento("black");
        this.retangulo(0, 0, this.larguraTela(), this.alturaTela(), Estilo.PREENCHIDO);

        // Comida
        this.preenchimento("blue");
        this.retangulo(this.comida.x * sz, this.comida.y * sz, sz, sz, Estilo.PREENCHIDO);

        // Cobra
        this.preenchimento("greenyellow");
        for (let p of this.cobra) {
            this.retangulo(p.x * sz, p.y * sz, sz - 1, sz - 1, Estilo.PREENCHIDO);
        }
    }
}

window.addEventListener("load", () => {
    new ExemploSnake("Cobrinha", "gameCanvas", 10, 600, 600);
});