const choiceText = [
  ["たかわ","たかなわ","こうわ"],
  ["かめいど","あ","あ"],
  ["たｈｓかわ","ｓ","あｇｈ"],
];


function creatDocument(question_number ) {
  let htmlDocument = '<div class=contents>'
                  +      '<h1>' + question_number + 'この地名はなんて読む?</h1>'
                  +      '<img src="../img/' + question_number +  '.png">'
                  +      '<ul>'
                  +         '<li class="contents__list__' + question_number + '" onclick="changeColor('+ question_number + ')">' + choiceText[question_number][0] + '</li>'
                  +         '<li class="contents__list__' + question_number + '" onclick="changeColor('+ question_number + ')">' + choiceText[question_number][1] + '</li>'
                  +         '<li class="contents__list__' + question_number + '" onclick="changeColor('+ question_number + ')">' + choiceText[question_number][2] + '</li>'
                  +      '</ul>'
                  +   '</div>';

                  // console.log(htmlDocument);


document.write(htmlDocument);
}



// 正解の選択肢
// lists[question_number][0]

// クリック時の処理
function changeColor(question_number) {
  let lists = document.getElementsByClassName('contents__list__' + question_number);
  lists = Array.from(lists);
  lists.forEach(list => {
    list.style.backgroundColor = '#287dff';
  });


  
}




for (let i = 0; i < choiceText.length; i++) {
  creatDocument(i);
}
// console.log("ok");