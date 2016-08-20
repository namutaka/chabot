module.exports = function (chabot) {

    // WebHook で受けたデータをセット
    var payload = JSON.parse(chabot.data.payload);
    // templats/ 内のメッセージテンプレートを読み込む
    var template = chabot.readTemplate('github.ejs');
    // WebHook で受けたデータでメッセージテンプレートを描画
    var message_body = chabot.render(template, payload);

    // ChatWork API でメッセージ送信
    chabot.post(message_body);
};
