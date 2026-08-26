class ExemploPersonagemInimigo extends JS_CG_2D_API {
    acaoAoIniciar() {
        this.plataformas = [
            new Retangulo2D(0, 560, 800, 40),   // Chão
            new Retangulo2D(120, 460, 160, 18), // Obstáculo 1
            new Retangulo2D(420, 400, 200, 18)  // Obstáculo 2
        ];

        // Entidades
        this.personagem = new Personagem(80, 300, 36, 36, this.plataformas);
        this.inimigo = new Personagem(500, 300, 36, 36, this.plataformas);
        
        this.eVelX = 2;
        this.haColisao = false;
        this.teclas = { esquerda: false, direita: false, pular: false };
    }

    teclaPressionada(e) {
    // Ação pontual de clique único (Cria objeto sem repetir ao segurar a tecla)
    if ((e.code === "KeyN" || e.key?.toLowerCase() === "n") && !e.repeat) {
        const novaPlataforma = new Retangulo2D(520, 300, 200, 18);
        this.plataformas.push(novaPlataforma);
        this.personagem.addPlataformas(novaPlataforma);
        this.inimigo.addPlataformas(novaPlataforma);
    }

    // Atualiza estado de movimentação contínua
    this.mapearTeclas(e.code, true);
}

    teclaLiberada(e) { 
        this.mapearTeclas(e.code, false); 
    }

    mapearTeclas(codigo, estado) {
        if (codigo === "ArrowLeft") this.teclas.esquerda = estado;
        if (codigo === "ArrowRight") this.teclas.direita = estado;
        if (codigo === "Space") this.teclas.pular = estado;
    }

    atualizar() {
        // Movimento do Jogador
        let dirX = (this.teclas.direita ? 1 : 0) - (this.teclas.esquerda ? 1 : 0);
        this.personagem.setX(this.personagem.getX() + dirX * 4);

        if (this.teclas.pular) this.personagem.pular();
        this.personagem.atualizar();

        // Movimento do Inimigo (Patrulha)
        let ex = this.inimigo.getX() + this.eVelX;
        if (ex < 100 || ex > 700) this.eVelX *= -1;
        this.inimigo.setX(ex);
        this.inimigo.atualizar();

        // Processamento de Colisão
        this.haColisao = this.colisao(this.personagem.getColisor(), this.inimigo.getColisor());
    }

    desenhar() {
        // Fundo
        this.preenchimento("lightskyblue");
        this.retangulo(0, 0, this.larguraTela(), this.alturaTela(), Estilo.PREENCHIDO);

        // Plataformas
        this.preenchimento("darkslategray");
        for (let p of this.plataformas) {
            this.retangulo(p, Estilo.PREENCHIDO);
        }

        // Jogador (Laranja)
        this.preenchimento("orangered");
        this.retangulo(this.personagem.getX(), this.personagem.getY(), 36, 36, Estilo.PREENCHIDO);

        // Inimigo (Vermelho Escuro)
        this.preenchimento("darkred");
        this.retangulo(this.inimigo.getX(), this.inimigo.getY(), 36, 36, Estilo.PREENCHIDO);

        // HUD / Mensagens
        if (this.haColisao) {
            this.preenchimento("yellow");
            this.texto("COLISÃO DETECTADA!", 320, 80, 20);
        }

        this.preenchimento("black");
        this.texto(
            `Setas para mover | Espaço para pular | N novo obstáculo | noChao: ${this.personagem.isNoChao()}`,
            10, 20, 16
        );
    }
}

window.addEventListener("load", () => {
    new ExemploPersonagemInimigo("Personagem pulando, com gravidade!", "gameCanvas", 60, 800, 600);
});