class ExemploTransformacoes extends JS_CG_2D_API {
  acaoAoIniciar() {
    // Posição inicial no centro do canvas
    this.x = 400;
    this.y = 300;
    this.ang = 0;
  }

  atualizar(dt) {
    // Faz o objeto girar continuamente mantendo o ângulo entre 0 e 360
    this.ang = (this.ang + 1.5) % 360;
  }

  desenhar() {
    // Limpar o fundo
    this.limparTela("#e0e0e0");    

    // ELEMENTO 1: Desenhado no sistema de coordenadas GLOBAL
    this.preenchimento("blue");
    this.texto("1. Objeto fixo (Origem Global no canto superior esquerdo)", 20, 40, 16);
    this.retangulo(20, 60, 60, 40, Estilo.PREENCHIDO);

    // ELEMENTO 2: Objeto com Sistema de Coordenadas LOCAL
    // Guarda a posição original da folha de papel
    this.empilhar();
        // Move o centro (0,0) do papel para onde o objeto vai ficar
        this.transladar(this.x, this.y);
        // Gira a folha em volta do novo ponto (0,0)
        this.rotacionar(this.ang);
        // Desenha o objeto em relação ao seu centro (0,0)
        // Corpo do objeto (centralizado entre -30 e +30)
        this.preenchimento("red");
        this.retangulo(-30, -20, 60, 40, Estilo.PREENCHIDO);        
        // Indicador de "frente" para ver a rotação nitidamente
        this.preenchimento("yellow");
        this.retangulo(0, -5, 25, 10, Estilo.PREENCHIDO);
        // Marcação do ponto central (0,0 local)
        this.preenchimento("black");
        this.ponto(0, 0, Estilo.PREENCHIDO);
        // Texto junto do objeto
        this.texto("OBJETO ROTACIONANDO", -100, -35, 16);
    // Desfaz o giro e o movimento do papel, voltando ao normal
    this.desempilhar();

    // Prova de que o desempilhar() restaurou o mundo
    this.preenchimento("green");
    this.texto("2. Objeto verde desenhado após o desempilhar()", 20, 570, 16);
    this.retangulo(20, 500, 60, 40, Estilo.PREENCHIDO);
  }
}

window.addEventListener("load", () => {
  new ExemploTransformacoes("Conceito de Transformações", "gameCanvas", 60, 800, 600);
});