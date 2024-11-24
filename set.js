
// 表示データオブジェクト
var obj
//チェックボックスオブジェクト
var check


// データ保存
function save(){
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
                }else{
                    if((obj[obj["disp_data"][category]["idx_list"]][j].name == "サマーTシャツ")
                        || (obj[obj["disp_data"][category]["idx_list"]][j].name == "オータムTシャツ")){
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
    //pythonでファイルに書き込み
    pywebview.api.write(check)
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
    let select = document.querySelector('[name="ver_select"]');
    pywebview.api.read(select.selectedIndex).then(get_return_from_python)
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
    btn.textContent = "データ保存";
    btn.setAttribute("onclick","save()")

    let expVerText = document.createElement("input")
    expVerText.type = "text"
    expVerText.setAttribute("id","expVerText")

    let btn_exp = document.createElement("button");
    btn_exp.textContent = "データ出力";
    btn_exp.setAttribute("onclick","expImg()")

    document.body.appendChild(select)
    document.body.appendChild(btn)
    document.body.appendChild(expVerText)
    document.body.appendChild(btn_exp)

    document.body.appendChild(h2)


    
    select.selectedIndex = obj["now_version"];

    //テーブル用要素
    const div = document.createElement("div")
    div.setAttribute("id","div1")
    document.body.appendChild(div)

    create_disp()

}

//スペシャルコーデ以外の時
function create_disp(){
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
        div.appendChild(h3)

        //該当箇所のアイテム数テーブルを作成
        for(var j=0;j<obj[obj["disp_data"][category]["idx_list"]].length;j++){
            const table = document.createElement("table")
            table.border = 1
            table.style = "border-collapse: collapse"
            table.width = "600"

            item_cnt = obj[obj["disp_data"][category]["idx_list"]][j].parts

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
                        th.textContent = obj[obj["disp_data"][category]["idx_list"]][j].name
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

                        var label = document.createElement('label')

                        // アイテム数 3 = ワンピ
                        if (item_cnt == 3){
                            // アクセなしコーデ
                            if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                            ){
                                //トップス
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id);
                                console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].tops
                            }
                            else
                            {
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id);
                                console.log(ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].one_piece
                            }
                            td.height = "60"
                        }
                        // アイテム数 4 , 2 = トップス
                        else if(item_cnt == 4 || item_cnt == 2 ){
                            ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                            console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                            if (check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] == "get"){
                                ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                            }
                            label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                            label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].tops
                            if(item_cnt==4){
                                td.height = "45"
                            }else{
                                td.height = "90"
                            }
                        }
                        else{
                            //ツアー
                            if ((obj[obj["disp_data"][category]["idx_list"]][j].name == "サマーTシャツ" )
                                ||(obj[obj["disp_data"][category]["idx_list"]][j].name == "オータムTシャツ" )){
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].tops_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].tops_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].tops_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].tops
                            }
                            else if (obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュレモンゆめかわ" ){
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id)
                                console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].one_piece_id])
                                }
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

                        var label = document.createElement('label')
                        // アイテム数 3 = シューズ
                        if (item_cnt == 3){
                            // アクセなしコーデ
                            if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                            ){
                                //ボトムス
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id);
                                console.log(ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].bottoms
                            }
                            else
                            {
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].shoues
                            }
                            td.height = "60"
                        }
                        // アイテム数 4 = ボトムス
                        else if(item_cnt == 4){
                            ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                            console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                            if (check[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id] == "get"){
                                ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id])
                            }
                            label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].bottoms_id)
                            label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].bottoms
                            td.height = "45"
                        }
                        // アイテム数 2 = アクセ
                        else if(item_cnt == 2){
                            ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                            console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                            if (check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] == "get"){
                                ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                            }
                            label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                            label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].accessary
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

                        var label = document.createElement('label')
                        // アイテム数 3 = アクセ
                        if (item_cnt == 3){
                            // アクセなしコーデ
                            if(obj[obj["disp_data"][category]["idx_list"]][j].name == "フレッシュピンクベアトップ" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "スターシャインベスト" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "レッドロックベアトップ" 
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピタTガール"
                                ||  obj[obj["disp_data"][category]["idx_list"]][j].name == "ピチッとクロT"
                            ){
                                //シューズ
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id);
                                console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].shoues
                            }
                            else
                            {
                                ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                if (check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] == "get"){
                                    ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                                }
                                label.setAttribute("for",obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                                label.innerHTML = obj[obj["disp_data"][category]["idx_list"]][j].accessary
                            }
                            td.height = "60"
                        }
                        // アイテム数 4 = シューズ
                        else if(item_cnt == 4){
                            ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].shoues_id)
                            console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
                            if (check[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id] == "get"){
                                ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].shoues_id])
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

                        var label = document.createElement('label')
                        // アイテム数 4 = アクセ
                        if (item_cnt == 4){
                            ch.setAttribute('id',obj[obj["disp_data"][category]["idx_list"]][j].accessary_id)
                            console.log(check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
                            if (check[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id] == "get"){
                                ch.setAttribute('checked',ch[obj[obj["disp_data"][category]["idx_list"]][j].accessary_id])
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

            div.appendChild(table)

        }
    
    }
}

//スペシャルコーデの時
function create_special(){
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
        h3.textContent = obj["special"][i].title
        div.appendChild(h3)

        //該当箇所のアイテム数テーブルを作成
        for(var j=0;j<obj["special"][i]["item_list"].length;j++){
            const table = document.createElement("table")
            table.border = 1
            table.style = "border-collapse: collapse"
            table.width = "600"

            item_cnt = obj["special"][i]["item_list"][j].parts

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
                        th.textContent = obj["special"][i]["item_list"][j].name
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

                        var label = document.createElement('label')

                        // アイテム数 3 = ワンピ
                        if (item_cnt == 3){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].one_piece_id);
                            if (check[obj["special"][i]["item_list"][j].one_piece_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].one_piece_id])
                            }
                            label.setAttribute("for",obj["special"][i]["item_list"][j].one_piece_id)
                            label.innerHTML = obj["special"][i]["item_list"][j].one_piece
                            td.height = "60"
                        }
                        // アイテム数 4 = トップス
                        else if(item_cnt == 4 ){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].tops_id)
                            if (check[obj["special"][i]["item_list"][j].tops_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].tops_id])
                            }
                            label.setAttribute("for",obj["special"][i]["item_list"][j].tops_id)
                            label.innerHTML = obj["special"][i]["item_list"][j].tops
                            td.height = "45"
                        }
                        // アイテム数 1 = アクセのみ
                        else if(item_cnt == 1){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                            if (check[obj["special"][i]["item_list"][j].accessary_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
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

                        var label = document.createElement('label')
                        // アイテム数 3 = シューズ
                        if (item_cnt == 3){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].shoues_id)
                            if (check[obj["special"][i]["item_list"][j].shoues_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].shoues_id])
                            }
                            label.setAttribute("for",obj["special"][i]["item_list"][j].shoues_id)
                            label.innerHTML = obj["special"][i]["item_list"][j].shoues
                            td.height = "60"
                        }
                        // アイテム数 4 = ボトムス
                        else if(item_cnt == 4){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].bottoms_id)
                            if (check[obj["special"][i]["item_list"][j].bottoms_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].bottoms_id])
                            }
                            label.setAttribute("for",obj["special"][i]["item_list"][j].bottoms_id)
                            label.innerHTML = obj["special"][i]["item_list"][j].bottoms
                            td.height = "45"
                        }
                        // アイテム数 2 = アクセ
                        else if(item_cnt == 2){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                            if (check[obj["special"][i]["item_list"][j].accessary_id] == "get"){
                                ch.setAttribute('checked',chcheck[obj["special"][i]["item_list"][j].accessary_id])
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

                        var label = document.createElement('label')
                        // アイテム数 3 = アクセ
                        if (item_cnt == 3){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                            if (check[obj["special"][i]["item_list"][j].accessary_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
                            }
                            label.setAttribute("for",obj["special"][i]["item_list"][j].accessary_id)
                            label.innerHTML = obj["special"][i]["item_list"][j].accessary
                            td.height = "60"
                        }
                        // アイテム数 4 = シューズ
                        else if(item_cnt == 4){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].shoues_id)
                            if (check[obj["special"][i]["item_list"][j].shoues_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].shoues_id])
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
                        var label = document.createElement('label')
                        // アイテム数 4 = アクセ
                        if (item_cnt == 4){
                            ch.setAttribute('id',obj["special"][i]["item_list"][j].accessary_id)
                            if (check[obj["special"][i]["item_list"][j].accessary_id] == "get"){
                                ch.setAttribute('checked',ch[obj["special"][i]["item_list"][j].accessary_id])
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

            div.appendChild(table)

        }
    
    }
}

function get_json(requestURL){
    let res_item
    $.getJSON(requestURL, (data) => {
        // jsonを読み込んだ後の処理
        res_item = data
    });
    return res_item
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
            list.clear()
            category = version_data["data"][list_data]["item_list"]
            version_data["items_idx"][version_data["data"][list_data]["idx_list"]].forEach(function(idx){
                work = {}
                work.update(item["Coordination"][category][idx])
                ver_list.setdefault(version_data["data"][list_data]["idx_list"],[]).append(work)
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
    let div_element = document.getElementById("id1");
    div_element.remove()
    get_return_from_python_first(object)
}

function download(){
    textbox = document.getElementById("new_version")
    version = textbox.value
    pywebview.api.download(version).then()
}

function expImg(){
    textbox = document.getElementById("expVerText")
    version = textbox.value
    pywebview.api.expImg(version).then()
}
