#!/bin/bash

odir="./rendered"
# convert all
if [[ $# -ne 1 ]]; then
  for f in *.md; do
    fname="${f%%.*}"
    echo "Converting $fname"
    npx @marp-team/marp-cli@latest --theme rose-pine.css $f --allow-local-files --pdf -o $odir/$fname.pdf
    npx @marp-team/marp-cli@latest --theme rose-pine.css $f --allow-local-files -o $odir/$fname.html
  done
else
  f=$1
  fname="${f%%.*}"
  echo "Converting $fname"
  npx @marp-team/marp-cli@latest --theme rose-pine.css $f --allow-local-files --pdf -o $odir/$fname.pdf
  npx @marp-team/marp-cli@latest --theme rose-pine.css $f --allow-local-files -o $odir/$fname.html
fi