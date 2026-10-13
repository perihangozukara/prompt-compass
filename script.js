const typeMenu = document.getElementById("type");
// İş türü menüsünü bulur
const detailsBox = document.getElementById("details");
// "3. Details" içindeki boş kutuyu bulur
const message = document.getElementById("message");
// Mesaj paragrafını bulur
const result = document.getElementById("result");
// Sonuç bölümünü bulur
const output = document.getElementById("output");
// Prompt kutusunu bulur
const aiBox = document.getElementById("ai");
// "Hangi AI?" kutusunu bulur

function val(id) {
// Yardımcı görev: id'si verilen kutudaki yazıyı getirir
  return document.getElementById(id).value.trim();
  // .value = kutudaki yazı; 🆕 .trim() baştaki ve sondaki boşlukları siler
}

function showMessage(text, kind) {
// Mesaj yazan görev; kind = "error" ya da "success"
  message.textContent = text;
  // Mesajı yazar
  message.className = kind;
  // Paragrafa CSS sınıfını verir: error = kırmızı, success = yeşil
}

function showDetails() {
// 1. iş: Seçilen türün sorularını ekrana çizer
  const type = RULES.types[typeMenu.value];
  // Menüde seçili türün kurallarını alır (ör. RULES.types.image)
  detailsBox.innerHTML = "";
  // 🆕 Kutuyu boşaltır; önceki türün soruları silinir
  type.details.forEach(function (q) {
  // 🆕 Her soru (q) için aşağıdakini tekrarlar
    detailsBox.innerHTML +=
      '<label for="' + q.id + '">' + q.name + '</label>' +
      '<input id="' + q.id + '" placeholder="' + q.hint + '">';
    // Bir başlık ve bir kutu ekler; id, ad ve örnek yazı kurallardan gelir
  });
}

typeMenu.addEventListener("change", showDetails);
// 🆕 Tür menüsü değişince soruları yeniden çizer
showDetails();
// Sayfa ilk açılınca da bir kez çizer (başta "Image" seçili)

function section(title, text) {
// Bir prompt bölümü hazırlar
  if (text === "") return "";
  // Alan boşsa hiçbir şey eklemez: boş alan prompta girmez
  return "# " + title + "\n" + text + "\n\n";
  // 🆕 "\n" = yeni satır. Sonuç: "# BAŞLIK", alt satırda yazı, sonra boş satır
}

function list(lines) {
// Kural listesini madde satırlarına çevirir
  return lines.map(function (l) { return "- " + l; }).join("\n");
  // 🆕 map her kuralın başına "- " ekler; join hepsini alt alta birleştirir
}

function buildPrompt() {
// 2. ve 3. iş: kontrol eder ve promptu dizer
  if (val("task") === "" || val("goal") === "") {
  // 🆕 || = "ya da": görev ya da amaç boşsa
    showMessage("Task and Goal cannot be empty. Write in one sentence what you want and what it is for.", "error");
    // ✅ UX: anlaşılır hata mesajı (ne oldu + ne yapmalı)
    result.hidden = true;
    // Sonuç bölümünü gizli tutar
    return;
    // Görevi burada bitirir
  }

  const typeName = typeMenu.value;
  // Seçilen tür, ör. "image"
  const type = RULES.types[typeName];
  // O türün kuralları
  const mode = document.getElementById("mode").value;
  // Seçilen çalışma biçimi: "request" ya da "decide"

  let me = "";
  // 🆕 "Durumum" bölümünü burada toplarız
  if (val("level") !== "") me += "Level: " + val("level") + "\n";
  // 🆕 !== = "eşit değil": seviye doluysa ekler
  if (val("have") !== "") me += "What I have: " + val("have") + "\n";
  // Elimde olan doluysa ekler
  me += "Goal: " + val("goal");
  // Amaç zorunlu olduğu için her zaman eklenir

  let details = "";
  // Ayrıntılar bölümünü burada toplarız
  type.details.forEach(function (q) {
  // Türün her sorusu için
    if (val(q.id) !== "") details += q.name + ": " + val(q.id) + "\n";
    // Doldurulmuşsa "Ad: değer" satırı ekler
  });
  if (typeName === "image" && val("words") === "") details += "Text in the image: none\n";
  // Görselde yazı kutusu boşsa "yazı olmasın" ekler (&& = "ve")

  const rules = RULES.modes[mode].concat(RULES.common, type.rules);
  // 🆕 Biçim kuralları + ortak kurallar + türe özel kurallar tek listede

  let prompt = "";
  // Prompt burada parça parça birikir (Aşama 0 şablonunun sırası)
  prompt += section("ABOUT ME", val("intro"));
  // Tanıtım kartı en üstte
  if (val("role") !== "") prompt += section("ROLE", "Work as " + val("role") + ".");
  // Rol doluysa ekler
  prompt += section("MY SITUATION", me);
  // Ben kimim ve durumum
  prompt += section("TASK", val("task"));
  // Görev
  prompt += section("DETAILS", details.trim());
  // Türe özel ayrıntılar
  prompt += section("LIMITS", val("limits"));
  // Sınır
  prompt += section("FORMAT", val("format"));
  // Biçim
  prompt += section("EXAMPLE", val("example"));
  // Örnek
  prompt += section("DO NOT", val("avoid"));
  // İstemediğim
  prompt += section("HOW TO PROCEED", list(rules));
  // Nasıl ilerleyelim: otomatik kurallar
  prompt += section("MATERIAL", val("material"));
  // Malzeme en sonda

  output.value = prompt.trim();
  // Promptu kutuya yazar
  result.hidden = false;
  // Sonuç bölümünü görünür yapar
  aiBox.innerHTML = "<strong>Best AI for this job:</strong> " + type.ai +
    "<br><strong>Also good:</strong> " + type.alt +
    "<br><small>" + RULES.aiNote + " (List checked: " + RULES.checked + ")</small>";
  // "Hangi AI?" kutusunu doldurur: ana öneri, alternatif, uyarı ve tarih
  showMessage("Your prompt is ready. Copy it and paste it into the suggested AI.", "success");
  // ✅ UX: başarı mesajı
}

async function copyPrompt() {
// 4. iş: Kopyala düğmesi
  try {
  // ✅ Dene
    await navigator.clipboard.writeText(output.value);
    // 🆕 Kutudaki yazıyı panoya kopyalar
    showMessage("Copied ✓", "success");
    // Başarı mesajı
  } catch (error) {
  // ✅ Olmazsa
    showMessage("Could not copy. Click in the box, press Ctrl+A, then Ctrl+C.", "error");
    // Anlaşılır hata mesajı ve elle kopyalama yolu
  }
}

function checkAnswer() {
// 4. iş: Cevabı denetle düğmesi
  output.value = RULES.checker;
  // Kutuya Cevap denetçisi promptunu yazar
  aiBox.innerHTML = "<strong>Tip:</strong> Check the answer in a different AI or a new chat. The one who makes it should not be the one who checks it.";
  // Üreten ile kontrol eden farklı olmalı (10.000 saat notu)
  showMessage("Checker prompt ready. Copy it, paste it into the AI and fill in the [brackets].", "success");
  // Ne yapacağını söyleyen mesaj
}

document.getElementById("build").addEventListener("click", buildPrompt);
// "Build prompt" düğmesine basınca promptu oluşturur
document.getElementById("copy").addEventListener("click", copyPrompt);
// "Copy" düğmesine basınca kopyalar
document.getElementById("check").addEventListener("click", checkAnswer);
// "Check the answer" düğmesine basınca denetçi promptunu hazırlar