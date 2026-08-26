class ExemploCorrida extends JS_CG_2D_API {   

    acaoAoIniciar() {
        // Controles de movimento
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        // Atributos do carro
        this.x = 400;
        this.y = 80;
        this.ang = 0;       // Ângulo em graus
        this.vel = 0;       // Velocidade atual
        this.velMax = 8;    // Velocidade máxima no asfalto
        this.foraDaPista = false;

        // Sistema de voltas
        this.voltas = 0;
        this.passouMetade = false;

        // Limites da pista e miolo central
        this.grama = [
            new Retangulo2D(0, 0, 800, 30),       // Muro superior
            new Retangulo2D(0, 570, 800, 30),     // Muro inferior
            new Retangulo2D(0, 0, 30, 600),       // Muro esquerdo
            new Retangulo2D(770, 0, 30, 600),     // Muro direito
            new Retangulo2D(150, 150, 500, 300)  // Ilha central
        ];
        
        this.linhaChegada = new Retangulo2D(400, 30, 10, 120);
    }

    teclaPressionada(e) {
        if (e.key === "ArrowUp" || e.key === "w") this.up = true;
        if (e.key === "ArrowDown" || e.key === "s") this.down = true;
        if (e.key === "ArrowLeft" || e.key === "a") this.left = true;
        if (e.key === "ArrowRight" || e.key === "d") this.right = true;
    }

    teclaLiberada(e) {
        if (e.key === "ArrowUp" || e.key === "w") this.up = false;
        if (e.key === "ArrowDown" || e.key === "s") this.down = false;
        if (e.key === "ArrowLeft" || e.key === "a") this.left = false;
        if (e.key === "ArrowRight" || e.key === "d") this.right = false;
    }


   atualizar() {
    // Direção (Giro do volante)
    if (Math.abs(this.vel) > 0.5) {
        let direcaoGiro = this.vel > 0 ? 1 : -1;
        if (this.left) this.ang -= 4 * direcaoGiro;
        if (this.right) this.ang += 4 * direcaoGiro;
    }

    // Aceleração, Frenagem e Atrito
    if (this.up) {
        this.vel += 0.2;
    } else if (this.down) {
        this.vel -= 0.2;
    } else {
        this.vel *= 0.95; // Freio motor
    }

    // Checagem de Terreno
    let colisorCarro = new Retangulo2D(this.x - 10, this.y - 10, 20, 20);
    this.foraDaPista = false;
    
    for (let mato of this.grama) {
        if (this.colisao(colisorCarro, mato)) {
            this.foraDaPista = true;
            break;
        }
    }

    // Limite de Velocidade
    let limiteAtual = this.foraDaPista ? 2.5 : this.velMax;
    if (this.vel > limiteAtual) this.vel = limiteAtual;
    if (this.vel < -limiteAtual / 2) this.vel = -limiteAtual / 2;

    // Movimento Vetorial Baseado no Ângulo
    let radianos = (this.ang * Math.PI) / 180;
    this.x += Math.cos(radianos) * this.vel;
    this.y += Math.sin(radianos) * this.vel;

    // Sistema de Voltas
    if (this.x < 200) this.passouMetade = true;
    
    if (this.passouMetade && this.x > 400 && this.x < 420 && this.y < 150) {
        this.voltas++;
        this.passouMetade = false;
    }
}

    desenhar() {
        // Asfalto
        this.limparTela("#555555");        

        this.desenharCenario();
        this.desenharCarro();
        this.desenharHUD();
    }

    desenharCenario() {
        // Áreas de Grama
        this.preenchimento("#228B22");
        for (let mato of this.grama) {
            this.retangulo(mato, Estilo.PREENCHIDO);
            this.contorno(2, "#006400");
            this.retangulo(mato, Estilo.LINHAS);
        }

        // Linha de chegada
        this.preenchimento("white");
        this.retangulo(this.linhaChegada, Estilo.PREENCHIDO);
    }

    desenharCarro() {
        this.empilhar();
            this.transladar(this.x, this.y);
            this.rotacionar(this.ang);

            // Corpo do carro
            this.preenchimento("#cc0000");
            this.retangulo(-15, -10, 30, 20, Estilo.PREENCHIDO);

            // Para-brisa (frente)
            this.preenchimento("cyan");
            this.retangulo(5, -8, 5, 16, Estilo.PREENCHIDO);

            // Borda
            this.contorno(1.5, "black");
            this.retangulo(-15, -10, 30, 20, Estilo.LINHAS);
        this.desempilhar();
    }

    desenharHUD() {
        this.preenchimento("white");
        this.contorno(2, "black");

        let velocimetro = Math.abs(this.vel * 15).toFixed(0);
        this.texto(`Voltas: ${this.voltas}`, 50, 60, 24, "bold");
        this.texto(`Km/h: ${velocimetro}`, 50, 90, 20);

        if (this.foraDaPista) {
            this.preenchimento("yellow");
            this.texto("Fora da pista!", 50, 120, 16);
        }
    }
}

window.addEventListener("load", () => {
    new ExemploCorrida("Exemplo Corrida", "gameCanvas", 60, 800, 600);
});