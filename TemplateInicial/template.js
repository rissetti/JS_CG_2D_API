/**
 * TEMPLATE INICIAL
 */

class Template extends JS_CG_2D_API {
    // =========================================================================
    // 1. INICIALIZAÇÃO
    // Executado UMA ÚNICA VEZ ao carregar o jogo.
    // =========================================================================
    acaoAoIniciar() {
        // TODO: Crie suas variáveis globais e estados iniciais do jogo
        this.pontos = 0;
        this.velocidade = 5;

        // Exemplo: Jogador (X, Y, Largura, Altura)
        this.jogador = new Retangulo2D(380, 280, 40, 40);
        
        // Mapeamento de estado de teclas
        this.teclas = {};

        // TODO: Carregar áudios (se houver)
        // EfeitosSonoros.carregarSom("pulo", "sons/pulo.mp3");

        // TODO: Criar temporizadores (se houver)
        // this.iniciarTimer("tempoJogo", 10.0, false, () => console.log("Fim!"));
    }

    // =========================================================================
    // 2. ENTRADAS
    // Captura de eventos de Teclado e Mouse.
    // =========================================================================
    teclaPressionada(e) {
        this.teclas[e.code] = true;

        // Atalho padrão para Tela Cheia (Alt + F)
        if (e.altKey && e.code === "KeyF") {
            this.telaCheia();
        }        
    }

    teclaLiberada(e) {
        this.teclas[e.code] = false;
    }

    cliqueDoMouse(e) {
        // TODO: Escreva o que acontece ao clicar o mouse no canvas
        // Exemplo: Teleporta o jogador para onde clicou (centralizado)
        this.jogador.x = e.offsetX - 20; 
        this.jogador.y = e.offsetY - 20;
    }

    movimentoDoMouse(e) {
        // TODO: Capturar a posição do cursor se necessário
        //this.jogador.x = e.offsetX - 20;
        //this.jogador.y = e.offsetY - 20;
    }

    // =========================================================================
    // 3. LÓGICA DO JOGO (GAME LOOP)
    // Executado continuamente conforme a taxa de FPS (ex: 60x por segundo).
    // NÃO COLOQUE COMANDOS DE DESENHO AQUI...
    // =========================================================================
    atualizar() {
        // TODO: Atualize movimentações, físicas e colisões

        // Exemplo de movimentação do jogador
        if (this.teclas["ArrowUp"] || this.teclas["KeyW"])    this.jogador.y -= this.velocidade;
        if (this.teclas["ArrowDown"] || this.teclas["KeyS"])  this.jogador.y += this.velocidade;
        if (this.teclas["ArrowLeft"] || this.teclas["KeyA"])  this.jogador.x -= this.velocidade;
        if (this.teclas["ArrowRight"] || this.teclas["KeyD"]) this.jogador.x += this.velocidade;

        // TODO: Testar colisões usando this.colisao(objetoA, objetoB)        
    }

    // =========================================================================
    // 4. RENDERIZAÇÃO GRÁFICA
    // Executado após o atualizar().
    // APENAS COMANDOS VISUAIS DEVEM FICAR AQUI!
    // =========================================================================
    desenhar() {
        // A. Limpeza e Fundo da Tela
        this.limparTela("#1e1e2e");
        
        // B. Desenho dos Objetos do Jogo
        // TODO: Desenhe seus elementos (retângulos, círculos, linhas, etc.)
        
        // Exemplo: Desenhar o Jogador
        this.preenchimento("#08970f");
        this.contorno(2, "#ffffff");
        this.retangulo(this.jogador, Estilo.PREENCHIDO);
        //this.retangulo(this.jogador, Estilo.LINHAS);
        //this.preenchimento("black");
        //this.retangulo(this.jogador, Estilo.PONTOS);

        // C. Interface / HUD (Textos e Pontuação)
        this.preenchimento("#f8f8f2");
        this.texto(`Pontuação: ${this.pontos}`, 20, 35, 18, "bold");
        
    }    
}

// Inicia o jogo automaticamente assim que a página carregar
window.addEventListener("load", () => {
    new Template("Template", "gameCanvas", 60, 800, 600);
});