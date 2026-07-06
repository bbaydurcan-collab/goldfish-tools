setTimeout(()=>document.getElementById('loader').classList.add('hide'),900);

function v(id){return Math.max(0, parseFloat(document.getElementById(id).value) || 0)}
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
  show('waterResult',`💦 Haftalık değişim: <b>${a.toFixed(0)} L</b>`);
}
function flowCalc(){
  const a=v('flowLiter')*parseFloat(document.getElementById('turnover').value);
  show('flowResult',`🌊 Önerilen filtre debisi: <b>${a.toFixed(0)} L/saat</b>`);
}
function doseCalc(){
  const a=v('doseLiter')/100*parseFloat(document.getElementById('doseProduct').value);
  show('doseResult',`🧪 Tavsiye edilen doz: <b>${a.toFixed(1)} ml</b><br>Etiket talimatını ayrıca kontrol edin.`);
}
function capCalc(){
  const f=Math.floor(v('capLiter')/parseFloat(document.getElementById('capSize').value));
  show('capResult',`🐠 Tavsiye edilen maksimum: <b>${f} oranda</b><br>📌 Filtre, su değişimi ve balık boyuna göre değişebilir.`);
}
function heaterCalc(){
  const w=v('heaterLiter')*parseFloat(document.getElementById('heaterLevel').value);
  show('heaterResult',`🔥 Önerilen ısıtıcı: <b>${Math.ceil(w/25)*25} W</b>`);
}
function smartAdvice(){
  const liter=v('smartLiter'), fish=v('smartFish'), issue=document.getElementById('smartIssue').value;
  let text=`📊 Akvaryum: <b>${liter} L</b><br>🐟 Balık sayısı: <b>${fish}</b><br>`;
  if(issue==="normal") text += "✅ Düzenli bakım: Haftalık %25-30 su değişimi ve kontrollü yemleme.";
  if(issue==="cloudy") text += "⚠️ Su bulanıklığı için: %30 su değişimi, yemlemeyi azaltma ve filtre kontrolü önerilir.";
  if(issue==="nitrite") text += "🚨 Nitrit/amonyak şüphesinde: Bugün %40 su değişimi, yemlemeyi azaltma ve su değerlerini test etme önerilir.";
  if(issue==="new") text += "🆕 Yeni kurulumda: Bakteri kültürü desteği, sabırlı balık ekleme ve düzenli test önerilir.";
  show('smartResult', text);
}
