const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const root = process.argv[2];
const talen = {
  engels:    ['🇬🇧', '#2f93ee', '#6c4cf5'],
  spaans:    ['🇪🇸', '#ffb800', '#ff4f8b'],
  duits:     ['🇩🇪', '#ff8a1f', '#ef5a4f'],
  frans:     ['🇫🇷', '#7a5cff', '#2f93ee'],
  oekraiens: ['🇺🇦', '#3fae4f', '#2f93ee'],
};
const html = (size, radius, emoji, v, a, b) => `<html><body style="margin:0;background:transparent">
<div style="width:${size}px;height:${size}px;border-radius:${radius}px;background:linear-gradient(135deg,${a} 0%,${b} 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
<div style="position:absolute;width:${size*0.9}px;height:${size*0.9}px;border-radius:50%;background:rgba(255,255,255,.2);top:-${size*0.35}px;left:-${size*0.25}px"></div>
<div style="font-size:${emoji}px;line-height:1;filter:drop-shadow(0 ${size*0.02}px ${size*0.03}px rgba(40,20,80,.35))">${v}</div></div></body></html>`;
const jobs = [['icon-192.png',192,44,118,true],['icon-512.png',512,118,316,true],['icon-maskable-512.png',512,0,250,false],['apple-touch-icon.png',180,0,112,false]];
(async () => {
  const b = await chromium.launch();
  for (const [id, [vlag, a, c]] of Object.entries(talen)) {
    for (const [naam, size, radius, emoji, transp] of jobs) {
      const p = await b.newPage({ viewport: { width: size, height: size } });
      await p.setContent(html(size, radius, emoji, vlag, a, c));
      await p.screenshot({ path: `${root}/${id}/icons/${naam}`, omitBackground: transp });
      await p.close();
    }
  }
  await b.close();
})();
