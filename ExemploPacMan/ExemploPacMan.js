class ExemploPacMan extends JS_CG_2D_API {

    acaoAoIniciar() {
        this.tamanhoTile = 32;
        this.pontuacao = 0;
        this.gameOver = false;
        this.venceu = false;
        this.totalComidas = 0;

        // Áudio
        EfeitosSonoros.carregarSom("comer", "sons/comer.mp3");
        EfeitosSonoros.carregarSom("morte", "sons/morreu.mp3");

        // Animações
        this.animsPac = {
            cima: this.carregarFrames("pac_cima", 4),
            baixo: this.carregarFrames("pac_baixo", 4),
            esquerda: this.carregarFrames("pac_esquerda", 4),
            direita: this.carregarFrames("pac_direita", 4)
        };

        // Sprites
        this.pacman = new Sprite(32, 32);
        this.pacman.setAnimacao(this.animsPac.direita);

        this.fantasmas = [
            new Sprite(192, 128),
            new Sprite(224, 224)
        ];
        this.fantasmas[0].setAnimacao(this.carregarFrames("fantasma_amarelo", 2));
        this.fantasmas[0].setVelocidade(2, 0);

        this.fantasmas[1].setAnimacao(this.carregarFrames("fantasma_rosa", 4));
        this.fantasmas[1].setVelocidade(0, -2);

        // Mapa (14x10): 1 = Parede, 0 = Comida, 2 = Vazio
        this.mapa = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 2, 2, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        // Conta as comidas iniciais
        for (let r = 0; r < this.mapa.length; r++) {
            for (let c = 0; c < this.mapa[r].length; c++) {
                if (this.mapa[r][c] === 0) this.totalComidas++;
            }
        }
    }

    teclaPressionada(e) {
        let vel = 2;
        if (e.key === "ArrowUp" || e.key === "w") { 
            this.pacman.setVelocidade(0, -vel); 
            this.pacman.setAnimacao(this.animsPac.cima); 
        }
        if (e.key === "ArrowDown" || e.key === "s") { 
            this.pacman.setVelocidade(0, vel); 
            this.pacman.setAnimacao(this.animsPac.baixo); 
        }
        if (e.key === "ArrowLeft" || e.key === "a") { 
            this.pacman.setVelocidade(-vel, 0); 
            this.pacman.setAnimacao(this.animsPac.esquerda); 
        }
        if (e.key === "ArrowRight" || e.key === "d") { 
            this.pacman.setVelocidade(vel, 0); 
            this.pacman.setAnimacao(this.animsPac.direita); 
        }
    }

    // Colisão do Personagem contra as Paredes
    colidiuComParede(x, y) {
        let colisorObjeto = new Retangulo2D(x, y, 32, 32);
        let t = this.tamanhoTile;

        for (let r = 0; r < this.mapa.length; r++) {
            for (let c = 0; c < this.mapa[r].length; c++) {
                if (this.mapa[r][c] === 1) {
                    let colisorParede = new Retangulo2D(c * t, r * t, t, t);
                    if (this.colisao(colisorObjeto, colisorParede)) return true;
                }
            }
        }
        return false;
    }

    atualizar() {
        if (this.gameOver || this.venceu) return;

        // Movimento do Pac-Man (só move se não houver parede)
        let proxX = this.pacman.px + this.pacman.vx;
        let proxY = this.pacman.py + this.pacman.vy;

        if (!this.colidiuComParede(proxX, proxY)) {
            this.pacman.atualizar();
        }

        // 2. Colisão com Comidas
        let colisorPacman = new Retangulo2D(this.pacman.px, this.pacman.py, 32, 32);
        let t = this.tamanhoTile;

        for (let r = 0; r < this.mapa.length; r++) {
            for (let c = 0; c < this.mapa[r].length; c++) {
                if (this.mapa[r][c] === 0) {
                    let colisorComida = new Retangulo2D(c * t + 12, r * t + 12, 8, 8);

                    if (this.colisao(colisorPacman, colisorComida)) {
                        this.mapa[r][c] = 2; // Remove a comida do mapa
                        this.pontuacao += 10;
                        this.totalComidas--;
                        EfeitosSonoros.tocarSom("comer", false, true);

                        if (this.totalComidas === 0) this.venceu = true;
                    }
                }
            }
        }

        // Movimento e Colisão dos Fantasmas
        for (let f of this.fantasmas) {
            let fProxX = f.px + f.vx;
            let fProxY = f.py + f.vy;

            if (this.colidiuComParede(fProxX, fProxY)) {
                f.setVelocidade(-f.vx, -f.vy); // Rebate ao bater na parede
            } else {
                f.atualizar();
            }

            if (this.pacman.colisao(f)) {
                EfeitosSonoros.tocarSom("morte", true, false);
                this.gameOver = true;
            }
        }
    }

    desenhar() {
        this.limparTela("black");

        // Desenha Paredes e Comidas
        let t = this.tamanhoTile;
        for (let r = 0; r < this.mapa.length; r++) {
            for (let c = 0; c < this.mapa[r].length; c++) {
                let tipo = this.mapa[r][c];
                if (tipo === 1) {
                    this.preenchimento("blue");
                    this.retangulo(c * t, r * t, t, t, Estilo.PREENCHIDO);
                } else if (tipo === 0) {
                    this.preenchimento("white");
                    this.retangulo(c * t + 12, r * t + 12, 8, 8, Estilo.PREENCHIDO);
                }
            }
        }

        // Desenha Sprites
        this.desenharSprite(this.pacman);
        for (let f of this.fantasmas) {
            this.desenharSprite(f);
        }

        // HUD e Telas Finais
        this.preenchimento("white");
        this.texto(`PONTOS: ${this.pontuacao}`, 10, 24, 18);

        if (this.gameOver) {
            this.preenchimento("red");
            this.texto("GAME OVER", 140, 170, 26, "bold");
        } else if (this.venceu) {
            this.preenchimento("green");
            this.texto("VOCÊ VENCEU!", 130, 170, 26, "bold");
        }
    }
}

window.addEventListener("load", () => {
    new ExemploPacMan("Exemplo PacMan", "gameCanvas", 60, 448, 320);
});