`use strict`;
const userNameInput = document.getElementById(`user-name`);
const assessmentButton = document.getElementById(`assessment`);
const resultDivided = document.getElementById(`result-area`);
const tweetDivided = document.getElementById(`tweet-area`);

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {

    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    }
    removeAllChildren(resultDivided);

    const header = document.createElement(`h3`);
    header.innerText = `診断結果`;
    resultDivided.appendChild(header);

    const paragraph = document.createElement(`p`);
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag= ' 
    + encodeURIComponent(`あなたのいいところ診断する`) 
    + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweetあなたのいいところ';
    tweetDivided.appendChild(anchor);
    
    const script = document.createElement(`script`);
    script.setAttribute(`src`,"https://platform.twitter.com/widgets.js");
    script.setAttribute(`charset`,"utf-8");
    tweetDivided.appendChild(script);
}

userNameInput.onkeydown = (event) => {

    if(event.key === `Enter`) {
        assessmentButton.onclick();
    }
}

const answers = [
    `{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。`,
    `{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。`,
    `{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。`,
    `{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。`,
    `{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。`,
    `{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。`,
    `{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。`,
    `{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。`,
    `{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。`,
    `{userName}のいいところは思いやりです。){userName}に気をかけてもらった多くの人が感謝しています。`,
    `{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。`,
    `{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。`,
    `{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。`,
    `{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。`,
    `{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。`,
    `{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。`,
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {String} userName 名前の文字列
 */
function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
}
///////////////////// ここ大切正規表現は文字を見つけてきてくれてさらに置き換えてくれる

console.assert(
    assessment('太郎') === assessment('太郎'),
    '名前が同じですが同じ結果になっていません'
);
