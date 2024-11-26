#ライブラリ読み込み
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import urllib
import os
import sys
import json

def download():

    getingDate = input("取得する年月を入れてね！ (yyyymm)") 
    getingCharactor= input("取得するマイキャラ名を入れてね！")

    #Exe化でカレントディレクトリが変わるため、パスの先頭に追加する
    dpath = os.path.dirname(sys.argv[0])

    #マイキャラ情報ファイルの取得
    MyChara_filePath = dpath + "\MyChara.json"
    with open(MyChara_filePath,encoding="utf-8") as f:
        dict_MyChara = json.load(f)

    #
    for MyChara in dict_MyChara["MyCharactor"]:
        if MyChara["MyCharaName"] == getingCharactor:
            SaveCodeID = MyChara["SaveCodeID"]
            MyCharaName = MyChara["MyCharaName"]
            BirthMonth = MyChara["MyCharaBirthMonth"] 
            BirthDay = MyChara["MyCharaBirthDay"] 

    #クロームの立ち上げ
    driver=webdriver.Chrome()


    #マイキャラルームログイン
    url  =  "https://aipri.jp/mypage/login/"
    driver.get(url)
    
    target = driver.find_element(By.XPATH,"/html/body/div[1]/main/div[2]/div/div[1]/div/div[1]/div/form/div[1]/div/input")
    target.send_keys(SaveCodeID)
    target = driver.find_element(By.XPATH,"/html/body/div[1]/main/div[2]/div/div[1]/div/div[1]/div/form/div[2]/input")
    target.send_keys(MyCharaName)
    target = driver.find_element(By.XPATH,"/html/body/div[1]/main/div[2]/div/div[1]/div/div[1]/div/form/div[3]/div/div[1]/input")
    target.send_keys(BirthMonth)
    target = driver.find_element(By.XPATH,"/html/body/div[1]/main/div[2]/div/div[1]/div/div[1]/div/form/div[3]/div/div[2]/input")
    target.send_keys(BirthDay)
    btn = driver.find_element(By.XPATH,"/html/body/div[1]/main/div[2]/div/div[1]/div/div[1]/div/form/div[4]/button").click()


    #キャラの月のフォルダ作成
    dirMonth = "/" + getingCharactor + "/" + str(getingDate) + "/"
    if os.path.isdir(dpath + dirMonth) == False:
        os.makedirs(dpath + dirMonth)

    monthUrl = "https://aipri.jp/mypage/myphoto/?setDate=" + str(getingDate)
    driver.get(monthUrl)

    #プリフォトのliのリスト取得
    liElements = driver.find_elements(By.XPATH,"/html/body/div[1]/main/div[2]/div/section/div/div[3]/ul/li")

    i = 0

    listDetailUrl = []
    for liElement in liElements:

        #画像詳細のページのURL取得
        aElement =  liElement.find_element(By.XPATH,".//a") 
        detailUrl = aElement.get_attribute("href")

        listDetailUrl.append(detailUrl)

    #listの並びが最新から入っているため、過去画像のURLから順に取得する
    for urlText in reversed(listDetailUrl):

        #画像詳細のページへ移動
        driver.get(urlText)

        #画像詳細ページから画像srcの取得
        imgElement = driver.find_element(By.XPATH,"/html/body/div[1]/main/div[2]/div/section/div/div[1]/div[1]/div[1]/div/img")  
        imgUrl = imgElement.get_attribute("src")

        #画像保存(画像URLからバイナリデータ取得)
        with urllib.request.urlopen(imgUrl) as rf:
            img_data = rf.read()
            #ファイル書き込み
            fileName = str(getingDate) + "_" + str(i+1)
            with open (dpath + dirMonth + fileName + ".webp","wb") as f :
                f.write(img_data)

        i = i + 1

        monthUrl = "https://aipri.jp/mypage/myphoto/?setDate=" + str(getingDate)
        driver.get(monthUrl)

download()
