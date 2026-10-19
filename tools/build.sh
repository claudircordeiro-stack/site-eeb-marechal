#!/usr/bin/env bash
# Monta a versão publicada do site:
#  - index.html e as fotos novas (img/palestra-*, img/leitura-2026-*, img/dia-crianca-2026-*, img/dia-professor-2026-*, img/gincana-cores-2026-*) vêm deste repositório;
#  - os demais arquivos vêm da versão no ar, conferidos um a um pelo SHA-1.
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
cp index.html "$OUT/index.html"
cp img/palestra-*.jpg img/leitura-2026-*.jpg img/dia-crianca-2026-*.jpg img/dia-professor-2026-*.jpg img/gincana-cores-2026-*.jpg "$OUT/img/"
echo "Build ok"
