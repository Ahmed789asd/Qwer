/*CMD
  command: /leaderboard
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: لوحة المتصدرين ☃︎
  group: 
CMD*/

let currentUserId = user.telegramid;
let currentUserPoints = Libs.ResourcesLib.userRes("point").value();

// 1. جلب قائمة الأIDs المسجلة وتحديث بيانات المستخدم الحالي بأمان
let usersIds = Bot.getProperty("top_users_ids", []);
if (!Array.isArray(usersIds)) { usersIds = []; }

let found = false;
for (let i = 0; i < usersIds.length; i++) {
  if (usersIds[i] == currentUserId) {
    found = true;
    break;
  }
}

if (!found) {
  usersIds.push(currentUserId);
  Bot.setProperty("top_users_ids", usersIds, "json");
}

// تخزين الآيدي والنقاط الحالية
Bot.setProperty("user_data_" + currentUserId, {
  id: currentUserId,
  points: currentUserPoints
}, "json");

// 2. بناء قائمة المتصدرين مع التحقق من وجود البيانات لتجنب أي انهيار
let usersData = [];
for (let i = 0; i < usersIds.length; i++) {
  let uid = usersIds[i];
  let uData = Bot.getProperty("user_data_" + uid);
  
  // حتى لو لم يكن user_data مخزناً، نقوم بجلب النقاط مباشرة من الموارد لضمان دقة اللوحة
  let p = 0;
  try {
    p = Libs.ResourcesLib.anotherUserRes("point", uid).value();
  } catch (err) {
    p = (uData && uData.points) ? uData.points : 0;
  }
  
  usersData.push({
    id: uid,
    points: p
  });
}

// ترتيب تنازلي حسب النقاط
usersData.sort(function(a, b) {
  return b.points - a.points;
});

// 3. تحديد ترتيب المستخدم الحالي
let userRank = -1;
for (let i = 0; i < usersData.length; i++) {
  if (usersData[i].id == currentUserId) {
    userRank = i + 1;
    break;
  }
}
if (userRank === -1) { userRank = usersData.length + 1; }

// 4. بناء العرض ورايات المراكز بأمان (مصفوفة الرموز مرتبة من 1 إلى 10)
let rankEmojis = ["", "🥇", "🥈", "🥉", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
let leaderboardList = "";
let limit = Math.min(usersData.length, 10);

for (let i = 0; i < limit; i++) {
  let u = usersData[i];
  let rankIndex = i + 1;
  let emoji = (rankIndex >= 1 && rankIndex <= 10) ? rankEmojis[rankIndex] : (rankIndex + ".");
  
  // إخفاء الآيدي بالكامل أو عرضه بشكل آمن (يمكنك إظهاره هكذا أو تشفيره جزئياً لو أردت خصوصية أكثر)
  leaderboardList += emoji + " `ID: " + u.id + "`: " + Number(u.points || 0).toFixed(0) + " ⛁\n";
}

// 5. رسالة الحالة (مع حماية صارمة ضد المصفوفات الفارغة)
let statusMsg = "";
if (usersData.length > 0) {
  if (userRank <= 10) {
    if (userRank === 1) {
      statusMsg = "🥇 **أنت في المركز الأول ومسيطر على القمة! استمر ☄︎**";
    } else {
      let pointsToFirst = usersData[0].points - currentUserPoints + 1;
      let rankEmoji = (userRank === 2) ? "الثاني" : (userRank === 3) ? "الثالث" : "المركز " + userRank;
      
      statusMsg = "🏆 **أنت في المركز " + rankEmoji + " ضمن الـ 10 الأوائل!**\n" +
                  "▪ يفصلك **" + (pointsToFirst > 0 ? pointsToFirst.toFixed(0) : 1) + " نقطة** لتصل إلى المركز الأول 🥇";
    }
  } else {
    if (usersData.length >= 10) {
      let pointsToTop10 = usersData[9].points - currentUserPoints + 1;
      statusMsg = "📉 **أنت لست في قائمة الـ 10 الأوائل (مركزك الحالي: " + userRank + ")**\n" +
                  "▪ يفصلك **" + (pointsToTop10 > 0 ? pointsToTop10.toFixed(0) : 1) + " نقطة** لتدخل قائمة الـ 10 الأوائل!";
    } else {
      let pointsToFirst = usersData[0].points - currentUserPoints + 1;
      statusMsg = "📉 **أنت في المركز " + userRank + "**\n" +
                  "▪ يفصلك **" + (pointsToFirst > 0 ? pointsToFirst.toFixed(0) : 1) + " نقطة** لتصل إلى المركز الأول 🥇";
    }
  }
} else {
  statusMsg = "📉 **لا توجد بيانات كافية بعد لحساب المراكز.**";
}

let msg = "☄︎ ⛁ **لوحة المتصدرين (بالـ ID)**\n\n" + 
          (leaderboardList ? leaderboardList : "𓍝 لا توجد بيانات للمتصدرين.\n") + "\n" + 
          "─────────────────\n" +
          statusMsg + "\n" +
          "▪ آيديك: `" + currentUserId + "` | رصيدك: **" + currentUserPoints.toFixed(0) + " ⛁**";

let buttons = [
  [
    { text: "↻ إعادة التحديث", callback_data: "/leaderboard" },
    { text: "➔ العودة للقائمة", callback_data: "/cancel" }
  ]
];

// الرد الآمن مع معالجة خطأ تعديل الرسالة
let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  try {
    Api.editMessageText({
      chat_id: chat.chatid,
      message_id: request.message.message_id,
      text: msg,
      reply_markup: { inline_keyboard: buttons },
      parse_mode: "Markdown"
    });
  } catch (e) {
    // تتجاهل تيليجرام خطأ "message is not modified"
  }
} else {
  Api.sendMessage({
    chat_id: chat.chatid,
    text: msg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown"
  });
}

