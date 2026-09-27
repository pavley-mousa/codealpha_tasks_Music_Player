# Pavley Audio Player

مشغّل موسيقى بواجهة Audio First، مبني بـ HTML وCSS وVanilla JavaScript.

## أهم المميزات

- غلاف الأغنية يظهر في الكارت الخارجي فقط
- Playlists جاهزة لمحمد منير وجورج وسوف من SoundCloud
- إنشاء عدد غير محدود من Playlists محلية
- تعديل اسم Playlist والغلاف
- حذف Playlist
- إضافة وتعديل وحذف الأغاني داخل Playlist
- نقل أغاني SoundCloud من المصادر الجاهزة إلى أي Playlist
- إضافة روابط SoundCloud للأغاني
- إضافة روابط ملفات صوت مباشرة من مواقع مختلفة مثل MP3 وM4A وOGG وWAV عندما يكون الرابط ملف صوت فعلي
- تشغيل SoundCloud عبر الـWidget الرسمي
- تشغيل الروابط المباشرة عبر HTML5 Audio
- Favorites
- Shuffle
- Repeat
- Seek
- Volume وMute
- Dark وLight Mode
- Keyboard shortcuts
- Responsive design
- حفظ القوائم والإعدادات داخل localStorage على نفس المتصفح

## ملاحظة مهمة عن الروابط

رابط صفحة عادية من أي موقع لا يتحول تلقائياً إلى ملف صوت. خانة إضافة الأغنية تحتاج رابط SoundCloud Track أو رابط ملف صوت مباشر قابل للتشغيل من المتصفح.

روابط YouTube نفسها لا تدخل كمصدر صوت منفصل داخل هذا المشغل. YouTube يضع قيوداً على فصل الصوت عن الفيديو وعلى تشغيل مشغّل الخلفية. راجع سياسات YouTube الرسمية. citeturn970416search0turn970416search1

SoundCloud يوفّر تشغيل التراكات والقوائم من خلال الـWidget الرسمي، والـWidget API يدعم التحكم والتقديم والتأخير والصوت وإخفاء الـartwork. citeturn970416search2turn970416search3

## التشغيل

افتح index.html باستخدام VS Code Live Server.

## التخزين

Playlists وإعدادات المستخدم محفوظة محلياً داخل localStorage، لذلك مكتبتك خاصة بالمتصفح والجهاز الذي تستخدمه.
