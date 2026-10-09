#!/usr/bin/env bash
# Monta a versão publicada do site a partir da versão no ar (17/09/2026),
# conferindo cada arquivo pelo SHA-1, e aplica a remoção da seção "Trilhas".
set -euo pipefail
BASE="https://www.eebmarechal.com.br"
OUT="public"
rm -rf "$OUT"; mkdir -p "$OUT/img"
while read -r sha path; do
  [ -z "$sha" ] && continue
  curl -fsSL --retry 3 -o "$OUT/$path" "$BASE/$path"
  got=$(sha1sum "$OUT/$path" | cut -d' ' -f1)
  if [ "$got" != "$sha" ]; then echo "ERRO: $path diferente do esperado ($got)"; exit 1; fi
done < tools/files.txt
node tools/remover-trilhas.js "$OUT/index.html"
echo "Build ok"
