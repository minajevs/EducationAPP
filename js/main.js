$( document ).ready(function() {
    //task1
    $('#task1title').text(task1.title);
    $('#task1author').text(task1.author);
    task1.text.forEach(function(el){
        $('#task1text').append('<p>' + el + '</p>');
    });

    $('#task1author').text(task1.author);
    $('#task1footer').hide();
    $('#task1results').hide();

    for(var i = 1; i < 6; i++){
        $('#t1q' + i + 't').text(task1.questions[i-1].text)
        for(var j = 1; j < 4; j++){
            $('#t1q' + i + 'a' + j).text(task1.questions[i-1].options[j-1]);
        }
    }
    //task2
    $('#task2p2').hide();
    $('#task2footer').hide();
    $('#task2results').hide();
    $('#task2p1').text(task2.text1);
    for(var i = 1; i < 7; i++) {
        $('#task2q' + i + 't').text(task2.text2[i-1]);
    };
    //task3
    $('#task3word').text(task3.words[0]);
    $('#task3res').hide();
    //task4
    task4gen();
    //task5
    task5.text.forEach(function(el){
        $('#task5text').append('<p>' + el + '</p>');
    });
    $('#task5res').hide();
    $('#task5task').hide();
});
$('#task1start').on('click', function(){
    $('#task1').hide();
    $('#task1start').hide();
    $('#task1test').show();
    $('#task1footer').show();
});
$('#task1submit').on('click', function(){
    $('#task1test').hide();
    $('#task1footer').hide();
    $('#task1results').show();
    var total = 5;
    var correct = 0;
    for(var i = 1; i < 6; i++){
        if($('input[name="t1q'+ i +'"]:checked').val() == task1.questions[i-1].correct){
            correct++;
        }
    }
    $('#task1res').text(((correct/total)*100) + '%');
    $('#task1resDesc').text(task1.results[correct]);
});

//task2
$('#task2start').on('click', function(){
    $('#task2p1').hide();
    $('#task2footer').show();
    $('#task2start').hide();
    $('#task2p2').show();

});

$('#task2submit').on('click', function(){
    $('#task2p2').hide();
    $('#task2footer').hide();
    $('#task2results').show();
    var t2correct = 0;
    var t2total = 5;
    for(var i = 1; i < 6; i++){
        if($('#task2in'+ i).val().toLowerCase() == task2.answers[i-1]){
            t2correct++;
        };
    };
    $('#task2res').text(((t2correct/t2total)*100) + '%');
    $('#task2resDesc').text(task1.results[t2correct]);
});
//task3
var t3total = 20;
var t3correct = 0;
var t3cur = 0;
$('#task3n').on('click', function() {
    if(t3cur != 3 && t3cur != 9 && t3cur != 16){
        t3correct++;
    }
    t3cur++;
    $('#task3word').text(task3.words[t3cur]);
    if(t3cur == 20){
        task3finish();
    }
});
$('#task3y').on('click', function() {
    if(t3cur == 3 || t3cur == 9 || t3cur == 16){
        t3correct++;
    }
    t3cur++;
    $('#task3word').text(task3.words[t3cur]);
    if(t3cur == 20){
        task3finish();
    }
});
function task3finish(){
    $('#task3part').hide();
    $('#task3res').show();
    $('#task3result').text(((t3correct/t3total)*100) + '%');
    $('#task3resDesc').text(task1.results[Math.floor(t3correct/5)]);
}
//task4
var curClick = 1;
function task4gen(){
    var numbersarr = [1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25];
    numbersarr = shuffle(numbersarr);
    console.log(numbersarr);
    var cur = 0;
    for(var x = 0; x < task4.x; x++){
        $('#task4table').append('<tr id="x'+ x +'"></tr>')
        for(var y = 0; y < task4.y; y++){
            $('#x'+ x +'').append('<td id="'+ numbersarr[cur] +'"><h2>'+ numbersarr[cur] +'</h2></td>');
            $('#'+ numbersarr[cur]).on('click', createHandler(numbersarr[cur]));
            cur++;
        }
    }
    $('#task4result').hide();
}

var start, stop;
function createHandler(cur){
    return function(){
        console.log(cur);
        console.log(curClick);
        if(curClick == 1){
            start = new Date().getTime();
        }
        if(curClick == cur){
            $('#'+cur).css('background-color', 'green');
            curClick++;
        }
        if(curClick == 26){
            stop = new Date().getTime();
            var time = stop - start;
            $('#task4table').hide();
            $('#task4result').show().text('Your time is: ' + time/1000 + ' seconds!')
        }
    }
}
//task5
var t5start, t5stop;
$('#task5start').on('click', function(){
    t5start = new Date().getTime();
    $('#task5start').hide();
    $('#task5task').show();
});
$('#task5stop').on('click', function(){
    t5stop = new Date().getTime();
    var t5time = t5stop - t5start;
    $('#task5res').show().text('Your result is: ' + Math.ceil((1000)/(t5time/1000)) + ' words per second!');
    $('#task5text').hide();
    $('#task5stop').hide();
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
