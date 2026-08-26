class ExemploCarrinhoColisores extends JS_CG_2D_API {
    acaoAoIniciar() {
        // Estado dos controles
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        // Posição e física do veículo
        this.px = 0.0;
        this.py = 0.0;
        this.ang = 0.0;
        this.ac = 0.0;

        // Configurações de física
        this.velocidadeMaxima = 300.0;
        this.velocidadeRe = -150.0;
        this.taxaAceleracao = 250.0;
        this.taxaDesaceleracao = 150.0;
        this.velocidadeRotacao = 3.0;

        this.des = false;
        this.dir = true;

        // Textura do veículo
        this.carro = new Image();
        this.carro.src = "imagens/carro.png";

        // Colisores
        this.colisor1 = new Retangulo2D(150, -350, 50, 500);
        this.colisorCarro = new Retangulo2D(0, 0, 40, 20);
    }

    teclaPressionada(e) {
        if (e.code === "ArrowUp") this.up = true;
        if (e.code === "ArrowDown") this.down = true;
        if (e.code === "ArrowRight") this.right = true;
        if (e.code === "ArrowLeft") this.left = true;
    }

    teclaLiberada(e) {
        if (e.code === "ArrowUp") { this.up = false; this.des = true; }
        if (e.code === "ArrowDown") { this.down = false; this.des = true; }
        if (e.code === "ArrowRight") this.right = false;
        if (e.code === "ArrowLeft") this.left = false;
    }

    desacelera(dt) {
        if (this.dir) {
            if (this.ac > 0) {
                this.ac -= this.taxaDesaceleracao * dt;
                if (this.ac < 0) this.ac = 0.0;
            }
        } else {
            if (this.ac < 0) {
                this.ac += this.taxaDesaceleracao * dt;
                if (this.ac > 0) this.ac = 0.0;
            }
        }
    }

    atualizar(dt) {
        const delta = dt;

        if (this.des) {
            this.desacelera(delta);
        }

        if (this.up) {
            this.des = false;
            this.dir = true;
            this.ac = Math.min(this.ac + this.taxaAceleracao * delta, this.velocidadeMaxima);
        }

        if (this.down) {
            this.des = false;
            this.dir = false;
            this.ac = Math.max(this.ac - this.taxaAceleracao * delta, this.velocidadeRe);
        }

        if (this.left) {
            this.ang -= this.velocidadeRotacao * delta;
        }

        if (this.right) {
            this.ang += this.velocidadeRotacao * delta;
        }

        // Dimensões do colisor
        const larguraCarro = this.carro.width;
        const alturaCarro = this.carro.height;

        // Vetores de deslocamento
        const passoX = Math.cos(this.ang) * this.ac * delta;
        const passoY = Math.sin(this.ang) * this.ac * delta;

        // DESLOCAMENTO E RESOLUÇÃO DE COLISÃO NO EIXO X
        this.px += passoX;
        this.colisorCarro.x = this.px - larguraCarro / 2;
        this.colisorCarro.y = this.py - alturaCarro / 2;
        this.colisorCarro.largura = larguraCarro;
        this.colisorCarro.altura = alturaCarro;

        if (this.colisao(this.colisor1, this.colisorCarro)) {
            this.px -= passoX; // Restaura apenas o X (mantém movimento no Y)
            this.ac *= 0.98;   // Atrito ao raspar na parede
        }

        // DESLOCAMENTO E RESOLUÇÃO DE COLISÃO NO EIXO Y
        this.py += passoY;
        this.colisorCarro.x = this.px - larguraCarro / 2;
        this.colisorCarro.y = this.py - alturaCarro / 2;

        if (this.colisao(this.colisor1, this.colisorCarro)) {
            this.py -= passoY; // Restaura apenas o Y (mantém movimento no X)
            this.ac *= 0.98;   // Atrito ao raspar na parede
        }
    }

    desenhar() {
        this.limparTela("white");

        const centroX = this.larguraTela() / 2;
        const centroY = this.alturaTela() / 2;

        // Renderização do Mundo (Câmera Seguidora)
        this.empilhar();
            this.transladar(centroX - this.px, centroY - this.py);

            // Elementos do cenário
            this.contorno(2, "green");
            this.retangulo(100, 100, 200, 200, Estilo.LINHAS);
            this.contorno(2, "red");
            this.retangulo(300, 600, 350, 670, Estilo.LINHAS);
            this.contorno(2, "blue");
            this.retangulo(1000, 800, 1200, 1000, Estilo.LINHAS);

            // Obstáculo
            this.preenchimento("black");
            this.retangulo(this.colisor1, Estilo.PREENCHIDO);

            // Renderização do Carro com Rotação
            this.empilhar();
                this.transladar(this.px, this.py);
                this.rotacionar(this.ang * (180 / Math.PI));    
                const w = this.carro.width;
                const h = this.carro.height;
                this.imagem(this.carro, -w / 2, -h / 2);
            this.desempilhar();
        this.desempilhar();

        // HUD
        const velocidadeKm = Math.round((Math.abs(this.ac) / this.velocidadeMaxima) * 100);
        const msg = `Velocidade = ${velocidadeKm} km/h`;        
        this.preenchimento("black");
        this.texto(msg, this.larguraTela() - 260, 40, 22, "bold");
    }
}

// Inicia o jogo
window.addEventListener("load", () => {
    new ExemploCarrinhoColisores("Carrinho com Colisores", "gameCanvas", 60, 1200, 800);
});
