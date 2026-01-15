// 表示データオブジェクト
var obj
// チェック用エリア
var check
var url_check = false

var select_version
var ver_data

function  loginCheck(){
    //alert("リログイン処理");

    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // ユーザーがログインしている状態（復元後も含む）
        // 例: ログイン後のページを表示、ユーザー情報を取得
        alert("ログインユーザー:", user.uid);
        object={}
        let div_element = document.getElementById("id1");
        if(div_element != null){
            div_element.remove()
            firstscript()
        }
    } else {
        // ユーザーがログアウトしている状態
        // 例: ログインページにリダイレクト
        alert("ログアウト状態");
    }
    });

}

function login(){

    email = document.getElementById("mail").value;
    password = document.getElementById("pass").value;

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
        let div_element = document.getElementById("id1");
        if(div_element != null){
            div_element.remove()
            firstscript()
        }

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

let currentRequestId = 0; // 現在の最新リクエストIDを保持

// チェックデータ読み込み
async function reload(){

    // 1. リクエスト開始時にIDをインクリメントし、この関数内でのIDを固定する
    const thisRequestId = ++currentRequestId;
    console.log(`リクエスト開始: ID ${thisRequestId}`);

    let select = document.querySelector('[name="ver_select"]');
    // スペシャル以外
    if(select.selectedIndex != 0){

        // 該当バージョンのカテゴリ一覧(アイテム名含む)を取り出し
        ver = select.selectedIndex
        ver_list = ver_item[version[ver].name]

        for(var i=0;i<Object.keys(ver_list).length;i++){

            category_item = Object.values(ver_list)[i]

            //該当箇所のアイテム数テーブルを作成
            for(var j=0;j<Object.keys(category_item).length;j++){

                item_cnt = obj.parts

                //1テーブル生成1
                //tr(行)生成ループ
                for (var k=0;k<item_cnt+1;k++){
                    for (var l=0;l<2;l++){
                        // ワンピ or トップス
                    if(k==1 && l==1){
                            // アイテム数 3 = ワンピ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "フレッシュピンクベアトップ" 
                                    ||  Object.values(category_item)[j] == "スターシャインベスト" 
                                    ||  Object.values(category_item)[j] == "レッドロックベアトップ" 
                                    ||  Object.values(category_item)[j] == "ピタTガール"
                                    ||  Object.values(category_item)[j] == "ピチッとクロT"
                                    ||  Object.values(category_item)[j] == "プリズミー☆サンシャイン"
                                    ||  Object.values(category_item)[j] == "プリズミー☆ナイトスター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニースター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニーリボン" 
                                    ||  Object.values(category_item)[j] == "はばたきのシンフォニア"
                                ){
                                    //トップス
                                    ch = document.getElementById(obj.tops_id);
                                    checkDocRef =  db.collection("checklists").doc(obj.tops_id)
                                    checkDoc = await checkDocRef.get()

                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.tops_id])
                                        }
                                    }
                                    else{
                                        console.log("ドキュメントなし : ",obj.tops_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj.one_piece_id);
                                    ch.setAttribute('data-item-id',obj.one_piece_id);
                                    console.log(obj.one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj.one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.one_piece_id)
                                    }
                                }
                            }
                            // アイテム数 4 , 2 = トップス
                            else if(item_cnt == 4 || item_cnt == 2 ){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "セブンスコーデラブリー" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデポップ" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデクール" 
                                    ||  Object.values(category_item)[j] == "ピンクパレードコーデ"
                                    ||  Object.values(category_item)[j] == "パラダイスがくえんせいふくすばる"
                                ){
                                    // ワンピ
                                    ch = document.getElementById(obj.one_piece_id);
                                    console.log(obj.one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj.one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.one_piece_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj.tops_id);
                                    console.log(obj.tops)
                                    checkDocRef =  db.collection("checklists").doc(obj.tops_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.tops_id)
                                    }
                                }
                            }
                            else{
                                //ツアー
                                if ((Object.values(category_item)[j] == "サマーTシャツ" )
                                    ||(Object.values(category_item)[j] == "オータムTシャツ" )
                                    ||(Object.values(category_item)[j] == "ウィンターTシャツ" )
                                    || (Object.values(category_item)[j] == "ひみつのミラクルTシャツ")
                                ){
                                    ch = document.getElementById(obj.tops_id);
                                    console.log(obj.tops)
                                    checkDocRef =  db.collection("checklists").doc(obj.tops_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.tops_id)
                                    }
                                }
                                else if (Object.values(category_item)[j] == "フレッシュレモンゆめかわ" ){
                                    ch = document.getElementById(obj.one_piece_id);
                                    console.log(obj.one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj.one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.one_piece_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.one_piece_id)
                                    }
                                }

                            }
                        }
                        //　シューズ or ボトムス
                        else if(k==2 && l==1){
                            // アイテム数 3 = シューズ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "フレッシュピンクベアトップ" 
                                    ||  Object.values(category_item)[j] == "スターシャインベスト" 
                                    ||  Object.values(category_item)[j] == "レッドロックベアトップ" 
                                    ||  Object.values(category_item)[j] == "ピタTガール"
                                    ||  Object.values(category_item)[j] == "ピチッとクロT"
                                    ||  Object.values(category_item)[j] == "プリズミー☆サンシャイン"
                                    ||  Object.values(category_item)[j] == "プリズミー☆ナイトスター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニースター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニーリボン" 
                                    ||  Object.values(category_item)[j] == "はばたきのシンフォニア"    
                                ){
                                    //ボトムス
                                    ch = document.getElementById(obj.bottoms_id);
                                    console.log(obj.bottoms)
                                    checkDocRef =  db.collection("checklists").doc(obj.bottoms_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.bottoms_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.bottoms_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj.shoues_id);
                                    console.log(obj.shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                }
                            }
                            // アイテム数 4 = ボトムス
                            else if(item_cnt == 4){
                                ch = document.getElementById(obj.bottoms_id);
                                console.log(obj.bottoms)
                                checkDocRef =  db.collection("checklists").doc(obj.bottoms_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj.bottoms_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.bottoms_id)
                                    }
                            }
                            // アイテム数 2 = アクセ
                            else if(item_cnt == 2){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "セブンスコーデラブリー" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデポップ" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデクール" 
                                    ||  Object.values(category_item)[j] == "ピンクパレードコーデ"
                                    ||  Object.values(category_item)[j] == "パラダイスがくえんせいふくすばる"
                                ){
                                    //シューズ
                                    ch = document.getElementById(obj.shoues_id);
                                    console.log(obj.shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj.accessary_id);
                                    console.log(obj.accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj.accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.accessary_id)
                                    }
                                }
                            }
                        }
                        //　アクセ or シューズ
                        else if(k==3 && l==1){
                            // アイテム数 3 = アクセ
                            if (item_cnt == 3){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "フレッシュピンクベアトップ" 
                                    ||  Object.values(category_item)[j] == "スターシャインベスト" 
                                    ||  Object.values(category_item)[j] == "レッドロックベアトップ" 
                                    ||  Object.values(category_item)[j] == "ピタTガール"
                                    ||  Object.values(category_item)[j] == "ピチッとクロT"
                                    ||  Object.values(category_item)[j] == "プリズミー☆サンシャイン"
                                    ||  Object.values(category_item)[j] == "プリズミー☆ナイトスター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニースター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニーリボン"
                                    ||  Object.values(category_item)[j] == "はばたきのシンフォニア"
                                ){
                                    //シューズ
                                    ch = document.getElementById(obj.shoues_id);
                                    console.log(obj.shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                }
                                else
                                {
                                    ch = document.getElementById(obj.accessary_id);
                                    console.log(obj.accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj.accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.accessary_id)
                                    }
                                }
                            }
                            // アイテム数 4 = シューズ
                            else if(item_cnt == 4){
                                ch = document.getElementById(obj.shoues_id);
                                console.log(obj.shoues)
                                checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj.shoues_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                            }
                        }
                        //　アクセ
                        else if(k==4 && l==1){
                            // アイテム数 4 = アクセ
                            if (item_cnt == 4){
                                ch = document.getElementById(obj.accessary_id);
                                console.log(obj.accessary)
                                checkDocRef =  db.collection("checklists").doc(obj.accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj.accessary_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.accessary_id)
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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
    });
}

//2回目以降
function get_return_from_python() {
    ver_data = data["version"][select_version]
    //スペシャル以外のテーブル作成
    if(select_version >= 1){
        create_disp()
    }else{
        create_special()
    }
}

function get_return_from_python_first() {
    ver_data = data["version"][select_version]
    create_disp_first()
}

function ver_change(){
    let select = document.querySelector('[name="ver_select"]');
    if (select.selectedIndex < 0){
        select_version = data["now_version"]
    }else{
        select_version = select.selectedIndex
    }
    ver_data = data["version"][select_version]
    get_return_from_python()
}

//初回の表示作成(画面上部部品)
function create_disp_first(){
    //要素追加
    const select = document.createElement('select')
    select.name = "ver_select"
    select.id = "select"
    select.onchange = ver_change
    select.classList.add('select')
    
    data["version"].forEach((v) => {
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


    document.body.appendChild(select)
    document.body.appendChild(btn)
    document.body.appendChild(ch)
    document.body.appendChild(label)

    document.body.appendChild(h2)

    select.selectedIndex = data["now_version"];

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

    // 該当バージョンのカテゴリ一覧(アイテム名含む)を取り出し
    ver_list = ver_item[data["version"][select_version].name]

    for(var i=0;i<Object.keys(ver_list).length;i++){
        li = document.createElement("li")
        a = document.createElement("a")
        a.href="#h3_"+(i+1)
        a.textContent = Object.keys(ver_list)[i]
        li.appendChild(a)
        ul.appendChild(li)
    }

}

//スペシャルコーデ以外の時
async function create_disp(){

    obj = {}

    // 1. リクエスト開始時にIDをインクリメントし、この関数内でのIDを固定する
    const thisRequestId = ++currentRequestId;
    console.log(`リクエスト開始: ID ${thisRequestId}`);

    //メニューのリストを作成するメソッド呼び出し
    create_menu()

    const h2 = document.getElementById('h2')
    document.getElementById('h2').textContent = data["vol"][select_version].title

    // テーブルの要素をクリア
    const div_old = document.getElementById("div1")
    div_old.remove()
    div = document.createElement("div")
    div.setAttribute("id","div1")
    document.body.appendChild(div)

    // 該当バージョンのカテゴリ一覧(アイテム名含む)を取り出し
    ver_list = ver_item[data["version"][select_version].name]

    //テーブル作成
    //☆4、☆3...の数だけテーブルの塊を作る
    for(var i=0;i<Object.keys(ver_list).length;i++){
        //サブタイトルを表示させる
        const h3 = document.createElement('h3')
        h3.textContent = Object.keys(ver_list)[i]
        h3.setAttribute("id","h3_"+(i+1))
        div.appendChild(h3)

        category_item = Object.values(ver_list)[i]

        //該当箇所のアイテム数テーブルを作成
        for(var j=0;j<Object.keys(category_item).length;j++){
            const table = document.createElement("table")
            table.border = 1
            table.style = "border-collapse: collapse"
            table.width = "600"

            // アイテム名からアイテムデータ取り出し
            obj = item[Object.values(category_item)[j]]

            // ブランド画像
            img = document.createElement("img")
            img.src = "brand/" + obj.brand_name + ".webp"
            img.height = "20"
            img.width = "80"

            item_cnt = obj.parts
            var str_url = get_url(obj.name)

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
                                    href.text = Object.values(category_item)[j]
                                    th.appendChild(href)
                            }
                            else
                            {
                                th.textContent = Object.values(category_item)[j]
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
                            img.src = obj.total_image
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
                                if(Object.values(category_item)[j] == "フレッシュピンクベアトップ" 
                                    ||  Object.values(category_item)[j] == "スターシャインベスト" 
                                    ||  Object.values(category_item)[j] == "レッドロックベアトップ" 
                                    ||  Object.values(category_item)[j] == "ピタTガール"
                                    ||  Object.values(category_item)[j] == "ピチッとクロT"
                                    ||  Object.values(category_item)[j] == "プリズミー☆サンシャイン"
                                    ||  Object.values(category_item)[j] == "プリズミー☆ナイトスター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニースター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニーリボン" 
                                    ||  Object.values(category_item)[j] == "はばたきのシンフォニア"
                                ){
                                    //トップス
                                    ch.setAttribute('id',obj.tops_id);
                                    ch.setAttribute('data-item-id',obj.tops_id);
                                    console.log(obj.tops)
                                    checkDocRef =  db.collection("checklists").doc(obj.tops_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.tops_id])
                                        }
                                    }
                                    else{
                                        console.log("ドキュメントなし : ",obj.tops_id)
                                    }
                                    label.setAttribute("for",obj.tops_id)
                                    label.innerHTML = obj.tops
                                }
                                else
                                {
                                    ch.setAttribute('id',obj.one_piece_id);
                                    ch.setAttribute('data-item-id',obj.one_piece_id);
                                    console.log(obj.one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj.one_piece_id)
                                    checkDoc = await checkDocRef.get()

                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.one_piece_id)
                                    }
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.innerHTML = obj.one_piece
                                }
                                td.height = "60"
                            }
                            // アイテム数 4 , 2 = トップス
                            else if(item_cnt == 4 || item_cnt == 2 ){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "セブンスコーデラブリー" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデポップ" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデクール" 
                                    ||  Object.values(category_item)[j] == "ピンクパレードコーデ"
                                    ||  Object.values(category_item)[j] == "パラダイスがくえんせいふくすばる"
                                ){
                                    // ワンピ
                                    ch.setAttribute('id',obj.one_piece_id)
                                    ch.setAttribute('data-item-id',obj.one_piece_id)
                                    console.log(obj.one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj.one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.one_piece_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.one_piece_id)
                                    }
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.innerHTML = obj.one_piece
                                }
                                else
                                {
                                    ch.setAttribute('id',obj.tops_id)
                                    ch.setAttribute('data-item-id',obj.tops_id)
                                    console.log(obj.tops)
                                    checkDocRef =  db.collection("checklists").doc(obj.tops_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.tops_id)
                                    }
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.setAttribute("for",obj.tops_id)
                                    label.innerHTML = obj.tops
                                    if(item_cnt==4){
                                        td.height = "45"
                                    }else{
                                        td.height = "90"
                                    }
                                }
                            }
                            else{
                                //ツアー
                                if ((Object.values(category_item)[j] == "サマーTシャツ" )
                                    ||(Object.values(category_item)[j] == "オータムTシャツ" )
                                    ||(Object.values(category_item)[j] == "ウィンターTシャツ" )
                                    || (Object.values(category_item)[j] == "ひみつのミラクルTシャツ")
                                ){
                                    ch.setAttribute('id',obj.tops_id)
                                    ch.setAttribute('data-item-id',obj.tops_id)
                                    console.log(obj.tops)
                                    checkDocRef =  db.collection("checklists").doc(obj.tops_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.tops_id])
                                        }
                                    }                                    
                                    else{
                                        console.log("ドキュメントなし : ",obj.tops_id)
                                    }
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.setAttribute("for",obj.tops_id)
                                    label.innerHTML = obj.tops
                                }
                                else if (Object.values(category_item)[j] == "フレッシュレモンゆめかわ" ){
                                    ch.setAttribute('id',obj.one_piece_id)
                                    ch.setAttribute('data-item-id',obj.one_piece_id)
                                    console.log(obj.one_piece)
                                    checkDocRef =  db.collection("checklists").doc(obj.one_piece_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.one_piece_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.one_piece_id)
                                    }
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.setAttribute("for",obj.one_piece_id)
                                    label.innerHTML = obj.one_piece
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
                                if(Object.values(category_item)[j] == "フレッシュピンクベアトップ" 
                                    ||  Object.values(category_item)[j] == "スターシャインベスト" 
                                    ||  Object.values(category_item)[j] == "レッドロックベアトップ" 
                                    ||  Object.values(category_item)[j] == "ピタTガール"
                                    ||  Object.values(category_item)[j] == "ピチッとクロT"
                                    ||  Object.values(category_item)[j] == "プリズミー☆サンシャイン"
                                    ||  Object.values(category_item)[j] == "プリズミー☆ナイトスター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニースター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニーリボン" 
                                    ||  Object.values(category_item)[j] == "はばたきのシンフォニア"    
                                ){
                                    //ボトムス
                                    ch.setAttribute('id',obj.bottoms_id);
                                    ch.setAttribute('data-item-id',obj.bottoms_id);
                                    console.log(obj.bottoms)
                                    checkDocRef =  db.collection("checklists").doc(obj.bottoms_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.bottoms_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.bottoms_id)
                                    }
                                    label.setAttribute("for",obj.bottoms_id)
                                    label.innerHTML = obj.bottoms
                                }
                                else
                                {
                                    ch.setAttribute('id',obj.shoues_id)
                                    ch.setAttribute('data-item-id',obj.shoues_id)
                                    console.log(obj.shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                    label.setAttribute("for",obj.shoues_id)
                                    label.innerHTML = obj.shoues
                                }
                                td.height = "60"
                            }
                            // アイテム数 4 = ボトムス
                            else if(item_cnt == 4){
                                ch.setAttribute('id',obj.bottoms_id)
                                ch.setAttribute('data-item-id',obj.bottoms_id)
                                console.log(obj.bottoms)
                                checkDocRef =  db.collection("checklists").doc(obj.bottoms_id)
                                checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj.bottoms_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.bottoms_id)
                                    }
                                label.setAttribute("for",obj.bottoms_id)
                                label.innerHTML = obj.bottoms
                                td.height = "45"
                            }
                            // アイテム数 2 = アクセ
                            else if(item_cnt == 2){
                                // アクセなしコーデ
                                if(Object.values(category_item)[j] == "セブンスコーデラブリー" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデポップ" 
                                    ||  Object.values(category_item)[j] == "セブンスコーデクール" 
                                    ||  Object.values(category_item)[j] == "ピンクパレードコーデ"
                                    ||  Object.values(category_item)[j] == "パラダイスがくえんせいふくすばる"
                                ){
                                    //シューズ
                                    ch.setAttribute('id',obj.shoues_id);
                                    ch.setAttribute('data-item-id',obj.shoues_id);
                                    console.log(obj.shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                    label.setAttribute("for",obj.shoues_id)
                                    label.innerHTML = obj.shoues
                                }
                                else
                                {
                                    ch.setAttribute('id',obj.accessary_id)
                                    ch.setAttribute('data-item-id',obj.accessary_id)
                                    console.log(obj.accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj.accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.accessary_id)
                                    }
                                    label.setAttribute("for",obj.accessary_id)
                                    label.innerHTML = obj.accessary
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
                                if(Object.values(category_item)[j] == "フレッシュピンクベアトップ" 
                                    ||  Object.values(category_item)[j] == "スターシャインベスト" 
                                    ||  Object.values(category_item)[j] == "レッドロックベアトップ" 
                                    ||  Object.values(category_item)[j] == "ピタTガール"
                                    ||  Object.values(category_item)[j] == "ピチッとクロT"
                                    ||  Object.values(category_item)[j] == "プリズミー☆サンシャイン"
                                    ||  Object.values(category_item)[j] == "プリズミー☆ナイトスター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニースター"
                                    ||  Object.values(category_item)[j] == "プリズミー☆シャイニーリボン"
                                    ||  Object.values(category_item)[j] == "はばたきのシンフォニア"
                                ){
                                    //シューズ
                                    ch.setAttribute('id',obj.shoues_id);
                                    ch.setAttribute('data-item-id',obj.shoues_id);
                                    console.log(obj.shoues)
                                    checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.shoues_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                    label.setAttribute("for",obj.shoues_id)
                                    label.innerHTML = obj.shoues
                                }
                                else
                                {
                                    ch.setAttribute('id',obj.accessary_id)
                                    ch.setAttribute('data-item-id',obj.accessary_id)
                                    console.log(obj.accessary)
                                    checkDocRef =  db.collection("checklists").doc(obj.accessary_id)
                                    checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                    if (checkDoc.exists) {
                                        // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                        const checkData = checkDoc.data(); 

                                        console.log("ドキュメントデータ:", checkData);
                                        if (checkData.isChecked){
                                            ch.setAttribute('checked',ch[obj.accessary_id])
                                        }
                                    } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.accessary_id)
                                    }
                                    label.setAttribute("for",obj.accessary_id)
                                    label.innerHTML = obj.accessary
                                }
                                td.height = "60"
                            }
                            // アイテム数 4 = シューズ
                            else if(item_cnt == 4){
                                ch.setAttribute('id',obj.shoues_id)
                                ch.setAttribute('data-item-id',obj.shoues_id)
                                console.log(obj.shoues)
                                checkDocRef =  db.collection("checklists").doc(obj.shoues_id)
                                checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj.shoues_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.shoues_id)
                                    }
                                label.setAttribute("for",obj.shoues_id)
                                label.innerHTML = obj.shoues
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
                                ch.setAttribute('id',obj.accessary_id)
                                ch.setAttribute('data-item-id',obj.accessary_id)
                                console.log(obj.accessary)
                                checkDocRef =  db.collection("checklists").doc(obj.accessary_id)
                                checkDoc = await checkDocRef.get()
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

                                if (checkDoc.exists) {
                                    // ⭕️ .data() を関数として呼び出して、データオブジェクトを取り出す
                                    const checkData = checkDoc.data(); 

                                    console.log("ドキュメントデータ:", checkData);
                                    if (checkData.isChecked){
                                        ch.setAttribute('checked',ch[obj.accessary_id])
                                    }
                                } 
                                    else{
                                        console.log("ドキュメントなし : ",obj.accessary_id)
                                    }
                                label.setAttribute("for",obj.accessary_id)
                                label.innerHTML = obj.accessary
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

//スペシャルコーデの時
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

    obj = {}

    // 1. リクエスト開始時にIDをインクリメントし、この関数内でのIDを固定する
    const thisRequestId = ++currentRequestId;
    console.log(`リクエスト開始: ID ${thisRequestId}`);

    obj["category"]= data["vol"][0]["category"]
    obj["special"] = data["special"]

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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
                                    
                                    // データが返ってきた時、自分のIDが「最新のID」のままかチェックする
                                    if (thisRequestId !== currentRequestId) {
                                    console.warn(`ID ${thisRequestId} の結果を破棄しました（最新は ID ${currentRequestId} です）`);
                                    return; 
                                    }

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

function firstscript(){
    select_version = data["now_version"]
    get_return_from_python_first()
}

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
    loginCheck(); 

});