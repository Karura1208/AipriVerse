#ライブラリ読み込み
from selenium import webdriver
from selenium.webdriver.common.by import By

import urllib
import os
import json
import sys

#サイト内のレア度表記とCordinationファイル内の分類の対応
listRare1 = ["★★★★","★★★","★★","★3","★2","ツアー","アイプリグランプリ","コラボ","オーロラドリーム","プリパラ","プリ☆チャン","プリマジ","TGC"]
listRare2 = ["rare4","rare3","rare2","rare3","rare2","tour","rare4","rare3","aurora_dream","pripara","prichan","primagi","rare3"]

#例外のコーデ用配列
#アクセ無のトップス、ボトムス、シューズのコーデ
errCorde1 = ["フレッシュピンクベアトップ","スターシャインベスト","レッドロックベアトップ","ピタTガール","ピチッとクロT"]
#1か所のみのコーデ(部分関係なく)
errCorde2 = ["サマーTシャツ","オータムTシャツ","フレッシュレモンゆめかわ"]

#nowVer:最新Verの数字
def download(nowVer):
#クロームの立ち上げ
    driver=webdriver.Chrome()

    #Coordination用dict
    data_dict = {}
    #data_dict.setdefault("index",{})
    data_dict.setdefault("Coordination",{})

    #Exe化でカレントディレクトリが変わるため、パスの先頭に追加する
    dpath = os.path.dirname(sys.argv[0])

    #読み込む最初のバージョン(テスト用)
    firstVer = 1

    for ver in range(firstVer,int(nowVer) + 1,1):

        #一弾のコーデアイテム一覧を開く
        url  =  "https://aipri.jp/verse/item/" + str(ver) + ".html"
        driver.get(url)
        
        #弾別用のフォルダ作成
        dirPathVer = "/" + str(ver) + "弾" + "/"
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
            #ただし、初期のツアーだけはimgではなくtextで書かれているため無理        
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
            #ただし、初期のツアーだけはimgではなくtextで書かれているため無理        
            try:
                rareImg = sectionElement.find_element(By.XPATH,".//h2/picture/img") 
                RareText = rareImg.get_attribute("alt")
            except :
                RareText = sectionElement.find_element(By.XPATH,".//h2").text 

            #レア度のテキストをCordinationの分類ごとに編集
            for i in range(0,len(listRare1),1):
                if  listRare1[i] in RareText:
                    RareText = listRare2[i]

            data_dict["Coordination"].setdefault(RareText,[])
            
            #レア度別用のフォルダ作成
            dirPathRare = dirPathVer + RareText + "/"
            # if os.path.isdir(".web" + dirPathRare) == False:
            #     os.makedirs(".web" + dirPathRare)

            #個別のコーデのオブジェクトのリスト
            coordinats = sectionElement.find_elements(By.XPATH,".//div/div/a") 
            for coordinat in coordinats:

                #全体コーデの画像保存
                #ImgファイルのURL取得
                #coordinatName   =  coordinat.get_attribute("data-name")
                coordinatName   =  coordinat.find_element(By.XPATH,"../p").text
                
                imgUrl  ="https://aipri.jp/verse/item/" + coordinat.get_attribute("data-img")

                coordinatFlag = True

                #コーデの重複チェック
                for cate in data_dict["Coordination"]:
                    for coord in data_dict["Coordination"][cate]:
                        if coord["name"] == coordinatName:
                            coordinatFlag = False
                
                #重複なしなら                
                if coordinatFlag:

                    #コーデ用のフォルダ作成
                    dirPathcoordinat = dirPathRare + coordinatName + "/"
                    if os.path.isdir(dpath + "/web" + dirPathcoordinat) == False:
                        os.makedirs(dpath + "/web" + dirPathcoordinat)

                    listImgPath = [0,1,2,3,4]
                    listTerm = [0,1,2,3,4]
                    listId = [0,1,2,3,4]

                    if ver == "special":
                        listId.insert(0,coordinat.get_attribute("data-img")[12:24])                
                    else:
                        listId.insert(0,coordinat.get_attribute("data-img")[6:13])

                    listImgPath.insert(0, dirPathcoordinat + listId[0] + ".webp")

                    #Imgファイルのバイナリデータ取得
                    #フルコーデ画像
                    with urllib.request.urlopen(imgUrl) as rf:
                        img_data = rf.read()
                        #ファイル書き込み
                        with open (dpath + "/web" + listImgPath[0],"wb") as f :
                            f.write(img_data)

                    #スペシャルはコーデ事にまとまっていないため、一つとって次
                    if ver == "special":
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
                                break
                             
                            #オーロラドリームの☆3はアクセ無の3部分のため個別処理
                            elif (i == 4) and coordinatName in errCorde1:
                                break

                            #以下コーデはトップスのみのため個別処理
                            elif (i == 2) and coordinatName in errCorde2:
                                break                                
                            
                            #####################################################################

                                
                            #コーデ数のカウント用
                            cnt = i

                            #ファイル書き込み用
                            listTerm.insert(i,coordinat.get_attribute("data-term" + str(i)))
                            listId.insert(i,coordinat.get_attribute("data-id" + str(i)))
                            listImgPath.insert(i, dirPathcoordinat + listId[i] + ".webp")

                            #ImgファイルのURL取得
                            #各部分のコーデ
                            imgUrl ="https://aipri.jp/verse/item/" + coordinat.get_attribute("data-img" + str(i))
                            #Imgファイルのバイナリデータ取得
                            with urllib.request.urlopen(imgUrl) as rf:
                                img_data = rf.read()
                                with open (dpath + "/web" + listImgPath[i],"wb") as f :
                                    f.write(img_data)

                    coord_dict = {}
                    coord_dict.setdefault("name",coordinatName)
                    coord_dict.setdefault("parts",cnt)
                    coord_dict.setdefault("total_id",listId[0])
                    coord_dict.setdefault("total_image","." + listImgPath[0])

                    #コーデの部分別を取り込む
                    for i in range(1,cnt + 1,1):
                        #サイト側が誤ってこれのみシューズをボトムスとしてタグ付しているため
                        if (coordinatName == "ひみつのプリパラそふぃ" and listTerm[i] == "ボトムス") or (coordinatName == "ホリックトリックサイリウム" and listTerm[i] == "ボトムス"):
                            coord_dict.setdefault("shoues",coordinatName + "シューズ")
                            coord_dict.setdefault("shoues_id","シューズ")
                            coord_dict.setdefault("shoues_image","." + listImgPath[i])
                        elif coordinatName == "ドーナツパティシエールオレンジ" and listTerm[i] == "トップス":
                            coord_dict.setdefault("one_piece",coordinatName + "ワンピ")
                            coord_dict.setdefault("one_piece_id","ワンピ")
                            coord_dict.setdefault("one_piece_image","." + listImgPath[i])
                        else:
                            match listTerm[i]:
                                case "ワンピ":
                                    coord_dict.setdefault("one_piece",coordinatName + listTerm[i])
                                    coord_dict.setdefault("one_piece_id",listId[i])
                                    coord_dict.setdefault("one_piece_image","." + listImgPath[i])
                                case "トップス":
                                    coord_dict.setdefault("tops",coordinatName + listTerm[i])
                                    coord_dict.setdefault("tops_id",listId[i])
                                    coord_dict.setdefault("tops_image","." + listImgPath[i])
                                case "ボトムス":
                                    coord_dict.setdefault("bottoms",coordinatName + listTerm[i])
                                    coord_dict.setdefault("bottoms_id",listId[i])
                                    coord_dict.setdefault("bottoms_image","." + listImgPath[i])
                                case "シューズ":
                                    coord_dict.setdefault("shoues",coordinatName + listTerm[i])
                                    coord_dict.setdefault("shoues_id",listId[i])
                                    coord_dict.setdefault("shoues_image","." + listImgPath[i])
                                case "アクセ":
                                    coord_dict.setdefault("accessary",coordinatName + listTerm[i])
                                    coord_dict.setdefault("accessary_id",listId[i])
                                    coord_dict.setdefault("accessary_image","." + listImgPath[i])

                    data_dict["Coordination"][RareText].append(coord_dict)
    
    with open("./" + "Coordination.json", "w",encoding = "utf-8")  as coordFile:
        json.dump(data_dict,coordFile,indent = 2,ensure_ascii=False)


#download(4)