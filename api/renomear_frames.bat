@echo off
setlocal enabledelayedexpansion

echo ======================================================
echo  PADRONIZADOR DE NOMES DE SPRITES PARA A JS_CG_2D_API
echo ======================================================
echo.
echo INSTRUCOES DE USO:
echo 1. Coloque este arquivo dentro da pasta do Sprite.
echo    Exemplo: imagens/player/
echo 2. O script vai converter qualquer imagem (.png, .jpg, .jpeg)
echo    para o padrao exigido pela API: nomeBase_1.png, nomeBase_2.png...
echo.

set /p "NOME_BASE=Digite o nome base da animacao (ex: player): "

echo.
echo [1/2] Isolando arquivos de imagem...

:: Passo 1: Renomeia todas as imagens para nomes temporarios isolados
set /a TEMP_COUNT=1
for /f "delims=" %%F in ('dir /b *.png *.jpg *.jpeg 2^>nul') do (
    ren "%%F" "temp_frame_!TEMP_COUNT!.tmp"
    set /a TEMP_COUNT+=1
)

echo [2/2] Gerando sequencia a partir do 1...

:: Passo 2: Renomeia os temporarios para o padrao oficial da API
set /a CONTADOR=1
for /f "delims=" %%F in ('dir /b temp_frame_*.tmp 2^>nul') do (
    ren "%%F" "!NOME_BASE!_!CONTADOR!.png"
    set /a CONTADOR+=1
)

set /a TOTAL=!CONTADOR!-1

if %TOTAL% LEQ 0 goto NENHUM_ARQUIVO

echo.
echo ===================================================
echo Concluido! %TOTAL% frames gerados do 1 ao %TOTAL%.
echo.
echo Como carregar no seu jogo (JS_CG_2D_API):
echo this.carregarFrames("%NOME_BASE%", %TOTAL%);
echo ===================================================
goto FIM

:NENHUM_ARQUIVO
echo.
echo Nenhuma imagem (.png, .jpg, .jpeg) foi encontrada nesta pasta.

:FIM
echo.
pause