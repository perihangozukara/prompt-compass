const RULES = {
// 🆕 Bütün kurallarımızı tutan tek nesne; adı RULES
  checked: "October 2026",
  // AI listesinin en son kontrol edildiği tarih

  modes: {
  // Çalışma biçimine göre otomatik eklenen kurallar
    request: [
    // İSTEK biçimi (Aşama 0: Usta istek şablonu)
      "Before you start, ask me up to 3 questions if any information is missing.",
      // Eksik bilgi varsa başlamadan önce en fazla 3 soru sor
      "Write [NOT SURE] next to any information you are not sure about.",
      // Emin olmadığın her bilginin yanına [EMİN DEĞİLİM] yaz
      "When you finish, check your answer against the limits and format above and fix what does not fit."
      // Bitince cevabını sınır ve biçime göre kontrol et, uymayanı düzelt
    ],
    decide: [
    // KARAR biçimi (Aşama 0: Karar ortağı)
      "Do not give me a ready answer.",
      // Hazır cevap verme
      "First ask me questions to understand my situation: one at a time, wait for my answer, up to 5 questions.",
      // Önce durumu anlamak için tek tek soru sor, cevabımı bekle, en fazla 5 soru
      "Then show up to 3 options: what I gain, what I lose, and the first step.",
      // Sonra en fazla 3 seçenek göster: ne kazanırım, ne kaybederim, ilk adım ne
      "Leave the decision to me."
      // Kararı bana bırak
    ]
  },

  common: [
  // Her iki biçimde de eklenen kurallar (Aşama 0: Tanıtım kartı ve Sentez)
    "Do not add information I did not give you.",
    // Benim yazmadığım bilgiyi ekleme
    "If I say 'I do not understand', explain the same thing in simpler words with an example."
    // "Anlamadım" dersem daha basit kelimelerle ve bir örnekle anlat
  ],

  types: {
  // 5 iş türü; her birinde: sorular (details), türe özel kurallar (rules), AI önerisi (ai, alt)
    image: {
    // Görsel
      details: [
      // Görselin soruları; name = başlık ve prompttaki ad, hint = soluk örnek yazı
        { id: "subject", name: "Subject", hint: "e.g. a sleeping cat on a windowsill" },
        // Konu: görselde ne var?
        { id: "style", name: "Style", hint: "e.g. photo, watercolor, drawing, 3D" },
        // Stil
        { id: "colors", name: "Colors", hint: "e.g. soft pastel blue and pink" },
        // Renkler
        { id: "light", name: "Setting and light", hint: "e.g. night, dim, daylight" },
        // Ortam ve ışık
        { id: "ratio", name: "Aspect ratio", hint: "1:1 square, 16:9 wide, 9:16 tall" },
        // Oran
        { id: "words", name: "Text in the image", hint: "Leave empty for no text" }
        // Görselde yazı; boş bırakılırsa yazı olmaz
      ],
      rules: [],
      // Görsele özel ek kural yok (boş dizi)
      ai: "ChatGPT (GPT Image 2)",
      // Ana öneri
      alt: "Gemini (free option) · Ideogram (for text in the image)"
      // Alternatif öneriler
    },

    text: {
    // Metin
      details: [
        { id: "kind", name: "Text type", hint: "e.g. email, social media post, blog post" },
        // Metin türü
        { id: "audience", name: "Who is it for?", hint: "e.g. my customers, my manager" },
        // Kime yazılıyor
        { id: "tone", name: "Tone", hint: "e.g. formal, friendly, funny" },
        // Ton
        { id: "message", name: "Main message", hint: "The one thing the reader should remember" }
        // Ana mesaj
      ],
      rules: [],
      // Metne özel ek kural yok
      ai: "Claude",
      // Ana öneri
      alt: "ChatGPT"
      // Alternatif
    },

    video: {
    // Video (kısa klip)
      details: [
        { id: "scene", name: "Scene", hint: "What happens?" },
        // Sahne: ne oluyor?
        { id: "camera", name: "Camera", hint: "e.g. still, moving closer, turning around" },
        // Kamera hareketi
        { id: "vstyle", name: "Style", hint: "e.g. realistic, cartoon, cinematic" },
        // Stil (id'si görseldeki "style" ile karışmasın diye "vstyle")
        { id: "length", name: "Length and ratio", hint: "e.g. 8 seconds, vertical 9:16" }
        // Süre ve oran
      ],
      rules: [],
      // Videoya özel ek kural yok
      ai: "Google Veo 3.1 (Gemini app or Flow)",
      // Ana öneri
      alt: "Kling 3.0 (good value, free credits)"
      // Alternatif
    },

    code: {
    // Kod / web sayfası
      details: [
        { id: "purpose", name: "What should it do?", hint: "e.g. a page that lists my recipes" },
        // Ne yapacak
        { id: "users", name: "Who will use it?", hint: "e.g. only me, my customers" },
        // Kim kullanacak
        { id: "features", name: "Features", hint: "List them, separated by commas" },
        // Özellikler
        { id: "language", name: "Language or tool", hint: "Leave empty: let the AI choose" },
        // Dil ya da araç
        { id: "comments", name: "Comments in the code?", hint: "yes / no" }
        // Kod açıklamalı olsun mu
      ],
      rules: [
      // Koda özel kurallar (Aşama 0: Sentez ve Cevap denetçisi)
        "Give at most 3 steps at a time; continue when I say 'continue'.",
        // Tek seferde en fazla 3 adım ver; "devam" deyince sürdür
        "For each step, tell me what I should see on the screen when I run it.",
        // Her adımda çalıştırınca ekranda ne görmem gerektiğini yaz
        "Warn me before any step that deletes, changes or downloads something on my computer, and explain what it does.",
        // Bilgisayarımda silen, değiştiren ya da indiren adımı önceden uyar ve açıkla
        "Program menus can be in different places in different versions; mention this.",
        // Program menülerinin yeri sürüme göre değişebilir, bunu belirt
        "If I did not name a language or tool, choose one and tell me why."
        // Dil ya da araç yazmadıysam sen seç ve nedenini söyle
      ],
      ai: "Claude",
      // Ana öneri
      alt: "ChatGPT"
      // Alternatif
    },

    research: {
    // Araştırma / özet
      details: [
        { id: "question", name: "Question or topic", hint: "e.g. How does sleep affect memory?" },
        // Soru ya da konu
        { id: "recency", name: "How recent?", hint: "e.g. last month, last year, any time" },
        // Ne kadar güncel
        { id: "sources", name: "Preferred sources", hint: "e.g. official sites, scientific papers, any" }
        // Kaynak tercihi
      ],
      rules: [
      // Araştırmaya özel kurallar (halüsinasyon önlemi, Cevap denetçisi)
        "Show the source of every piece of information.",
        // Her bilginin kaynağını göster
        "Do not write information you cannot find a source for.",
        // Kaynak bulamadığın bilgiyi yazma
        "Mark current information, numbers, dates and names separately; these are most often wrong."
        // Güncel bilgi, sayı, tarih ve isimleri ayrıca işaretle; en çok bunlar yanlış çıkar
      ],
      ai: "Perplexity (finding sources)",
      // Ana öneri
      alt: "Claude (summarizing your own document)"
      // Alternatif
    }
  },

  aiNote: "Tools, features and prices change often. Before you use one, check the price, whether you need an account, and where it keeps your information. Start with a free 15-minute test.",
  // "Hangi AI?" kutusunun altındaki uyarı (Aşama 0: Araç değerlendirici)

  checker: `Below is an answer an AI gave me. I want to check it before I use it. Do not defend the answer; check it.
1. Write each claim on its own line.
2. Label each claim: current info / number, date or name / program menu or step / code / general info.
3. For each claim, write the risk of being wrong: low, medium or high, with one sentence why.
4. For medium and high risk claims, tell me how I can check them.
5. If you cannot verify a claim, write "I cannot verify"; do not guess.
Give the result as a table: Claim | Type | Risk | How to check.
At the end, write one sentence: can I use this answer as it is?

My question: [what you asked the AI]
The answer: [paste the answer here]`
  // 🆕 Ters tırnakla yazılmış çok satırlı metin: Cevap denetçisi promptu (Aşama 0, 2. prompt)
};
// RULES nesnesi biter