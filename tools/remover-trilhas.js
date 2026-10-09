// Remove a seção "Trilhas Universo Uniarp" e os links que apontam para ela.
const fs = require('fs');
const file = process.argv[2];
const lines = fs.readFileSync(file, 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('<section id="trilhas"'));
if (start < 0) throw new Error('Seção #trilhas não encontrada');
let end = -1;
for (let i = start + 1; i < lines.length; i++) {
  if (lines[i].includes('<section')) throw new Error('Seção aninhada inesperada');
  if (lines[i].includes('</section>')) { end = i; break; }
}
if (end < 0) throw new Error('Fim da seção não encontrado');
// remove também a linha em branco logo depois da seção
if (lines[end + 1] !== undefined && lines[end + 1].trim() === '') end++;
let out = lines.slice(0, start).concat(lines.slice(end + 1));
const before = out.length;
out = out.filter(l => !l.includes('href="#trilhas"'));
if (before - out.length !== 3) throw new Error('Esperava remover 3 links, removi ' + (before - out.length));
const html = out.join('\n');
if (/trilha/i.test(html)) throw new Error('Ainda há menção a trilhas');
fs.writeFileSync(file, html);
console.log('Removidas', lines.length - out.length, 'linhas');
