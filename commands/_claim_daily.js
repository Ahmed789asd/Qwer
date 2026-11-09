/*CMD
  command: /claim_daily
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

// 1. جلب يوم المواظبة الحالي وتاريخ آخر استلام
let streakDay = User.getProperty("streak_day") || 1;
let lastClaimDate = User.getProperty("last_claim_date");
let currentDate = new Date().toISOString().slice(0, 10);

// التحقق هل استلم مكافأة اليوم من قبل أم لا
if (lastClaimDate === currentDate) {
  // التحقق الآمن لعدم ظهور خطأ الـ id
  let cbId = (request && request.callback_query) ? request.callback_query.id : (request ? request.id : null);
  if (cbId) {
    Api.answerCallbackQuery({
      callback_query_id: cbId,
      text: "⚠︎ لقد استلمت مكافأة اليوم مسبقاً! انتظر حتى الغد.",
      show_alert: true
    });
  }
  return;
}

// 2. جدول المكافآت لكل يوم من الأيام الـ 7
let rewardsList = [1, 1, 2, 1, 2, 2, 5];
let currentReward = rewardsList[streakDay - 1] || 1;

// 3. إضافة النقاط لرصيد الـ point
let userPoints = Libs.ResourcesLib.userRes("point");
userPoints.add(currentReward);

// 4. تحديث بيانات الاستلام ويوم المواظبة الجديد
User.setProperty("last_claim_date", currentDate);

let nextStreakDay = streakDay + 1;
if (nextStreakDay > 7) {
  nextStreakDay = 1; // إعادة السلسلة بعد اليوم السابع
}
User.setProperty("streak_day", nextStreakDay);

// 5. إرسال تنبيه نجاح الاستلام بشكل آمن 100%
let cbQueryId = (request && request.callback_query) ? request.callback_query.id : (request ? request.id : null);
if (cbQueryId) {
  Api.answerCallbackQuery({
    callback_query_id: cbQueryId,
    text: "✦ مبروك! حصلت على +" + currentReward + " ⛁ بنجاح!",
    show_alert: true
  });
}

// 6. تجهيز النص والواجهة المحدثة فوراً باليوم الجديد والأقفال
let updatedPoints = userPoints.value().toFixed(0);
let totalStreakDays = 7;
let boxCost = 3;

let streakVisualText = "";
let streakDaysValues = [
  { day: 1, reward: "+1 ⛁" },
  { day: 2, reward: "+1 ⛁" },
  { day: 3, reward: "+2 ⛁" },
  { day: 4, reward: "+1 ⛁" },
  { day: 5, reward: "+2 ⛁" },
  { day: 6, reward: "+2 ⛁" },
  { day: 7, reward: "+5 ⛁ 𐌢" }
];

for (let i = 0; i < streakDaysValues.length; i++) {
  let item = streakDaysValues[i];
  let statusIcon = "";
  
  if (item.day < nextStreakDay) {
    statusIcon = "✓ (تم الاستلام)";
  } else if (item.day === nextStreakDay) {
    statusIcon = "🝔 (متاح غداً)";
  } else {
    statusIcon = "⌧ (مقفل)";
  }
  
  let dayNumEmoji = ["①", "②", "③", "④", "⑤", "⑥", "⑦"][i];
  streakVisualText += dayNumEmoji + " " + item.reward + " " + statusIcon + "\n";
}

let textMsg = "❀˖° **مركز الربح والمكافآت المجانية**\n\n" +
              "⌖ **رصيدك الحالي:** " + updatedPoints + " ⛁\n" +
              "⛁ **تكلفة فك الصندوق:** " + boxCost + " ⛁\n" +
              "⌛︎ **سلسلة المواظبة:** اليوم " + nextStreakDay + "/" + totalStreakDays + "\n" +
              "✎𓂃 **الحالة:** ⌖ تم استلام مكافأة اليوم بنجاح!\n\n" +
              "⎋ **سلسلة مكافآت المواظبة:**\n" +
              streakVisualText + "\n" +
              "⚙ **اختر طريقة الربح المفضلة لك:**";

// الأزرار المحدثة مع تفعيل الأبيض والأسود بالكامل لكل الأزرار بدون استثناء
let buttons = [
  [
    { text: "❀˖° تم الاستلام اليوم ✓", callback_data: "/claim_daily" }
  ],
  [
    { text: "☩ قنوات الرعاية (+5 ⛁)", callback_data: "/sponsor_channels" },
    { text: "𓍝 دعوة الأصدقاء (+2 ⛁)", callback_data: "/invite_friends" }
  ],
  [
    { text: "✉ إدخال كود الهدية (Promo Code)", callback_data: "/promo_code" }
  ],
  [
    { text: "☃︎ لوحة المتصدرين (Top 10)", callback_data: "/leaderboard" }
  ],
  [
    { text: "★ شحن الرصيد بنجوم تيليجرام", callback_data: "/telegram_stars" }
  ],
  [
    { text: "↻ العودة إلى القائمة الرئيسية", callback_data: "/cancel" }
  ]
];

if (request && request.message && request.message.message_id) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown"
  });
}

