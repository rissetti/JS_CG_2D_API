class ExemploRotacao extends JS_CG_2D_API {
    
    acaoAoIniciar() {
        this.ang = 0;
        this.x = 0;
        this.y = 0;
        this.xp = -200;
        this.dir = -50 / this.fps();
        this.estilo = Estilo.PREENCHIDO;

        this.vX = [10, 110, 110, 60, 10];
        this.vY = [-10, -10, -110, -60, -110];
    }

    teclaPressionada(e) {
        if (e.altKey && e.code === "KeyF") this.telaCheia();

        const estilos = { c: Estilo.PREENCHIDO, p: Estilo.PONTOS, l: Estilo.LINHAS };
        const tecla = e.key.toLowerCase();
        if (estilos[tecla]) this.estilo = estilos[tecla];
    }

    atualizarPosicaoMouse(e) {
        this.x = Math.floor(e.offsetX - this.larguraTela() / 2) - 60;
        this.y = Math.floor(e.offsetY - this.alturaTela() / 2) + 60;
    }

    mousePressionado(e) { this.atualizarPosicaoMouse(e); }
    movimentoDoMousePressionado(e) { this.atualizarPosicaoMouse(e); }

    atualizar() {
        // Incremento contínuo entre 0 e 359 graus
        this.ang = (this.ang + 1) % 360;

        // Movimento pendular
        if (this.xp <= -200 || this.xp >= 200) this.dir *= -1;
        this.xp += this.dir;
    }

    desenhar() {
        let cx = this.larguraTela() / 2;
        let cy = this.alturaTela() / 2;

        // Fundo Branco e Eixos de Referência
        this.preenchimento("white");
        this.retangulo(0, 0, this.larguraTela(), this.alturaTela(), Estilo.PREENCHIDO);
        this.linha(cx, 0, cx, this.alturaTela(), Estilo.PREENCHIDO);
        this.linha(0, cy, this.larguraTela(), cy, Estilo.PREENCHIDO);

        // Matriz de Transformação Principal (Origem no Centro)
        this.empilhar();
        this.contorno(3, "blue");
        this.transladar(cx, cy);
        this.preenchimento("black");

        // Rotação do Polígono em torno do seu Pivô Próprio (60, -60)
        this.empilhar();
            this.transladar(this.x, this.y);
            this.transladar(60, -60);
            this.rotacionar(this.ang);
            this.transladar(-60, 60);

            this.poligono(this.vX, this.vY, this.estilo);
        this.desempilhar();

        // Elementos Auxiliares
        this.linha(0, 0, 10, 10);
        this.ponto(this.xp, -20, 30);

        this.desempilhar();
    }
}

window.addEventListener("load", () => {
    new ExemploRotacao("Exemplo de Rotação", "gameCanvas", 100, 640, 480);
});