setTimeout(()=>document.getElementById('loader').classList.add('hide'),900);

function v(id){return Math.max(0, parseFloat(document.getElementById(id).value) || 0)}
function checked(id){return document.getElementById(id).checked}
function show(id, html){
  const e=document.getElementById(id);
  e.innerHTML=html+`<div class="result-actions">
    <button class="smallbtn whatsapp" onclick="shareWhatsApp('${id}')">WhatsApp'ta Paylaş</button>
    <button class="smallbtn" onclick="window.print()">PDF / Yazdır</button>
  </div>`;
  e.style.display='block';
}
function cleanText(id){return document.getElementById(id).innerText.replace("WhatsApp'ta Paylaş","").replace("PDF / Yazdır","").trim()}
function shareWhatsApp(id){
  const text=encodeURIComponent("Gold Fish Oranda Ankara Hesaplama Sonucu:\n"+cleanText(id)+"\nhttps://hesap.goldfishoranda.com");
  window.open("https://wa.me/?text="+text,"_blank");
}
function filterCards(){
  const q=document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.searchable').forEach(c=>{
    c.style.display = c.dataset.name.includes(q) || c.innerText.toLowerCase().includes(q) ? 'block' : 'none';
  });
}

function fishDoctor(){
  const liter=v('diagLiter') || 100;
  const fish=v('diagFish') || 1;
  const waterAge=document.getElementById('diagWaterAge').value;
  const tankAge=document.getElementById('diagTankAge').value;

  let score=0;
  let reasons=[];
  let actions=[];
  let products=[];
  let feeding=[];
  let waterChange=25;

  if(checked('sBottom')){score+=2; reasons.push('Stres, zayıf su kalitesi, oksijen düşüklüğü veya hastalık başlangıcı');}
  if(checked('sNoEat')){score+=2; reasons.push('Stres, yeni ortam, su değerleri bozukluğu veya parazit/bakteriyel baskı'); feeding.push('24 saat çok az yem veya yemlemeye ara ver; sonra küçük porsiyon Gold Fish Bait ile başla.');}
  if(checked('sWhite')){score+=4; reasons.push('Beyaz benek / dış parazit ihtimali'); actions.push('Isı dalgalanmasını durdur, yeni balık ekleme, ekipman paylaşma.');}
  if(checked('sGill')){score+=3; reasons.push('Amonyak/nitrit, oksijen yetersizliği veya solungaç iritasyonu ihtimali'); waterChange=Math.max(waterChange,40); actions.push('Havalandırmayı artır, filtre çıkışını su yüzeyine yönlendir.');}
  if(checked('sCloudy')){score+=2; reasons.push('Bakteri patlaması, fazla yemleme veya filtre yetersizliği'); waterChange=Math.max(waterChange,30); products.push('Easy-Life Filter Medium');}
  if(waterAge==='old'){score+=2; waterChange=Math.max(waterChange,40); actions.push('Biriken organik yük için dip çekimi yap.');}
  if(tankAge==='new'){score+=2; products.push('Easy-Life EasyStart'); products.push('Easy-Life AquaMaker'); reasons.push('Yeni kurulumda biyolojik döngü tam oturmamış olabilir');}
  if(tankAge==='crowded'){score+=2; waterChange=Math.max(waterChange,40); reasons.push('Yoğun balık yükü nedeniyle amonyak/nitrit riski');}
  if(!feeding.length) feeding.push('Balıklar aktifse az ve kontrollü Gold Fish Bait ver; yemi 1-2 dakika içinde bitirmeliler.');

  products.push('Easy-Life AquaMaker');
  products=[...new Set(products)];
  reasons=[...new Set(reasons)];
  if(!reasons.length) reasons.push('Belirti seçilmedi; rutin bakım ve gözlem önerilir.');

  actions.unshift(`Bugün yaklaşık %${waterChange} su değişimi yap: ${Math.round(liter*waterChange/100)} litre.`);
  actions.push('Suyu klordan arındır, sıcaklık farkını düşük tut.');
  actions.push('Amonyak, nitrit ve nitrat testi varsa ölçüm yap.');
  actions=[...new Set(actions)];

  let riskClass='risk-low', riskText='Düşük Risk';
  if(score>=4){riskClass='risk-mid'; riskText='Orta Risk';}
  if(score>=7){riskClass='risk-high'; riskText='Yüksek Risk';}

  const html=`
    <span class="doctor-score ${riskClass}">${riskText}</span>
    <h3>🐟 Ön Değerlendirme</h3>
    <p><b>Akvaryum:</b> ${liter} L • <b>Balık:</b> ${fish} adet</p>
    <h4>Olası nedenler</h4>
    <ul class="plan-list">${reasons.map(x=>`<li>${x}</li>`).join('')}</ul>
    <h4>Bugün yapılacaklar</h4>
    <ul class="plan-list">${actions.map(x=>`<li>${x}</li>`).join('')}</ul>
    <div class="product-note"><b>Easy-Life önerisi:</b><br>${products.join(' + ')}</div>
    <div class="product-note"><b>Gold Fish Bait yemleme:</b><br>${feeding.join(' ')}</div>
    <p class="medical-note">Bu bir kesin teşhis değildir. Belirtiler ağırsa profesyonel destek alın.</p>
  `;
  const e=document.getElementById('doctorResult');
  e.innerHTML=html+`<div class="result-actions">
    <button class="smallbtn whatsapp" onclick="shareDoctor()">WhatsApp'ta Paylaş</button>
    <button class="smallbtn" onclick="window.print()">PDF / Yazdır</button>
  </div>`;
}
function shareDoctor(){
  const text=encodeURIComponent("Balığıma Ne Oldu? Ön Bakım Planı:\n"+document.getElementById('doctorResult').innerText+"\nhttps://hesap.goldfishoranda.com");
  window.open("https://wa.me/?text="+text,"_blank");
}

function feedCalc(){
  const d=v('fishCount')*parseFloat(document.getElementById('fishSize').value);
  const m=v('meals')||1;
  show('feedResult',`🐟 Günlük toplam yem: <b>${d.toFixed(2)} g</b><br>🍽️ Öğün başı: <b>${(d/m).toFixed(2)} g</b><br>✅ Gold Fish Bait %56 Protein önerilir.`);
}
function volumeCalc(){
  const gross=v('l')*v('w')*v('h')/1000;
  show('volumeResult',`📏 Brüt hacim: <b>${gross.toFixed(0)} L</b><br>💧 Yaklaşık net su: <b>${(gross*.85).toFixed(0)} L</b><br>🌊 Önerilen filtre debisi: <b>${(gross*.85*7).toFixed(0)} L/saat</b>`);
}
function saltCalc(){
  const a=v('saltLiter')*parseFloat(document.getElementById('saltDose').value);
  show('saltResult',`🧂 Toplam tuz: <b>${a.toFixed(0)} g</b>`);
}
function waterCalc(){
  const a=v('waterLiter')*parseFloat(document.getElementById('waterRate').value);
  show('waterResult',`💦 Haftalık su değişimi: <b>${a.toFixed(0)} L</b>`);
}
function flowCalc(){
  const a=v('flowLiter')*parseFloat(document.getElementById('turnover').value);
  show('flowResult',`🌊 Önerilen filtre debisi: <b>${a.toFixed(0)} L/saat</b>`);
}
function doseCalc(){
  const a=v('doseLiter')/100*parseFloat(document.getElementById('doseProduct').value);
  show('doseResult',`🧪 Tavsiye edilen doz: <b>${a.toFixed(1)} ml</b><br>Etiket talimatını ayrıca kontrol edin.`);
}
