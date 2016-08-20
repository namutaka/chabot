module.exports = function (chabot) {

   // WebHook で受けたデータをセット
    var payload = chabot.data;

    // templats/ 内のメッセージテンプレートを読み込む
    var template = chabot.readTemplate('gitlab_push.ejs');
    // WebHook で受けたデータでメッセージテンプレートを描画
    var message_body = chabot.render(template, payload);

    // ChatWork API でメッセージ送信
    chabot.post(message_body);
};
