class ExemploSpace extends JS_CG_2D_API {
    acaoAoIniciar() {
        this.x = -50;
        this.y = 100;
        this.shoots = [];
        this.teclas = {};
        EfeitosSonoros.carregarSom("tiro", "sons/tiro.wav");
    }

    teclaPressionada(e) { 
        this.teclas[e.code] = true; 
    }

    teclaLiberada(e) {
        this.teclas[e.code] = false;
        if (e.code === "Space") {
            this.shoots.push({ x: this.x + 35, y: this.y });
            // Toca o som registrado permitindo sobreposição de disparos
            EfeitosSonoros.tocarSom("tiro", true);
        }
    }

    atualizar(dt) {
        // Movimentação da nave
        if (this.teclas["ArrowLeft"]) this.x -= 120 * dt;
        if (this.teclas["ArrowRight"]) this.x += 120 * dt;

        // Atualização dos projéteis
        for (let i = this.shoots.length - 1; i >= 0; i--) {
            this.shoots[i].y -= 200 * dt;

            // Remoção automática de projéteis fora da tela
            if (this.shoots[i].y < -this.alturaTela()) {
                this.shoots.splice(i, 1);
            }
        }
    }

    desenhar() {
        // Limpeza de tela
        this.limparTela("white");

        // Câmera / Matriz relativa ao centro
        this.empilhar();
        this.transladar(this.larguraTela() / 2, this.alturaTela() / 2);

        // Nave
        this.contorno(3, "blue");
        this.preenchimento("blue");
        this.retangulo(this.x, this.y, 100, 100, Estilo.PREENCHIDO);

        // Projéteis
        if (this.shoots.length > 0) {
            this.contorno(3, "red");
            this.preenchimento("red");
            for (const shoot of this.shoots) {
                this.circulo(shoot.x, shoot.y, 20, 20, Estilo.PREENCHIDO);
            }
        }
        this.desempilhar();
    }
}


window.addEventListener("load", () => {
  new ExemploSpace("Space Invaders 0.0.0.0.1", "gameCanvas", 60, 600, 400);
});

