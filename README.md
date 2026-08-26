# 🎮 JS_CG_2D_API

Uma biblioteca JavaScript didática, leve e intuitiva desenvolvida para simplificar o ensino de **Computação Gráfica 2D**, **desenvolvimento de jogos** e **simulação física básica** com HTML5 Canvas.

---

## 🔗 Links Úteis e Documentação

- 📄 **Documentação Oficial:** [Baixar/Visualizar Manual em PDF](./JS_CG_2D_API.pdf)
- 🌐 **Exemplos de Demonstração:** [Acessar Galeria de Exemplos](https://rissetti.github.io/JS_CG_2D_API/)

---

## 🚀 Recursos Principais

- **🎮 Game Loop & Tempo Delta (`dt`):** Controle automático de FPS e física baseada em delta time (`dt`), garantindo a mesma velocidade de jogo em qualquer monitor (60Hz, 144Hz, etc.).
- **🧩 Colisão AABB Inteligente:** Resolução de colisão nos 4 lados das plataformas (topo, teto e paredes laterais) com suporte a múltiplos formatos de objetos.
- **⌨️ Gerenciamento de Entradas:** Captura simples de teclado e mouse com bloqueio automático de rolagem da página (*prevent scroll*) ao usar setas e espaço e bloqueio de menu de contexto (botão direito do mouse) dentro do canvas.
- **🎨 Renderização 2D Simplificada:** Métodos diretos para desenhar retângulos, círculos, linhas, pontos, polígonos, imagens e textos no Canvas HTML5.
- **🔄 Transformações Geométricas:** Manipulação declarativa de matrizes com `empilhar()`, `desempilhar()`, `transladar()` e `rotacionar()`.
- **🔊 Sistema de Áudio (`EfeitosSonoros`):** Pré-carregamento e reprodução contínua de sons com suporte a sobreposição de canais sem travar o jogo.
- **📦 Zero Dependências:** 100% JavaScript.
  
---

## 📦 Como Usar no seu Projeto

### Faça Download de **[js_cg_2d_api.js](./api/js_cg_2d_api.js)** para a raiz do seu projeto e importe no HTML:
```html
<script src="js_cg_2d_api.js"></script>
```

### Dentro de `<body>` crie um elemento `<canvas>`, criando um ID para o mesmo. Esse ID deve ser passado ao construtor da API, no arquivo do Jogo (`jogo.js`).
```html
<canvas id="gameCanvas"></canvas>
```

### Crie um arquivo para o Jogo (`jogo.js`), criando uma classe que estenda a classe JS_CG_2D_API, sobrescrevendo os métodos necessários e codificando os métodos de atualização e desenho.

### Dentro do arquivo `jogo.js`, instancie sua classe (Jogo) passando o ID do `<canvas>`:
```javascript
window.addEventListener("load", () => {
    new Jogo("Jogo", "gameCanvas", 60, 800, 600);
});
```
---

### Para melhor compreensão da API, analise os códigos dos [exemplos](https://rissetti.github.io/JS_CG_2D_API/) disponibilizados! 

## 📄 Licença

Este projeto é distribuído sob a Licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).
