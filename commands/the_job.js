/*CMD
  command: the_job
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: تفعيل نقاط التشغيل ☄︎
  group: 
CMD*/

// جلب رصيد الـ point للمستخدم الحالي باستخدام النظام بتاعنا
let pts = Libs.ResourcesLib.userRes("point");

let buttons = [
  [
    { text: "🇺🇸 أمريكا", callback_data: "/save_country US" },
    { text: "🇬🇧 بريطانيا", callback_data: "/save_country UK" }
  ],
  [
    { text: "🇸🇦 السعودية", callback_data: "/save_country SA" },
    { text: "🇦🇪 الإمارات", callback_data: "/save_country UAE" }
  ],
  [
    { text: "🇯🇵 اليابان", callback_data: "/save_country Japan" },
    { text: "🇰🇷 كوريا الجنوبية", callback_data: "/save_country Korea" }
  ],
  [
    { text: "🇹🇼 تايوان", callback_data: "/save_country Taiwan" },
    { text: "🇭🇰 هونغ كونغ", callback_data: "/save_country HK" }
  ],
  [
    { text: "🇮🇳 الهند", callback_data: "/save_country India" },
    { text: "🇮🇩 إندونيسيا", callback_data: "/save_country Indonesia" }
  ],
  [
    { text: "🇩🇪 ألمانيا", callback_data: "/save_country Germany" },
    { text: "🇫🇷 فرنسا", callback_data: "/save_country France" }
  ],
  [
    { text: "🇪🇸 إسبانيا", callback_data: "/save_country Spain" },
    { text: "🇮🇹 إيطاليا", callback_data: "/save_country Italy" }
  ],
  [
    { text: "🇦🇺 أستراليا", callback_data: "/save_country Australia" },
    { text: "🇳🇿 نيوزيلندا", callback_data: "/save_country NZ" }
  ],
  [
    { text: "🇲🇽 المكسيك", callback_data: "/save_country Mexico" },
    { text: "🇧🇷 البرازيل", callback_data: "/save_country Brazil" }
  ],
  [
    { text: "🇨🇱 تشيلي", callback_data: "/save_country Chile" },
    { text: "🇿🇦 جنوب إفريقيا", callback_data: "/save_country SAFTY" }
  ],
  [
    { text: "🇮🇪 أيرلندا", callback_data: "/save_country Ireland" },
    { text: "🇳🇱 هولندا", callback_data: "/save_country Netherlands" }
  ],
  [
    { text: "🇨🇭 سويسرا", callback_data: "/save_country Switzerland" },
    { text: "🇦🇹 النمسا", callback_data: "/save_country Austria" }
  ],
  [
    { text: "🇧🇪 بلجيكا", callback_data: "/save_country Belgium" },
    { text: "🇵🇹 البرتغال", callback_data: "/save_country Portugal" }
  ],
  [
    { text: "🇵🇱 بولندا", callback_data: "/save_country Poland" },
    { text: "🇨🇿 جمهورية التشيك", callback_data: "/save_country Czech" }
  ],
  [
    { text: "🇳🇴 النرويج", callback_data: "/save_country Norway" },
    { text: "🇫🇮 فنلندا", callback_data: "/save_country Finland" }
  ],
  [
    { text: "🇩🇰 الدنمارك", callback_data: "/save_country Denmark" },
    { text: "🇸🇪 السويد", callback_data: "/save_country Sweden" }
  ],
  [
    { text: "🇬🇷 اليونان", callback_data: "/save_country Greece" },
    { text: "✖ إلغاء", callback_data: "/cancel" }
  ]
];

let textMsg = "❍ **اختر الدولة التي تريد تفعيل نقاط التشغيل فيها:**\n\n" +
              "$ **رصيدك الحالي:** " + pts.value().toFixed(0) + " ⛁\n" +
              "⦿ **تكلفة التفعيل:** 3 ⛀\n\n" +
              "☟ اضغط على الدولة للمتابعة:";

let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown"
  });
} else {
  Api.sendMessage({
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown"
  });
}

