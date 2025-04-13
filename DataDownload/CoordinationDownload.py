#ライブラリ読み込み
from selenium import webdriver
from selenium.webdriver.common.by import By

import urllib
import os
import json
import sys

#サイト内のレア度表記とCordinationファイル内の分類の対応
#複数の項目に該当する場合は、配列の先頭にあるものを優先する
listRare1 = ["★★★★","★★★","★★","★3","★2","前半","後半","バズリウムドリーム"
             ,"アイプリグランプリ","コラボ","TGC"
             ,"ショップ","ツアー","イチオシひろば"
             ,"オーロラドリーム","ディアマイフューチャー","レインボーライブ","プリパラ","プリ☆チャン","プリマジ"]

listRare2 = ["rare4","rare3","rare2","rare3","rare2","rare4","rare4","rare4"
             ,"rare4","rare3","rare3"
             ,"shop","tour","itioshi_hiroba"
             ,"aurora_dream","dear_my_future","rainbow_live","pripara","prichan","primagi"]

#例外のコーデ用配列
#アクセ無のトップス、ボトムス、シューズのコーデ
errCorde1 = ["フレッシュピンクベアトップ","スターシャインベスト","レッドロックベアトップ","ピタTガール","ピチッとクロT"
             ,"プリズミー☆サンシャイン","プリズミー☆ナイトスター","プリズミー☆シャイニースター","プリズミー☆シャイニーリボン","はばたきのシンフォニア"]
             
#1か所のみのコーデ(部分関係なく)
errCorde2 = ["サマーTシャツ","オータムTシャツ","フレッシュレモンゆめかわ","ウィンターTシャツ","ひみつのミラクルTシャツ"]

#アクセの後にコーデが並んでいるコーデ
errCorde3 = ["じょうねつのシンフォニア"]

#2ヶ所のコーデ(部位関係なく)
errCorde4 = ["セブンスコーデラブリー","セブンスコーデポップ","セブンスコーデクール"]


#loadVer:最新Verの数字
def download(loadVer):  
   
    #クロームの立ち上げ
    driver=webdriver.Chrome()

    #CoordinationのJsonファイルを読み込む
    if os.path.isfile("./" + "Coordination.json") :
        with open("./" + "Coordination.json", "r",encoding = "utf-8")  as file:
            data_dict = json.load(file)    
    else:
        with open("./" + "Coordination.json", "w",encoding = "utf-8")  as file:
                data_dict = {}
                data_dict.setdefault("Coordination",{})

    #RareNumberのJsonファイルを読み込む
    if os.path.isfile("./" + "RareNumber.json") :
        with open("./" + "RareNumber.json", "r",encoding = "utf-8")  as file:
            dict_RareNumber = json.load(file)    
    else:
        with open("./" + "RareNumber.json", "w",encoding = "utf-8")  as file:
                dict_RareNumber = {
                    "NoIdItem":0,"rare4":-1,"rare3":-1,"rare2":-1,"tour":-1
                    ,"オシャレ魔女 ラブandベリー":-1,"shop":-1,"itioshi_hiroba":-1
                    ,"aurora_dream":-1,"dear_my_future":-1,"rainbow_live":-1
                    ,"pripara":-1,"prichan":-1,"primagi":-1}

    #Exe化でカレントディレクトリが変わるため、パスの先頭に追加する
    dpath = os.path.dirname(sys.argv[0])

    #一弾のコーデアイテム一覧を開く
    url  =  "https://aipri.jp/verse/item/" + str(loadVer) + ".html"
    driver.get(url)
    
    #弾別用のフォルダ作成
    dirPathVer = "/" + str(loadVer) + "弾" + "/"
    if os.path.isdir(dpath + "/web" + dirPathVer) == False:
        os.makedirs(dpath + "/web" + dirPathVer)

    #レア度ごとのセクションのリスト取得
    listSection = []
    sectionElements = driver.find_elements(By.XPATH,"/html/body/main/section")
    for sectionElement in sectionElements:
        listSection.append(sectionElement)

    #グランプリコーデを前半☆4の後に並べる(弾開始後にグランプリが増えてJsonのインデックスがずれたため)
    #前半☆4のセクションを探す
    for i in range(0,len(listSection),1):

        #レア度などのファイル名(予定)のimgのパス(imgからclassのaltを取得すれば文字列として取得できる)
        #ただし、初期のツアーだけはimgではなくtextで書かれているためエラーで処理        
        try:
            rareImg = listSection[i].find_element(By.XPATH,".//h2/picture/img") 
            RareText = rareImg.get_attribute("alt")
        except :
            RareText = listSection[i].find_element(By.XPATH,".//h2").text 

        if "前半" in RareText :
            
            #アイプリグランプリのセクションを探す
            for j in range(0,len(listSection),1):

                #レア度などのファイル名(予定)のimgのパス(imgからclassのaltを取得すれば文字列として取得できる)
                #ただし、初期のツアーだけはimgではなくtextで書かれているため無理        
                try:
                    rareImg = listSection[j].find_element(By.XPATH,".//h2/picture/img") 
                    RareText = rareImg.get_attribute("alt")
                except :
                    RareText = listSection[j].find_element(By.XPATH,".//h2").text 

                if "グランプリ" in RareText:
                    #☆4前半とグランプリの並び順を入れ替える
                    listSection[i],listSection[j] = listSection[j],listSection[i]
                    break
            break


    for sectionElement in reversed(listSection):

        #レア度などのファイル名(予定)のimgのパス(imgからclassのaltを取得すれば文字列として取得できる)
        #ただし、初期のツアーだけはimgではなくtextで書かれているためelse側で取得      
        try:
            rareImg = sectionElement.find_element(By.XPATH,".//h2/picture/img") 
            RareText = rareImg.get_attribute("alt")
        except :
            RareText = sectionElement.find_element(By.XPATH,".//h2").text 

        #レア度のテキストをCordinationの分類ごとに編集
        #listRare配列の複数に該当する場合は先に入っている方を優先する
        for i in range(0,len(listRare1),1):
            if  listRare1[i] in RareText:
                RareText = listRare2[i]
                break

        data_dict["Coordination"].setdefault(RareText,[])

        #個別のコーデのオブジェクトのリスト
        coordinats = sectionElement.find_elements(By.XPATH,".//div/div/a") 
        for coordinat in coordinats:

            #全体コーデの画像保存
            #ImgファイルのURL取得
            #coordinatName   =  coordinat.get_attribute("data-name")
            coordinatName   =  coordinat.find_element(By.XPATH,"../p").text
            #IDで重複チェックするように変更
            CoordinationID = coordinat.get_attribute("data-id" + str(1))
            #IDがないコーデもあるため、IDを一意に附番する
            if CoordinationID == '' :
                            CoordinationID = "VM-" + str(dict_RareNumber["NoIdItem"]).zfill(3)

            imgUrl  ="https://aipri.jp/verse/item/" + coordinat.get_attribute("data-img")
            coordinatFlag = True

            #コーデの重複チェック
            for cate in data_dict["Coordination"]:
                for coord in data_dict["Coordination"][cate]:
                    for item in coord.values():
                        if item == CoordinationID:
                            coordinatFlag = False
                        if "VM" in str(item):
                            if coord["name"] == coordinatName:
                                coordinatFlag = False 

                        
            #重複なしなら                
            if coordinatFlag:

                tmpRareNumber = dict_RareNumber[RareText] + 1
                dict_RareNumber[RareText] = tmpRareNumber 

                listImgPath = [0,1,2,3,4]
                listTerm = [0,1,2,3,4]
                listId = [0,1,2,3,4]

                # listImgPath.insert(0, dirPathcoordinat + listId[0] + ".webp")
                listImgPath.insert(0,"https://aipri.jp/verse/item/" + coordinat.get_attribute("data-img"))

                #スペシャルはコーデ事にまとまっていないため、一つとって次
                if loadVer == "special":
                    continue

                print(coordinatName)

                #部分コーデの保存、トップスボトムスで分かれていれば4回目も
                for i in range(1,5,1):
                    if i != 4 or coordinat.get_attribute("data-term1") == "トップス":
                        
                        ######################################################################
                        #
                        # ワンピ,シューズ,アクセ
                        # トップス,ボトムス,シューズ,アクセ
                        # 上記以外の組み合わせのコーデの例外処理
                        #  
                        ######################################################################

                        #アクセ有ならアクセが最後に来ているため、ツアー等のエラー対策
                        if listTerm[i-1] == "アクセ":
                            #アクセありでもアクセが最後に来てないコーデははじく
                            if not coordinatName in errCorde3:
                                break
                            
                        #アクセ無の三ヶ所のコーデは4回目に行かないようにする
                        elif (i == 4) and coordinatName in errCorde1:
                            break

                        #以下コーデはトップスのみのため個別処理
                        elif (i == 2) and coordinatName in errCorde2:
                            break                                

                        #アクセ無でワンピ、シューズのコーデが3回目に行かないようにする
                        elif (i == 3) and coordinatName in errCorde4:
                            break                        

                        
                        #####################################################################

                            
                        #コーデ数のカウント用
                        cnt = i

                        #ファイル書き込み用
                        listTerm.insert(i,coordinat.get_attribute("data-term" + str(i)))
                        listId.insert(i,coordinat.get_attribute("data-id" + str(i)))
                        if listId[i] == '' :
                            listId[i] = "VM-" + str(dict_RareNumber["NoIdItem"]).zfill(3)
                            dict_RareNumber["NoIdItem"] = dict_RareNumber["NoIdItem"] + 1

                        #ImgファイルのURL取得
                        #各部分のコーデ
                        
                        imgUrl ="https://aipri.jp/verse/item/" + coordinat.get_attribute("data-img" + str(i))
                        listImgPath.insert(i, imgUrl)

                coord_dict = {}
                coord_dict.setdefault("number",dict_RareNumber[RareText])
                coord_dict.setdefault("name",coordinatName)
                coord_dict.setdefault("parts",cnt)
                coord_dict.setdefault("total_id",listId[0])
                coord_dict.setdefault("total_image", listImgPath[0])

                #コーデの部分別を取り込む
                for i in range(1,cnt + 1,1):
                    #サイト側が誤ってこれのみシューズをボトムスとしてタグ付しているため
                    if (coordinatName == "ひみつのプリパラそふぃ" and listTerm[i] == "ボトムス") or (coordinatName == "ホリックトリックサイリウム" and listTerm[i] == "ボトムス"):
                        coord_dict.setdefault("shoues",coordinatName + "シューズ")
                        coord_dict.setdefault("shoues_id",listId[i])
                        coord_dict.setdefault("shoues_image",  listImgPath[i])
                    elif coordinatName == "ドーナツパティシエールオレンジ" and listTerm[i] == "トップス":
                        coord_dict.setdefault("one_piece",coordinatName + "ワンピ")
                        coord_dict.setdefault("one_piece_id",listId[i])
                        coord_dict.setdefault("one_piece_image", listImgPath[i])
                    else:
                        match listTerm[i]:
                            case "ワンピ":
                                coord_dict.setdefault("one_piece",coordinatName + listTerm[i])
                                coord_dict.setdefault("one_piece_id",listId[i])
                                coord_dict.setdefault("one_piece_image", listImgPath[i])
                            case "トップス":
                                coord_dict.setdefault("tops",coordinatName + listTerm[i])
                                coord_dict.setdefault("tops_id",listId[i])
                                coord_dict.setdefault("tops_image", listImgPath[i])
                            case "ボトムス":
                                coord_dict.setdefault("bottoms",coordinatName + listTerm[i])
                                coord_dict.setdefault("bottoms_id",listId[i])
                                coord_dict.setdefault("bottoms_image", listImgPath[i])
                            case "シューズ":
                                coord_dict.setdefault("shoues",coordinatName + listTerm[i])
                                coord_dict.setdefault("shoues_id",listId[i])
                                coord_dict.setdefault("shoues_image", listImgPath[i])
                            case "アクセ":
                                coord_dict.setdefault("accessary",coordinatName + listTerm[i])
                                coord_dict.setdefault("accessary_id",listId[i])
                                coord_dict.setdefault("accessary_image", listImgPath[i])
                            case "ヘアアクセ":#何故かプリマジSHOPの一部のプロパティがアクセじゃなくてヘアアクセになってるため
                                coord_dict.setdefault("accessary",coordinatName + listTerm[i])
                                coord_dict.setdefault("accessary_id",listId[i])
                                coord_dict.setdefault("accessary_image", listImgPath[i])

                data_dict["Coordination"][RareText].append(coord_dict)

    #レア度ごと(集計ごと)の通し番号のJsonファイル更新
    with open("./" + "RareNumber.json", "w",encoding = "utf-8")  as file:
        json.dump(dict_RareNumber,file,indent = 2,ensure_ascii=False)

    #コーデの情報のJson更新
    with open("./" + "Coordination.json", "w",encoding = "utf-8")  as file:
        json.dump(data_dict,file,indent = 2,ensure_ascii=False)

    #コーデの情報のJsonをJSに変換して変更
    with open("./" + "Coordination.json","r",encoding = "utf-8") as file:
        s = file.read()
        with open ("./" + "Coordination.js", "w",encoding = "utf-8") as file:
            file.write("let item =")
            file.write(s)

    print("fin")


download('ring1') 

# listVer = ["1","2","3","4","5","6","ring1"]
# for v in listVer:
#    download(v) 