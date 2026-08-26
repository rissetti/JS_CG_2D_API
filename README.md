# 🎮 JS_CG_2D_API

Uma biblioteca JavaScript didática, leve e intuitiva desenvolvida para simplificar o ensino de **Computação Gráfica 2D**, **desenvolvimento de jogos** e **simulação física básica** com HTML5 Canvas.

---

## 🔗 Links Úteis e Documentação

- 📄 **Documentação Oficial (PDF):** [Baixar/Visualizar Manual em PDF (JS_CG_2D_API.pdf)](./JS_CG_2D_API.pdf)
- 🌐 **Demonstração ao Vivo (GitHub Pages):** [Acessar Galeria de Exemplos no Navegador](https://rissetti.github.io/JS_CG_2D_API/)

---

## 🚀 Recursos Principais

- **Game Loop Robusto:** Suporte nativo a tempo delta (`dt`) para movimentação independente do hardware e trava de limite superior de FPS.
- **Detecção de Colisão Polimórfica (AABB):** Sistema inteligente para extração de limites físicos de plataformas e objetos, utilizando operadores modernos (`?.` e `??`).
- **Gerenciamento de Entradas Integrado:** Captura simplificada de teclado e mouse com bloqueio automático de rolagem da página (*prevent scroll* nas setas e espaço).
- **Módulo de Áudio (`EfeitosSonoros`):** Gerenciamento e execução contínua de áudios sem travamentos na renderização.
- **Transformações Geométricas:** Manipulação declarativa de matrizes de transformação com histórico (`empilhar` / `desempilhar`, `transladar`, `rotacionar`).

---

## 📦 Como Usar no seu Projeto

### Faça Download de **[js_cg_2d_api.js](./api/js_cg_2d_api.js)** para a raiz do seu projeto e importe no HTML:
```html
<script src="js_cg_2d_api.js"></script>
```

### Para melhor compreensão, analise os códigos dos [exemplos](https://rissetti.github.io/JS_CG_2D_API/) disponibilizados! 

## 📄 Licença

Este projeto é distribuído sob a Licença MIT. Para mais detalhes, consulte o arquivo LICENSE.
