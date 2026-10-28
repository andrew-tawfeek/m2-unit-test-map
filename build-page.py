from pathlib import Path
import json,re
p=Path(__file__).parent;meta=json.loads((p/'map-meta.json').read_text())
s=(p/'map-page.html').read_text().replace('__SVG__',(p/'map.svg').read_text()).replace('__DATA__',(p/'rendered-data.json').read_text().replace('</','<\\/')).replace('__WIDTH__',str(meta['width'])).replace('__HEIGHT__',str(meta['height']))
(p/'index.html').write_text(s)
(p/'check.js').write_text(re.findall(r'<script>(.*?)</script>',s,re.S)[-1])
print('Built',p/'index.html')
