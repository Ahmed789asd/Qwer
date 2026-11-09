/*CMD
  command: /save_country
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let countryCode = params;

if (!countryCode) {
  Bot.runCommand("the_job");
  return;
}

let countriesMap = {
  "US": "🇺🇸 الولايات المتحدة الأمريكية",
  "UK": "🇬🇧 المملكة المتحدة",
  "SA": "🇸🇦 المملكة العربية السعودية",
  "UAE": "🇦🇪 الإمارات العربية المتحدة",
  "Japan": "🇯🇵 اليابان",
  "Korea": "🇰🇷 كوريا الجنوبية",
  "Taiwan": "🇹🇼 تايوان",
  "HK": "🇭🇰 هونغ كونغ",
  "India": "🇮🇳 الهند",
  "Indonesia": "🇮🇩 إندونيسيا",
  "Germany": "🇩🇪 ألمانيا",
  "France": "🇫🇷 فرنسا",
  "Spain": "🇪🇸 إسبانيا",
  "Italy": "🇮🇹 إيطاليا",
  "Australia": "🇦🇺 أستراليا",
  "NZ": "🇳🇿 نيوزيلندا",
  "Mexico": "🇲🇽 المكسيك",
  "Brazil": "🇧🇷 البرازيل",
  "Chile": "🇨🇱 تشيلي",
  "SAFTY": "🇿🇦 جنوب إفريقيا",
  "Ireland": "🇮🇪 أيرلندا",
  "Netherlands": "🇳🇱 هولندا",
  "Switzerland": "🇨🇭 سويسرا",
  "Austria": "🇦🇹 النمسا",
  "Belgium": "🇧🇪 بلجيكا",
  "Portugal": "🇵🇹 البرتغال",
  "Poland": "🇵🇱 بولندا",
  "Czech": "🇨🇿 جمهورية التشيك",
  "Norway": "🇳🇴 النرويج",
  "Finland": "🇫🇮 فنلندا",
  "Denmark": "🇩🇰 الدنمارك",
  "Sweden": "🇸🇪 السويد",
  "Greece": "🇬🇷 اليونان"
};

let selectedCountry = countriesMap[countryCode] || countryCode;

// حفظ الاختيار في ذاكرة المستخدم بالأسلوب النظيف
User.setProperty("selected_country", selectedCountry, "string");

// الأزرار الجديدة (بدل زر الرجوع، حطينا زر إلغاء بينفذ أمر الإلغاء أو تعديل الرسالة)
let buttons = [
  [{ text: "☈ اختيار سريع للحساب", callback_data: "/fast_select" }],
  [{ text: "𓍝 كيف يعمل التحقق؟", callback_data: "/how_it_works" }],
  [{ text: "✖ إلغاء", callback_data: "/cancel" }]
];

let textMsg = "❍ الدولة المختارة: " + selectedCountry + "\n\n" +
              "✎ᝰ. أرسل بيانات الحساب الآن:\n\n" +
              "<code>email---password</code>\n\n" +
              " أو أرسل البريد الإلكتروني أولاً، ثم كلمة المرور في رسالة أخرى.";

let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "HTML"
  });
} else {
  Api.sendMessage({
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "HTML"
  });
}

