

// 表示データオブジェクト
var obj
// チェック用エリア
var check
var url_check = false

async function check_write(check){

    let text = "let check_data = " + JSON.stringify(check)
    const blob = new Blob([text], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "check.js";
    a.click();
    URL.revokeObjectURL(url);
    
}

function login(){
    alert("ログイン処理開始");
    email = document.getElementById("mail").value;
    password = document.getElementById("pass").value;
    alert("ログイン処理開始");
    firebase.auth().onAuthStateChanged(function(user) {
    alert("ログイン処理開始");

    if (user) {
        // ログイン済みならそのまま表示
        console.log("ログイ済み:", user.email);
        alert("ログイ済み:", user.email);
        object={}
        object["disp_data"] = create_disp_data(-1);
        object["check"] = check_data
        let div_element = document.getElementById("id1");
        div_element.remove()
        get_return_from_python_first(object)
    } else {
        // 未ログインならログインページへ
        console.log("未ログイン");
        alert("未ログイン");
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // ログイン成功
            // message要素がないため、この行はコメントアウトまたはHTMLにmessage要素を追加してください
            // message.textContent = "ログインに成功しました！";
            console.log("ログイン成功", userCredential.user);
            alert("ログイン成功", userCredential.user);
            object={}
            object["disp_data"] = create_disp_data(-1);
            object["check"] = check_data
            let div_element = document.getElementById("id1");
            div_element.remove()
            get_return_from_python_first(object)

        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = "ログイン中に不明なエラーが発生しました。";

            // エラーコードによる分岐
            switch (errorCode) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    // ユーザーが存在しないか、パスワードが間違っている場合の一般的なメッセージ
                    errorMessage = "メールアドレスまたはパスワードが正しくありません。";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "無効なメールアドレスの形式です。";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "このアカウントは無効化されています。管理者にお問い合わせください。";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "連続したログイン試行により、一時的にアカウントがロックされました。しばらくしてから再度お試しください。";
                    break;
                default:
                    // その他のエラー
                    console.error("その他のログインエラー:", error);
                    alert("その他のログインエラー:", error);
                    break;
            }

            // ユーザーにエラーメッセージを表示
            // HTMLに <p id="message"></p> があることを想定
            const messageElement = document.getElementById('message');
            if (messageElement) {
                messageElement.textContent = errorMessage;
            } else {
                alert(`ログインエラー: ${errorMessage} (${errorCode})`);
            }
            });
    }
    });

    

}

// チェックデータ読み込み
async function reload(){

    let select = document.querySelector('[name="ver_select"]');
    // スペシャル以外
    if(select.selectedIndex != 0){
        for(var i=0;i<obj["category"].length;i++){
            var category = obj["category"][i]

            //該当箇所のアイテム数テーブルを作成
            for(var j=0;j<obj[obj["disp_data"][category]["idx_list"]].length;j++){

                item_cnt = obj[obj["disp_data"][category]["idx_list"]][j].parts

                //1テーブル生成1
                //tr(行)生成ループ
                for (var k=0;k<item_cnt+1;k++){
                    for (var l=0;l<2;l++){
                        // ワンピ or トップス
                    if(k==1 && l==1){
                            // アイテム数 3 = ワンピ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"
                                ){
                                    //トップス
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id);
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                        }
                                    }
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    }
                                }
                            }
                            // アイテム数 4 , 2 = トップス
                            else if(item_cnt == 4 || item_cnt == 2 ){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデラブリー" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデポップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデクール" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピンクパレードコーデ"
                                ){
                                    // ワンピ
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].tops)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    }
                                }
                            }
                            else{
                                //ツアー
                                if ((obj[obj["disp_data"][category]["idx_list"]][j].name == "サマーTシャツ" )
                                    ||(obj[obj["disp_data"][category]["idx_list"]][j].name == "オータムTシャツ" )
                                    ||(obj[obj["disp_data"][category]["idx_list"]][j].name == "ウィンターTシャツ" )
                                    || (obj[obj["disp_data"][category]["idx_list"]][j].name == "ひみつのミラクルTシャツ")
                                ){
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].tops)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    }
                                }
                                else if (obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュレモンゆめかわ" ){
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    }
                                }

                            }
                        }
                        //　シューズ or ボトムス
                        else if(k==2 && l==1){
                            // アイテム数 3 = シューズ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"    
                                ){
                                    //ボトムス
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].bottoms)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                }
                            }
                            // アイテム数 4 = ボトムス
                            else if(item_cnt == 4){
                                ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id);
                                console.log(obj[obj["disp_data"][category]["idx_list"]][j].bottoms)
                                checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    }
                            }
                            // アイテム数 2 = アクセ
                            else if(item_cnt == 2){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデラブリー" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデポップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデクール" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピンクパレードコーデ"
                                ){
                                    //シューズ
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    }
                                }
                            }
                        }
                        //　アクセ or シューズ
                        else if(k==3 && l==1){
                            // アイテム数 3 = アクセ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"
                                ){
                                    //シューズ
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    }
                                }
                            }
                            // アイテム数 4 = シューズ
                            else if(item_cnt == 4){
                                ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                            }
                        }
                        //　アクセ
                        else if(k==4 && l==1){
                            // アイテム数 4 = アクセ
                            if (item_cnt == 4){
                                ch = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id);
                                console.log(obj[obj["disp_data"][category]["idx_list"]][j].accessary)
                                checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    }
                            }
                        }
                    }
                }
            }
        }
    }
    // スペシャル
    else{
        for(var i=0;i<obj["category"].length;i++){
            //サブタイトルを表示させる
            const h3 = document.createElement('h3')
            h3.setAttribute("id","h3_"+(i+1))
            h3.textContent = obj["special"][i].title
            div.appendChild(h3)

            //該当箇所のアイテム数テーブルを作成
            for(var j=0;j<obj["special"][i]["item_list"].length;j++){
                item_cnt = obj["special"][i]["item_list"][j].parts
                for (var k=0;k<item_cnt+1;k++){
                    for (var l=0;l<2;l++){
                        // ワンピ or トップス
                        if(k==1 && l==1){
                            // アイテム数 3 = ワンピ
                            if (item_cnt == 3){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].one_piece_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].one_piece_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].one_piece_id])
                                    }
                                } 
                            }
                            // アイテム数 4 = トップス
                            else if(item_cnt == 4 ){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].tops_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].tops_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].tops_id])
                                    }
                                } 
                            }
                            // アイテム数 1 = アクセのみ
                            else if(item_cnt == 1){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].accessary_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                            }
                        }
                        //　シューズ or ボトムス
                        else if(k==2 && l==1){
                            // アイテム数 3 = シューズ
                            if (item_cnt == 3){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].shoues_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].shoues_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].shoues_id])
                                    }
                                } 
                            }
                            // アイテム数 4 = ボトムス
                            else if(item_cnt == 4){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].bottoms_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].bottoms_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].bottoms_id])
                                    }
                                } 
                            }
                            // アイテム数 2 = アクセ
                            else if(item_cnt == 2){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].accessary_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                            }
                        }
                        //　アクセ or シューズ
                        else if(k==3 && l==1){
                            // アイテム数 3 = アクセ
                            if (item_cnt == 3){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].accessary_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                            }
                            // アイテム数 4 = シューズ
                            else if(item_cnt == 4){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].shoues_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].shoues_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].shoues_id])
                                    }
                                } 
                            }
                        }
                        //　アクセ
                        else if(k==4 && l==1){
                            // アイテム数 4 = アクセ
                            if (item_cnt == 4){
                                ch = document.getElementById(obj["special"][i]["item_list"][j].accessary_id)
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                            }
                        }

                }

            }
        
        }
        }
    }
}

// データ保存
function save(checkbox){
    // data_save()
    // //pythonでファイルに書き込み
    // check_write(check)

    // チェックボックスから項目ID（ドキュメントID）を取得
    const itemId = checkbox.getAttribute('data-item-id');

    // ★★★ デバッグコードを追加 ★★★
    if (!itemId) {
        console.error("エラー: itemIdが取得できていません！");
        return; // IDがない場合は処理を中断
    }
    console.log(`Firestoreへの書き込みID: ${itemId}`);
    // ★★★ デバッグコードここまで ★★★


    // チェックの状態を取得 (true または false)
    const isChecked = checkbox.checked;

    // Firestoreのドキュメントを参照
    const itemRef = db.collection('checklists').doc(itemId);

    // 参照先のドキュメントの 'isChecked' フィールドを更新
    itemRef.set({
        isChecked: isChecked,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }) // <== このオプションが重要
    .then(() => {
        console.log(`タスク ${itemId} の状態が ${isChecked} に保存（または更新）されました。`);
    })
    .catch((error) => {
        console.error("Firestoreへの書き込み中にエラーが発生しました: ", error);
    });}

function data_save(){
    //チェックボックスを確認し、チェックつきならデータを"get"に変更
    for(var i=0;i<obj["category"].length;i++){
        var category = obj["category"][i]
        if(obj["select_version"] != 0){
            //該当箇所のアイテム数
            for(var j=0;j<obj[obj["disp_data"][category]["idx_list"]].length;j++){
                item_cnt = obj[obj["disp_data"][category]["idx_list"]][j].parts
                //ワンピタイプのコーデ
                if(item_cnt == 3){
                    // アクセなしコーデ
                    if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン"
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"
                    ){
                        //トップス
                        let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = ""
                        }
                        //ボトムス
                        element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id] = ""
                        }
                        //シューズ
                        element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = ""
                        }
                    }
                    else
                    {
                        //ワンピ
                        let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] = ""
                        }
                        //シューズ
                        element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = ""
                        }
                        //アクセ
                        element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] = ""
                        }
                    }
                }
                //トップスタイプのコーデ
                else if(item_cnt == 4){
                    //トップス
                    let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                    if(element.checked){
                        check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = "get"
                    }else{
                        check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = ""
                    }
                    //ボトムス
                    element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                    if(element.checked){
                        check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id] = "get"
                    }else{
                        check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id] = ""
                    }
                    //シューズ
                    element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                    if(element.checked){
                        check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = "get"
                    }else{
                        check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = ""
                    }
                    //アクセ
                    element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                    if(element.checked){
                        check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] = "get"
                    }else{
                        check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] = ""
                    }
                }
                // ツアー(1,2弾)
                else if(item_cnt == 2){
                    // アクセなしコーデ
                    if(obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデラブリー" 
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデポップ" 
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデクール" 
                        ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピンクパレードコーデ"
                    ){
                        //ワンピ
                        let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] = ""
                        }
                        //シューズ
                        element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] = ""
                        }
                    }
                    else
                    {                    
                        //トップス
                        let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = ""
                        }
                        //ボトムス
                        element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] = ""
                        }
                    }
                }else{
                    if((obj[obj["disp_data"][category]["idx_list"]][j].name == "サマーTシャツ")
                        || (obj[obj["disp_data"][category]["idx_list"]][j].name == "オータムTシャツ")
                        || (obj[obj["disp_data"][category]["idx_list"]][j].name == "ウィンターTシャツ")
                        || (obj[obj["disp_data"][category]["idx_list"]][j].name == "ひみつのミラクルTシャツ")
                        ){
                        //トップス
                        let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] = ""
                        }
                    }else if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュレモンゆめかわ"){
                        //ワンピ
                        let element = document.getElementById(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                        if(element.checked){
                            check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] = "get"
                        }else{
                            check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] = ""
                        }
                    }
                }
            }
        }
        else{
        //該当箇所のアイテム数
            for(var j=0;j<obj["special"].length;j++){
                for(var k=0;k<obj["special"][j]["item_list"].length;k++){
                    item_cnt = obj["special"][j]["item_list"][k].parts
                    //ワンピタイプのコーデ
                    if(item_cnt == 3){
                            //ワンピ
                            let element = document.getElementById(obj["special"][j]["item_list"][k].one_piece_id)
                            if(element.checked){
                                check[obj["special"][j]["item_list"][k].one_piece_id] = "get"
                            }else{
                                check[obj["special"][j]["item_list"][k].one_piece_id] = ""
                            }
                            //シューズ
                            element = document.getElementById(obj["special"][j]["item_list"][k].shoues_id)
                            if(element.checked){
                                check[obj["special"][j]["item_list"][k].shoues_id] = "get"
                            }else{
                                check[obj["special"][j]["item_list"][k].shoues_id] = ""
                            }
                            //アクセ
                            element = document.getElementById(obj["special"][j]["item_list"][k].accessary_id)
                            if(element.checked){
                                check[obj["special"][j]["item_list"][k].accessary_id] = "get"
                            }else{
                                check[obj["special"][j]["item_list"][k].accessary_id] = ""
                            }
                    }
                    //トップスタイプのコーデ
                    else if(item_cnt == 4){
                        //トップス
                        let element = document.getElementById(obj["special"][j]["item_list"][k].tops_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].tops_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].tops_id] = ""
                        }
                        //ボトムス
                        element = document.getElementById(obj["special"][j]["item_list"][k].bottoms_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].bottoms_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].bottoms_id] = ""
                        }
                        //シューズ
                        element = document.getElementById(obj["special"][j]["item_list"][k].shoues_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].shoues_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].shoues_id] = ""
                        }
                        //アクセ
                        element = document.getElementById(obj["special"][j]["item_list"][k].accessary_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].accessary_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].accessary_id] = ""
                        }
                    }
                    // ツアー
                    else if(item_cnt == 2){
                        //トップス
                        let element = document.getElementById(obj["special"][j]["item_list"][k].tops_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].tops_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].tops_id] = ""
                        }
                        //アクセ
                        element = document.getElementById(obj["special"][j]["item_list"][k].accessary_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].accessary_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].accessary_id] = ""
                        }
                    }
                    else if(item_cnt == 1){
                        element = document.getElementById(obj["special"][j]["item_list"][k].accessary_id)
                        if(element.checked){
                            check[obj["special"][j]["item_list"][k].accessary_id] = "get"
                        }else{
                            check[obj["special"][j]["item_list"][k].accessary_id] = ""
                        }
                    }
                }
            }
            //再表示
            create_special()
        }
    }
}

//2回目以降
function get_return_from_python(response) {
    obj = response["disp_data"]
    check = response["check"]
    //スペシャル以外のテーブル作成
    if(obj["select_version"]>=1){
        create_disp()
    }else{
        create_special()
    }
}

function get_return_from_python_first(response) {
    obj = response["disp_data"]
    check = response["check"]
    create_disp_first()
}

function ver_change(){
    // let element = document.getElementById("url")
    // if(url_check== false){
    //     data_save()
    // }
    let select = document.querySelector('[name="ver_select"]');
    object = {}
    object["disp_data"] = create_disp_data(select.selectedIndex)
    object["check"] = check
    get_return_from_python(object)
}

//初回の表示作成
function create_disp_first(){
    //要素追加
    const select = document.createElement('select')
    select.name = "ver_select"
    select.id = "select"
    select.onchange = ver_change
    select.classList.add('select')
    
    obj["version"].forEach((v) => {
        const option = document.createElement('option');
        option.value = v.value;
        option.textContent = v.name;
        select.appendChild(option);
      })
    
    const h2 = document.createElement('h2')
    h2.setAttribute("id","h2")

    let btn = document.createElement("button");
    btn.textContent = "読込";
    btn.setAttribute("onclick","reload()")

    var ch = document.createElement('input');
    ch.setAttribute('type','checkbox');
    ch.setAttribute('name','name');
    ch.setAttribute('id',"url");
    ch.checked = url_check

    var label = document.createElement('label')
    label.innerHTML = "所持済みコーデのみ表示"

//    let expVerText = document.createElement("input")
//    expVerText.type = "text"
//    expVerText.setAttribute("id","expVerText")

//    let btn_exp = document.createElement("button");
//    btn_exp.textContent = "データ出力";
//    btn_exp.setAttribute("onclick","expImg()")

    document.body.appendChild(select)
    document.body.appendChild(btn)
//    document.body.appendChild(expVerText)
//    document.body.appendChild(btn_exp)
    document.body.appendChild(ch)
    document.body.appendChild(label)

    document.body.appendChild(h2)


    
    select.selectedIndex = obj["now_version"];

    //テーブル用要素
    const div = document.createElement("div")
    div.setAttribute("id","div1")
    document.body.appendChild(div)

    create_disp()

}

// 該当コーデのURLを取得
function get_url(name){
    var count = url["url"].length
    for (i=0;i<count;i++){
        work_name = url["url"][i].name
        if (work_name == name){
            return url["url"][i].url
        }
    }
    return ""
}

function create_menu(){
    ul = document.getElementById('menu_list')
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }    

    for(var i=0;i<obj["category"].length;i++){
        var category = obj["category"][i]
        li = document.createElement("li")
        a = document.createElement("a")
        a.href="#h3_"+(i+1)
        a.textContent = obj["disp_data"][category]["data"]
        li.appendChild(a)
        ul.appendChild(li)
    }

}

//スペシャルコーデ以外の時
async function create_disp(){

    //メニューのリストを作成するメソッド呼び出し
    create_menu()

    const h2 = document.getElementById('h2')
    document.getElementById('h2').textContent = obj.title
    // テーブルの要素をクリア
    const div_old = document.getElementById("div1")
    div_old.remove()
    div = document.createElement("div")
    div.setAttribute("id","div1")
    document.body.appendChild(div)

    //テーブル作成
    //☆4、☆3...の数だけテーブルの塊を作る
    for(var i=0;i<obj["category"].length;i++){
        var category = obj["category"][i]
        //サブタイトルを表示させる
        const h3 = document.createElement('h3')
        h3.textContent = obj["disp_data"][category]["data"]
        h3.setAttribute("id","h3_"+(i+1))
        div.appendChild(h3)

        //該当箇所のアイテム数テーブルを作成
        for(var j=0;j<obj[obj["disp_data"][category]["idx_list"]].length;j++){
            const table = document.createElement("table")
            table.border = 1
            table.style = "border-collapse: collapse"
            table.width = "600"

            // ブランド画像
            img = document.createElement("img")
            img.src = "brand/"+obj[obj["disp_data"][category]["idx_list"]][j].brand_name+".webp"
            img.height = "20"
            img.width = "80"

            item_cnt = obj[obj["disp_data"][category]["idx_list"]][j].parts
            var str_url = get_url(obj[obj["disp_data"][category]["idx_list"]][j].name)

            let element = document.getElementById("url")
            url_check = element.checked
            if((element.checked && str_url != "") || element.checked == false){
                //1テーブル生成1
                //tr(行)生成ループ
                for (var k=0;k<item_cnt+1;k++){
                    //th(列)生成ループ
                    var tr = document.createElement('tr')
                    for (var l=0;l<2;l++){
                        //1行目にコーデ名を入れる見出しを作成
                        if(k==0 && l==0){
                            var th = document.createElement('th')
                            th.colSpan = 2
                            if (str_url != ""){
                                    var href = document.createElement('a')
                                    href.href = str_url
                                    href.target = "_blank"
                                    href.text = obj[obj["disp_data"][category]["idx_list"]][j].name
                                    th.appendChild(href)
                            }
                            else
                            {
                                th.textContent = obj[obj["disp_data"][category]["idx_list"]][j].name
                            }
                            th.appendChild(img)
                            tr.appendChild(th)
                        }
                        // フルコーデ画像を表示
                        else if(k==1 && l==0){
                            var td = document.createElement('td')
                            td.rowSpan = 4
                            //画像パス 
                            var img = document.createElement("img")
                            img.src = obj[obj["disp_data"][category]["idx_list"]][j].total_image
                            img.height = "180"
                            img.width = "120"
                            td.appendChild(img)
                            tr.appendChild(td)
                        }
                        // ワンピ or トップス
                        else if(k==1 && l==1){
                            var td = document.createElement('td')
                            td.width = "480"

                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')

                            // アイテム数 3 = ワンピ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"
                                ){
                                    //トップス
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id);
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].tops)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                        }
                                    }
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].tops
                                }
                                else
                                {
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].one_piece
                                }
                                td.height = "60"
                            }
                            // アイテム数 4 , 2 = トップス
                            else if(item_cnt == 4 || item_cnt == 2 ){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデラブリー" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデポップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデクール" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピンクパレードコーデ"
                                ){
                                    // ワンピ
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].one_piece
                                }
                                else
                                {
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].tops)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].tops
                                    if(item_cnt==4){
                                        td.height = "45"
                                    }else{
                                        td.height = "90"
                                    }
                                }
                            }
                            else{
                                //ツアー
                                if ((obj[obj["disp_data"][category]["idx_list"]][j].name == "サマーTシャツ" )
                                    ||(obj[obj["disp_data"][category]["idx_list"]][j].name == "オータムTシャツ" )
                                    ||(obj[obj["disp_data"][category]["idx_list"]][j].name == "ウィンターTシャツ" )
                                    || (obj[obj["disp_data"][category]["idx_list"]][j].name == "ひみつのミラクルTシャツ")
                                ){
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].tops)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].tops
                                }
                                else if (obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュレモンゆめかわ" ){
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].one_piece
                                }

                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }
                        //　シューズ or ボトムス
                        else if(k==2 && l==1){
                            var td = document.createElement('td')
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')
                            // アイテム数 3 = シューズ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"    
                                ){
                                    //ボトムス
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id);
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].bottoms)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].bottoms
                                }
                                else
                                {
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].shoues
                                }
                                td.height = "60"
                            }
                            // アイテム数 4 = ボトムス
                            else if(item_cnt == 4){
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                console.log(obj[obj["disp_data"][category]["idx_list"]][j].bottoms)
                                checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                    }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].bottoms
                                td.height = "45"
                            }
                            // アイテム数 2 = アクセ
                            else if(item_cnt == 2){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデラブリー" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデポップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "セブンスコーデクール" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピンクパレードコーデ"
                                ){
                                    //シューズ
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].shoues
                                }
                                else
                                {
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].accessary
                                    td.height = "90"
                                }
                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }
                        //　アクセ or シューズ
                        else if(k==3 && l==1){
                            var td = document.createElement('td')
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')
                            // アイテム数 3 = アクセ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆サンシャイン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆ナイトスター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニースター"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "プリズミー☆シャイニーリボン"
                                    ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "はばたきのシンフォニア"
                                ){
                                    //シューズ
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].shoues
                                }
                                else
                                {
                                    ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    console.log(obj[obj["disp_data"][category]["idx_list"]][j].accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    }
                                    label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].accessary
                                }
                                td.height = "60"
                            }
                            // アイテム数 4 = シューズ
                            else if(item_cnt == 4){
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                console.log(obj[obj["disp_data"][category]["idx_list"]][j].shoues)
                                checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                    }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].shoues
                                td.height = "45"
                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }
                        //　アクセ
                        else if(k==4 && l==1){
                            var td = document.createElement('td')
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')
                            // アイテム数 4 = アクセ
                            if (item_cnt == 4){
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                ch.setAttribute('data-item-id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                console.log(obj[obj["disp_data"][category]["idx_list"]][j].accessary)
                                checkDocRef =  db.collection("checklists").doc(obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                    }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].accessary
                                td.height = "45"
                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }

                    }
                    table.appendChild(tr)
                }
            }

            div.appendChild(table)

        }
    
    }
}

function create_menu_sp(){
    ul = document.getElementById('menu_list')
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }    

    for(var i=0;i<obj["category"].length;i++){
        li = document.createElement("li")
        a = document.createElement("a")
        a.href="#h3_"+(i+1)
        a.textContent = obj["special"][i].title
        li.appendChild(a)
        ul.appendChild(li)
    }

}

//スペシャルコーデの時
async function create_special(){

    //メニューのリストを作成するメソッド呼び出し
    create_menu_sp()

    const h2 = document.getElementById('h2')
    document.getElementById('h2').textContent = obj.title
    // テーブルの要素をクリア
    const div_old = document.getElementById("div1")
    div_old.remove()
    div = document.createElement("div")
    div.setAttribute("id","div1")
    document.body.appendChild(div)

    //テーブル作成
    //☆4、☆3...の数だけテーブルの塊を作る
    for(var i=0;i<obj["category"].length;i++){
        //サブタイトルを表示させる
        const h3 = document.createElement('h3')
        h3.setAttribute("id","h3_"+(i+1))
        h3.textContent = obj["special"][i].title
        div.appendChild(h3)

        //該当箇所のアイテム数テーブルを作成
        for(var j=0;j<obj["special"][i]["item_list"].length;j++){
            const table = document.createElement("table")
            table.border = 1
            table.style = "border-collapse: collapse"
            table.width = "600"

            item_cnt = obj["special"][i]["item_list"][j].parts
            var str_url = get_url(obj["special"][i]["item_list"][j].name)

            let element = document.getElementById("url")
            url_check = element.checked
            if((element.checked && str_url != "") || element.checked == false){
                //1テーブル生成1
                //tr(行)生成ループ
                for (var k=0;k<item_cnt+1;k++){
                    //th(列)生成ループ
                    var tr = document.createElement('tr')
                    for (var l=0;l<2;l++){
                        //1行目にコーデ名を入れる見出しを作成
                        if(k==0 && l==0){
                            var th = document.createElement('th')
                            th.colSpan = 2
                            var str_url = get_url(obj["special"][i]["item_list"][j].name)
                            if (str_url != ""){
                                    var href = document.createElement('a')
                                    href.href = str_url
                                    href.target = "_blank"
                                    href.text = obj["special"][i]["item_list"][j].name
                                    th.appendChild(href)
                            }
                            else
                            {
                                th.textContent = obj["special"][i]["item_list"][j].name
                            }
                            tr.appendChild(th)
                        }
                        // フルコーデ画像を表示
                        else if(k==1 && l==0){
                            var td = document.createElement('td')
                            td.rowSpan = 4
                            //画像パス 
                            var img = document.createElement("img")
                            img.src = obj["special"][i]["item_list"][j].total_image
                            if(item_cnt == 1){
                                img.height = "100"
                                img.width = "100"
                            }else{
                                img.height = "180"
                                img.width = "120"
                            }
                            td.appendChild(img)
                            tr.appendChild(td)
                        }
                        // ワンピ or トップス
                        else if(k==1 && l==1){
                            var td = document.createElement('td')
                            td.width = "480"
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')

                            // アイテム数 3 = ワンピ
                            if (item_cnt == 3){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].one_piece_id);
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].one_piece_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].one_piece_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].one_piece_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].one_piece_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].one_piece
                                td.height = "60"
                            }
                            // アイテム数 4 = トップス
                            else if(item_cnt == 4 ){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].tops_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].tops_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].tops_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].tops_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].tops_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].tops
                                td.height = "45"
                            }
                            // アイテム数 1 = アクセのみ
                            else if(item_cnt == 1){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].accessary_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].accessary_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].accessary
                                td.height = "100"
                        }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }
                        //　シューズ or ボトムス
                        else if(k==2 && l==1){
                            var td = document.createElement('td')
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')
                            // アイテム数 3 = シューズ
                            if (item_cnt == 3){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].shoues_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].shoues_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].shoues_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].shoues_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].shoues_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].shoues
                                td.height = "60"
                            }
                            // アイテム数 4 = ボトムス
                            else if(item_cnt == 4){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].bottoms_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].bottoms_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].bottoms_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].bottoms_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].bottoms_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].bottoms
                                td.height = "45"
                            }
                            // アイテム数 2 = アクセ
                            else if(item_cnt == 2){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].accessary_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].accessary_id)
                                label.innerHTML = obj["special"][i]["item"][j].accessary
                                td.height = "90"
                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }
                        //　アクセ or シューズ
                        else if(k==3 && l==1){
                            var td = document.createElement('td')
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')
                            // アイテム数 3 = アクセ
                            if (item_cnt == 3){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].accessary_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].accessary_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].accessary
                                td.height = "60"
                            }
                            // アイテム数 4 = シューズ
                            else if(item_cnt == 4){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].shoues_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].shoues_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].shoues_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].shoues_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].shoues_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].shoues
                                td.height = "45"
                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }
                        //　アクセ
                        else if(k==4 && l==1){
                            var td = document.createElement('td')
                            var ch = document.createElement('input');
                            ch.setAttribute('type','checkbox');
                            ch.setAttribute('name','name');
                            ch.setAttribute('onchange',"save(this)");

                            var label = document.createElement('label')
                            // アイテム数 4 = アクセ
                            if (item_cnt == 4){
                                ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                                ch.setAttribute('data-item-id',obj["special"][i]["item_list"][j].accessary_id);
                                checkDocRef =  db.collection("checklists").doc(obj["special"][i]["item_list"][j].accessary_id)
                                checkDoc = await checkDocRef.get()
                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                                    }
                                } 
                                label.setAttribute("for",obj["special"][i]["item_list"][j].accessary_id)
                                label.innerHTML = obj["special"][i]["item_list"][j].accessary
                                td.height = "45"
                            }
                            td.appendChild(ch)
                            td.appendChild(label)
                            tr.appendChild(td)
                        }

                    }
                    table.appendChild(tr)
                }
            }
            div.appendChild(table)

        }
    
    }
}

//JSONから表示データの作成
function create_disp_data(ver){
    ver_list = {}
    work = {}
    list = []

    if (ver < 0){
        ver = data["now_version"]
    }
    version_data = data["vol"][ver]

    ver_list["select_version"] = ver
    ver_list["now_version"]=data["now_version"]
    ver_list["title"]=data["vol"][ver]["title"]
    ver_list["version"]=data["version"]
    ver_list["category"]=version_data["category"]
    ver_list["disp_data"]=version_data["data"]

    //全アイテムリストから該当弾のアイテムだけを抽出
    //コーデ名と部位数、最終的にパスの辞書と結合して表示用データとする
    //スペシャルコーデアイテムは別で作成
    if (ver>=1){
        version_data["category"].forEach(function(list_data){
            list.splice(0)
            category = version_data["data"][list_data]["item_list"]
            version_data["items_idx"][version_data["data"][list_data]["idx_list"]].forEach(function(idx){
                work = {}
                work = Object.assign(work,item["Coordination"][category][idx])
                if (!(version_data["data"][list_data]["idx_list"] in ver_list)) ver_list[version_data["data"][list_data]["idx_list"]] = []
                ver_list[version_data["data"][list_data]["idx_list"]].push(work)
            })
        })
        }
        else{
        ver_list["special"] = data["special"]
    }

    return ver_list

}

function firstscript(){
    object={}
    object["disp_data"] = create_disp_data(-1);
    object["check"] = check_data
    check_wk = check_data
    let div_element = document.getElementById("id1");
    div_element.remove()
    get_return_from_python_first(object)
}

//function download(){
//    textbox = document.getElementById("new_version")
//    version = textbox.value
//    pywebview.api.download(version).then()
//}

//function expImg(){
//    textbox = document.getElementById("expVerText")
//    version = textbox.value
//    pywebview.api.expImg(version).then()
//}


$(function() {
  // ハンバーガーメニューをクリックしたときの処理
  $('.hamburger').click(function() {
    // メニューの表示切替
    $('.menu').toggleClass('open'); // メニューを開閉
    // ハンバーガーボタンのアクティブクラスを切り替えて三本線をバツにする
    $(this).toggleClass('active');
  });
});

// ⬇️ このイベントが発火したときに...
document.addEventListener('DOMContentLoaded', () => {
    // ⬇️ 💡 ここで関数が実行されます。
    login(); 
});