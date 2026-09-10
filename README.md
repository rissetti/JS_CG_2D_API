# 🎮 JS_CG_2D_API

Uma biblioteca JavaScript didática, leve e intuitiva desenvolvida para simplificar o ensino de **Computação Gráfica 2D**, **desenvolvimento de jogos** e **simulação física básica** com HTML5 Canvas.

---

## 🔗 Links Úteis e Documentação

- 📄 **Documentação Oficial:** [Baixar/Visualizar Manual em PDF](./JS_CG_2D_API.pdf)
- 🌐 **Exemplos de Demonstração:** [Acessar Galeria de Exemplos](https://rissetti.github.io/JS_CG_2D_API/)

---

## 🚀 Recursos Principais

- **🎮 Game Loop & Tempo Delta (`dt`):** Controle automático de FPS e física baseada em delta time (`dt`), garantindo a mesma velocidade de jogo em qualquer monitor (60Hz, 144Hz, etc.). Arquitetura orientada a ciclo de vida com métodos bem delimitados (acaoAoIniciar, atualizar(dt) e desenhar) para separação total entre lógica de jogo e renderização.
- **🧩 Colisão AABB Inteligente:** Algoritmo de Axis-Aligned Bounding Box (**colisao(a, b)**) otimizado para verificação rápida entre objetos com propriedades de posição (x, y) e dimensão (largura, altura). Suporte à resolução de colisões direcionais (topo, teto e laterais), essencial para jogos de plataforma, cálculo de rebotes e impedimento de interpenetração de sólidos
- **⌨️ Gerenciamento de Entradas & Controles Mobile:** Mapeamento simplificado de eventos de teclado (teclaPressionada, teclaLiberada), clique e arraste do mouse. Bloqueio automático de comportamentos padrão do navegador, impedindo a rolagem indesejada da página ao usar Espaço/Setas e desativando o menu de contexto (botão direito) sobre o Canvas. Sistema integrado de Botões Touch Virtuais (criarBotaoTouch, getBotaoTouch), permitindo injetar controles visuais na tela vinculados a teclas do teclado com customização de cores, opacidade e tamanho de fonte.
- **🎨 Renderização 2D Simplificada:** Métodos diretos para desenhar retângulos, círculos, linhas, pontos, polígonos, imagens e textos no Canvas HTML5. Controle simplificado do pipeline de renderização por meio de enums de estilo (Estilo.PREENCHIDO, Estilo.PONTOS e Estilo.CONTORNO) e helpers de estilo (preenchimento(), contorno()).
- **🔄 Transformações Geométricas:** Manipulação declarativa de matrizes com `empilhar()`, `desempilhar()`, `transladar()` e `rotacionar()`.
- **🔊 Sistema de Áudio (`EfeitosSonoros`):** Pré-carregamento e reprodução contínua de sons com suporte a sobreposição de canais sem travar o jogo.
- **📦 Zero Dependências:** 100% JavaScript.    

---

## 📦 Como Usar no seu Projeto

### Faça Download de **[js_cg_2d_api.js](./api/js_cg_2d_api.js)** para a raiz do seu projeto e importe no HTML:
```html
<!-- Estrutura básica HTML (index.html) -->
<!DOCTYPE html>
<meta charset="UTF-8">
<script src="js_cg_2d_api.js"></script>
<script src="jogo.js"></script>

```

### Crie um arquivo para o Jogo (`jogo.js`), criando uma classe que estenda a classe JS_CG_2D_API, sobrescrevendo os métodos necessários e codificando os métodos de atualização e desenho.
```javascript
class Jogo extends JS_CG_2D_API {
  acaoAoIniciar() {
    // Inicialização de variáveis
    this.px = 0;
    ...            
  }

  atualizar() {
    // Lógica e física do jogo
    this.px++;
    ...
  }

  desenhar() {
    // Fundo    
    this.limparTela("white");
    ....
  }
}
```

### No final do arquivo `jogo.js`, instancie sua classe (Jogo) passando um `ID` para o `<canvas>` que será usado pela API:
```javascript
window.addEventListener("load", () => {
    new Jogo("Jogo", "gameCanvas", 800, 600);
});
```
---

### Para melhor compreensão da API, analise os códigos dos [exemplos](https://rissetti.github.io/JS_CG_2D_API/) disponibilizados! 

## 📄 Licença

Este projeto é distribuído sob a Licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).
