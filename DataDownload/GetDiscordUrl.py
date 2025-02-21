# インストールした discord.py を読み込む
import discord
import json
import os

# 自分のBotのアクセストークンに置き換えてください
TOKEN = ''
CHANNEL_ID_primagi = {"プリマジ":1338348814171639859}
CHANNEL_ID_aipri = {"ポッピンハート":1263454348512333834,
                    "ミラクルムーン":1263454391873175655,
                    "スカーレットバタフライ":1263454431022809088,
                    "ロゼッション":1263454457874743367,
                    "フラワーマーチ":1263454489952780329,
                    "レインボーキャンディ":1263454523494629417,
                    "ベアベアベア":1263454645309800499,
                    "ラブマイミュージック":1263454682961936386,
                    "プリティーコレクション":1263454721075581009,
                    "プリズムストーン":1263454745830363148,
                    "クリスタルバース":1263460076107202601}

# 接続に必要なオブジェクトを生成
client = discord.Client(intents=discord.Intents.all())

def fileWrite(dict_data):
    #コーデの情報のJson更新
    with open("./" + "url.json", "w",encoding = "utf-8")  as file:
        json.dump(dict_data,file,indent = 2,ensure_ascii=False)
    #コーデの情報のJsonをJSに変換して変更
    with open("./" + "url.json","r",encoding = "utf-8") as file:
        s = file.read()
        with open ("./" + "url.js", "w",encoding = "utf-8") as file:
            file.write("let url =")
            file.write(s)

#Bot起動時の処理
@client.event
async def on_ready():
    # 起動したらターミナルにログイン通知が表示される
    print('ログインしました')


@client.event
async def on_message(message):

    if message.author.bot:
        return
    
    if message.content == "/プリマジ":

        dict_data = {"url":""}
        list_data = []

        #　チャンネルからメッセージを取得する 
        channel = client.get_channel(CHANNEL_ID_primagi["プリマジ"])
        async for messages in channel.history(limit=1000):
            name = messages.content
            url = messages.attachments[0].url
            dict_msg = {}
            dict_msg.setdefault("name",name)
            dict_msg.setdefault("url",url)
            list_data.append(dict_msg)

        dict_data["url"] = list_data
        fileWrite(dict_data)

        await message.channel.send(file=discord.File("url.js", filename='url.js'))

    elif message.content == "/アイプリ":
        dict_data = {"url":""}
        list_data = []

        #　チャンネルからメッセージを取得する 
        for id in CHANNEL_ID_aipri.values():
            channel = client.get_channel(id)
            async for messages in channel.history(limit=1000):
                name = messages.content
                print(name)
                url = messages.attachments[0].url
                dict_msg = {}
                dict_msg.setdefault("name",name)
                dict_msg.setdefault("url",url)
                list_data.append(dict_msg)


        dict_data["url"] = list_data
        fileWrite(dict_data)

        await message.channel.send(file=discord.File("url.js", filename='url.js'))


# Botの起動とDiscordサーバーへの接続
client.run(TOKEN)

