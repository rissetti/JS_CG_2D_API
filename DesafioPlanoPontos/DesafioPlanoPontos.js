class DesafioPlanoPontos extends JS_CG_2D_API {
    
    pontoPlano(x, y) {
        this.ponto(this.resolucao * x, -this.resolucao * y);
    }

    acaoAoIniciar() {
        this.pontosUsuario = [];
        this.resolucao = 25;
        this.deveTransladar = false;

        // Limites do movimento
        this.limiteSuperiorY = 8 * -this.resolucao; // -200
        this.limiteInferiorY = 3 * -this.resolucao; // -75
        this.limiteSuperiorX = 8 * this.resolucao;  // 200
        this.limiteInferiorX = 3 * this.resolucao;  // 75

        // Posições iniciais
        this.yP1 = this.limiteInferiorY;
        this.xP2 = this.limiteInferiorX;
        this.yP3 = this.limiteSuperiorY;
        this.xP4 = this.limiteSuperiorX;

        // Velocidades
        let velocidadeBase = -3;
        this.dirP1 = velocidadeBase;
        this.dirP2 = velocidadeBase;
        this.dirP3 = velocidadeBase;
        this.dirP4 = velocidadeBase;

        EfeitosSonoros.carregarSom("tiro", "sons/resgate.wav");
        if (typeof EfeitosSonoros.volumeSom === "function") {
            EfeitosSonoros.volumeSom("tiro", 0.04);
        }
    }

    teclaPressionada(e) {
        if (e.code === "KeyT") {
            this.deveTransladar = !this.deveTransladar;
        }
    }

    cliqueDoMouse(e) {
        let x = Math.floor(e.offsetX - this.larguraTela() / 2);
        let y = Math.floor(e.offsetY - this.alturaTela() / 2);

        this.pontosUsuario.push({ x, y });
        EfeitosSonoros.tocarSom("tiro", true, true);
    }

    atualizar() {
        // Ponto 1 (Blueviolet - Vertical Esquerda)
        if (this.yP1 <= this.limiteSuperiorY) this.dirP1 *= -1;
        this.yP1 += this.dirP1;
        if (this.yP1 >= this.limiteInferiorY) this.dirP1 *= -1;

        // Ponto 2 (Deeppink - Horizontal Topo)
        if (this.xP2 <= this.limiteInferiorX) this.dirP2 *= -1;
        this.xP2 += this.dirP2;
        if (this.xP2 >= this.limiteSuperiorX) this.dirP2 *= -1;

        // Ponto 3 (Darkorange - Vertical Direita)
        if (this.yP3 <= this.limiteSuperiorY) this.dirP3 *= -1;
        this.yP3 += this.dirP3;
        if (this.yP3 >= this.limiteInferiorY) this.dirP3 *= -1;

        // Ponto 4 (Cadetblue - Horizontal Base)
        this.xP4 += this.dirP4;
        if (this.xP4 <= this.limiteInferiorX || this.xP4 >= this.limiteSuperiorX) {
            this.dirP4 *= -1;
        }
    }

    desenhar() {
        this.preenchimento("white");
        this.retangulo(0, 0, this.larguraTela(), this.alturaTela(), Estilo.PREENCHIDO);

        this.preenchimento("black");
        this.contorno(1, "black");
        this.linha(this.larguraTela() / 2, 0, this.larguraTela() / 2, this.alturaTela(), Estilo.PREENCHIDO);
        this.linha(0, this.alturaTela() / 2, this.larguraTela(), this.alturaTela() / 2, Estilo.PREENCHIDO);

        this.empilhar();
            this.transladar(this.larguraTela() / 2, this.alturaTela() / 2);
            
            this.desenharEixos();
            this.desenharPoligonoFixo();
            this.desenharPontosUsuario();
            this.desenharPontosAnimados();
        this.desempilhar();
    }

    desenharEixos() {
        let meiaLargura = this.larguraTela() / 2;
        let meiaAltura = this.alturaTela() / 2;

        this.contorno(1, "black");
        this.preenchimento("black");

        for (let i = -meiaLargura; i < meiaLargura; i += this.resolucao) {
            this.linha(i, -3, i, 3, Estilo.PREENCHIDO);
        }
        for (let i = -meiaAltura; i < meiaAltura; i += this.resolucao) {
            this.linha(-3, i, 3, i, Estilo.PREENCHIDO);
        }
    }

    desenharPoligonoFixo() {
        this.contorno(5, "green");
        this.preenchimento("green");
        this.pontoPlano(1, 1);
        this.pontoPlano(2, 0);
        this.pontoPlano(3, 1);
        this.pontoPlano(1, 3);

        let vX = [1 * this.resolucao, 2 * this.resolucao, 3 * this.resolucao, 1 * this.resolucao];
        let vY = [-1 * this.resolucao, 0, -1 * this.resolucao, -3 * this.resolucao];

        this.empilhar();
            if (this.deveTransladar) {
                this.transladar(1 * this.resolucao, -1 * this.resolucao);
            }
            this.preenchimento("beige");
            this.contorno(1, "blueviolet");
            this.poligono(vX, vY, Estilo.LINHAS);
            this.poligono(vX, vY, Estilo.PREENCHIDO);
        this.desempilhar();
    }

    desenharPontosUsuario() {
        for (let p of this.pontosUsuario) {
            this.contorno(5, "red");
            this.preenchimento("red");
            this.ponto(p.x, p.y);

            this.contorno(1, "blue");
            this.preenchimento("blue");
            this.linha(p.x, p.y, 0, p.y, Estilo.LINHAS);
            this.linha(p.x, p.y, p.x, 0, Estilo.LINHAS);

            let px = (p.x / this.resolucao).toFixed(2);
            let py = (-p.y / this.resolucao).toFixed(2);
            let offsetY = p.y < 0 ? -10 : 20;

            this.preenchimento("green");
            this.contorno(1, "green");
            this.texto(`[${px}; ${py}]`, p.x, p.y + offsetY, 15);
        }
    }

    desenharPontosAnimados() {
        // P1: Blueviolet
        this.contorno(5, "blueviolet");
        this.preenchimento("blueviolet");
        this.ponto(this.limiteInferiorX, this.yP1);

        // P2: Deeppink
        this.contorno(5, "deeppink");
        this.preenchimento("deeppink");
        this.ponto(this.xP2, this.limiteSuperiorY);

        // P3: Darkorange
        this.contorno(5, "darkorange");
        this.preenchimento("darkorange");
        this.ponto(this.limiteSuperiorX, this.yP3);

        // P4: Cadetblue
        this.contorno(5, "cadetblue");
        this.preenchimento("cadetblue");
        this.ponto(this.xP4, this.limiteInferiorY);
    }
}

window.addEventListener("load", () => {
    new DesafioPlanoPontos("Plano Completo", "gameCanvas", 60, 800, 600);
});