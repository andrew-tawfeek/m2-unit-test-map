const fs=require('fs');
const katex=require('./vendor/katex/dist/katex.js');
const data=JSON.parse(fs.readFileSync(__dirname+'/described-data.json','utf8'));
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let tests=0,expressions=0;
for(const d of data)for(const t of d.tests){
 if(d.name==='ARingRRiTest.cpp'&&t.suite==='ARingRRi'&&t.name==='subtract')t.description='Checks enclosure after interval subtraction, \\(I\\subseteq(I-J)+J\\), and a zero midpoint for the tested product-subtraction enclosure.';
 let last=0,html='';
 for(const match of t.description.matchAll(/\\\(([\s\S]*?)\\\)/g)){
   html+=escape(t.description.slice(last,match.index));
   html+=katex.renderToString(match[1],{throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'});
   last=match.index+match[0].length;expressions++;
 }
 html+=escape(t.description.slice(last));
 if(html.includes('\\(')||html.includes('\\)'))throw Error('Unmatched math delimiter: '+d.name+' '+t.name);
 t.descriptionHtml=html;tests++;
}
fs.writeFileSync(__dirname+'/rendered-data.json',JSON.stringify(data));
console.log(`Rendered ${expressions} LaTeX expressions across ${tests} descriptions without errors.`);
