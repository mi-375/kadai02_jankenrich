
$(document).ready(function () {
    let selectedWeather = null;
    let selectedFeeling = null;



    let bgmStarted = false;
    const bgm = document.getElementById('bgm');
    
    $('button').on('click', function () {
        if (!bgmStarted) {
            bgm.play().catch(function(error) {
                console.log("BGM再生エラー:", error);
            });
            bgmStarted = true;
        }
    });
    
// 効果音の読み込み
const clickSound = new Audio('mp/click.mp3');

// ボタンが押された時の効果音（天気・気分・スタート・戻る）
$('button').on('click', function () {
    clickSound.currentTime = 0; // 連打に対応して最初から再生
    clickSound.play();
});


bgm.volume = 0.3;        // BGMを少し小さく
clickSound.volume = 1.0; // 効果音はそのまま


    // 天気ボタン
    $('#sunny, #cloudy, #rainy').click(function () {
        selectedWeather = $(this).attr('id');
        $('.weather button').removeClass('selected');
        $(this).addClass('selected');
    });

    // 気分ボタン
    $('#good, #soso, #bad').click(function () {
        selectedFeeling = $(this).attr('id');
        $('.feeling button').removeClass('selected');
        $(this).addClass('selected');
    });

    // スタートボタン
    $('#start').click(function () {
        if (!selectedWeather || !selectedFeeling) {
            alert('天気と気分を選んでね！');
            return;
        }
    
        $('#question-area').fadeOut(function () {
            $('#thinking-area').fadeIn();
    
            setTimeout(function () {
                const suggestionsMap = {
                    sunny: {
                        good: [
                            {Image:"shopping.png"},
                            {Image:"drive.png"},
                            {Image:"picnic.png"}
                        ],
                        soso: [
                            {Image:"sanpo.png"},
                            {Image:"gohan.png"},
                            {Image:"cafe.png"},
                        ],
                        bad: [
                            {Image:"hirune.png"},
                            {Image:"manga.png"},
                            {Image:"sweets.png"},
                        ]
                    },
                    cloudy: {
                        good: [
                            {Image:"movie.png"},
                            {Image:"cat.png"},
                            {Image:"museum.png"},
                        ],
                        soso: [
                            {Image:"sports.png"},
                            {Image:"bo-dgame.png"},
                            {Image:"souji.png"},
                        ],
                        bad: [
                            {Image:"sofa.png"},
                            {Image:"stretch.png"},
                            {Image:"teatime.png"},
                        ]
                    },
                    rainy: {
                        good: [
                            {Image:"game.png"},
                            {Image:"cooking.png"},
                            {Image:"art.png"},
                        ],
                        soso: [
                            {Image:"home.png"},
                            {Image:"training.png"},
                            {Image:"study.png"},
                        ],
                        bad: [
                            {Image:"homemovie.png"},
                            {Image:"dansyari.png"},
                            {Image:"bakugui.png"},
                        ]
                    }
                };
    
                const suggestions = suggestionsMap[selectedWeather][selectedFeeling];
                const randomIndex = Math.floor(Math.random() * suggestions.length);
                const result = suggestions[randomIndex];
    
                if (typeof result === 'object') {
                    $('#result-text').text(result.text || '');
                    $('#result-image').attr('src', `img/${result.Image}`);
                } else {
                    $('#result-text').text(result);
                    $('#result-image').attr('src', 'img/default.png');
                }
    // 考え中をフェードアウトして、結果を表示させる
                $('#thinking-area').fadeOut(function () {
                    $('#result-area').fadeIn();
                });
    
            }, 1700); 
        });
    });

    // 戻るボタンでリセット
    $('#back-button').click(function () {
        $('#result-area').fadeOut(function () {
            $('#question-area').fadeIn();
        });
    
    });

    // okボタンでリセット
    $('#ok-button').click(function () {
        $('#result-area').fadeOut(function () {
            $('#yokatta-area').fadeIn();
        });
        setTimeout(function () {
            $('#yokatta-area').fadeOut(function () {
            $('#question-area').fadeIn();
        });
        },3000);

        // 選択リセット
        selectedWeather = null;
        selectedFeeling = null;
        $('.weather button').removeClass('selected');
        $('.feeling button').removeClass('selected');
    });


});

