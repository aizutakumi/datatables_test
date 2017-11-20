// 現在時刻を表示
function set2fig(num) {
   // 桁数が1桁だったら先頭に0を加えて2桁に調整する
    
   var ret;
   if( num < 10 ) { ret = "0" + num; }
   else { ret = num; }
   return ret;
}
function showClock() {
    var nowTime = new Date();
    var nowYear = set2fig( nowTime.getFullYear() );
    var nowMonth = set2fig( nowTime.getMonth()+1 );   // 月は0-11のため
    var nowDay = set2fig( nowTime.getDate() );
    var nowHour = set2fig( nowTime.getHours() );
    var nowMin  = set2fig( nowTime.getMinutes() );
    var nowSec  = set2fig( nowTime.getSeconds() );
    var msg = nowYear + "年" + nowMonth + "月" + nowDay + "日 " + nowHour + ":" + nowMin + ":" + nowSec;
    $('#RealtimeClockArea').html(msg);
}
setInterval('showClock()',1000);


// 備考欄を動的に変化
function textarea_height(id) {
    // 備考の中身から改行コードを探してrowsに足す
    var check_note = $('#note'+id).val();
    var line_count = (check_note.match(/\n|\r\n/g) || []).length + 1;

    if(line_count > 10) {
        line_count = 10;
    }

    $('#note'+id).attr('rows', line_count);
    // rowsだけだとIEでずれるのでheightも計算
    $('#note'+id).height(20 * line_count);
}


// 備考をクリア
function note_clear(login_user, id, url) {
    $('#note'+id).val('');
    textarea_height(id);

    // 更新
    note_save(login_user, id, url);
}


// 備考を更新
function note_save(login_user, id, url) {
    // ログインユーザー以外を編集する時はアラートを表示
    if (login_user != id) {
        if(!window.confirm('ログインユーザーとは違う社員ですが変更しますか？')){
            return
        }
    }

    var note = $('#note'+id).val();
    $.post(url, {
        'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
        'id': id,
        'note': note
    }).done(function(){
    }).fail(function(){
    }).always(function(){
        location.reload();
    });
}


// 出退勤と作業場所の更新
function status_update(login_user, id, url) {
    // ログインユーザー以外を編集する時はアラートを表示
    if (login_user != id) {
        if(!window.confirm('ログインユーザーとは違う社員ですが変更しますか？')){
            return
        }
    }

    var situation = $('#situation'+id).val();
    var place = $('#place'+id).val();
    $.post(url, {
        'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
        'id': id,
        'situation': situation,
        'place': place
    }).done(function(){
    }).fail(function(){
    }).always(function(){
        location.reload();
    });
}


function image_view(up_url, del_url) {
    $('#upload_form').attr('action', up_url);
    $('#image_del').attr('href', del_url);
}