# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : daily_recommended_song.py
@Project            : S003_WangYi_Music
@CreateTime         : 2025/1/12 10:53
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/1/12 10:53
@Version            : 1.0
@Description        : None
"""
import execjs
import requests

cookies = {
    'NTES_P_UTID': '9cbVR7YaULdNkh7EveYAUAHjGtu6xn2r|1723680676',
    'P_INFO': 'biaobro@163.com|1723680676|0|mail163|00&99|bej&1723647087&mail163#bej&null#10#0#0|&0|mail163|biaobro@163.com',
    'nts_mail_user': 'biaobro@163.com:-1:1',
    '_ntes_origin_from': 'google',
    'NMTID': '00OvmzaV4OIuhVwoUqPhnv78is21qUAAAGUWGE6tg',
    '_iuqxldmzr_': '32',
    '_ntes_nnid': '5b5e7787ebf5e761569ef6b0301df071,1736649554638',
    '_ntes_nuid': '5b5e7787ebf5e761569ef6b0301df071',
    'WEVNSM': '1.0.0',
    'WNMCID': 'vbehmi.1736649554906.01.0',
    'WM_NI': 'EQio7qxGNdM8Yi5qXmQZGxNDusmS4qZR10ZqIhim91Ty59b8jzKjTxz1kw0Fvon4Kh9Q%2BSvMtPvoFGidHcdoHPs%2BS71aWLmSkxp7xMLqfXjAvolCwqaOrB5HiJ87bCuNNXY%3D',
    'WM_NIKE': '9ca17ae2e6ffcda170e2e6eea4c67aedafbeb1c174abb88fa6c45b839a8a87d64681bf9e86c546a9989d94d32af0fea7c3b92a878fa790b67bbc998285d0349bb7fb92db6793868999cd50b7ada3b4b77b9a8effd1d97b8bb8a78ebc3b98a7fbdae134aaa6858bd774baefa598b34eb6b1a2d5ca64fb8fe5b4f547b890ba90c54dabbc8884e7658c90bdccd23df3bf99adf059a9a8c0d8fb4790afaab9e94bb6b1a4a4f67ba391bea3b844ab96f8d8e149b79282b9dc37e2a3',
    'ntes_utid': 'tid._.akJiVJkWY6FFRgFAVEPWZDfQKBZ1entO._.0',
    'sDeviceId': 'YD-2Nj%2FhdViOYdBU0BUBUODIXeBKQc1e3o2',
    '__snaker__id': 'hYVqnoPW3Sua3caN',
    'WM_TID': 'uSwf1189LFZAAAQRAFeGMTfQPRNgCXs4',
    'gdxidpyhxdE': 'IWbKMCsxtfatXZA3Y7CRkLGW7BPfAsxk6mbwwM7YTNeOgCs4CC5pjo%2F1qvujMWSXuqncX3P7%2FDVqP1was9RxPlDnsJu0nZ6M2SQbxQ9f2pp6TYGv2pG9wyk%2B3GdYNMjxDEAmHTf8mqr%2Bb5vACH2VnJ%2Fh6%2Fbr5h%2BwhpZA6SWbnV7byldt%3A1736650642034',
    'MUSIC_U': '00D5E5936CA9A741C6D76B84278BFC6BCD1F6E84B437102BCA574330486C08DDD125BF57D73141D363AFC8DD85D0EAC49FC70341F6D72E3A61AEE7D0574E5AF07DD69E7A39D48A07413083AD9D614028DC31A80062A239FF71F400F21B9D80B312A195F28A8525430A7032B77D84EACE9611569BC2772687967FB7C89A7983D822EF3A3FDBC3545876774B5D8FEC10B1E93F6755CD47A2CEE31FB131D04B7BC477C2F0C964C40A07811CCDDD39685A4B66B14673D0D711EDC9B2CA20686AAF8B17F948BE67DC012C796CC6B89119312BECF8DF269BFEF863B0F794213D1364AAA8078EEB4A491B604062E7DB72EF78C04BDEE1634AD03F5FA555E271FE352505B87431F87D079705CBDB02C9F36E522A7E4C4E3977FCEA4FCA73D2E9F27BA82B550C55F427F90FD1E021DEE4F28293EA31A6BD7F4DEC135D3BB0F186F4639BDA806F449688EEF03AC3A5C3E9CC22F4C8C9212132669DFA00BCD69AAC4205E8880A',
    '__csrf': '90034247236ad3bce9419c4ba49b7da9',
    'ntes_kaola_ad': '1',
    'playerid': '97427375',
    'JSESSIONID-WYYY': 'WfvA772Ovagt3pawBX9ZYEHB3kuIYdeg4vdDNhZ7s8VVUeZzJMAWWNtTMbiCJY%5C65%2F6O0HXavrpwY5UOhB8YTVZScO%2BKuKrmpDWvIaEN4Q%5CR42w5CXVqAG0ZtpcdUasmiwiXGPHksTKjs7zNFJq1xD5o%2BEt5WuzSu%5CoN5%2FbSdigrmKnp%3A1736683555102',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'cache-control': 'no-cache',
    # Requests sorts cookies= alphabetically
    # 'cookie': 'NTES_P_UTID=9cbVR7YaULdNkh7EveYAUAHjGtu6xn2r|1723680676; P_INFO=biaobro@163.com|1723680676|0|mail163|00&99|bej&1723647087&mail163#bej&null#10#0#0|&0|mail163|biaobro@163.com; nts_mail_user=biaobro@163.com:-1:1; _ntes_origin_from=google; NMTID=00OvmzaV4OIuhVwoUqPhnv78is21qUAAAGUWGE6tg; _iuqxldmzr_=32; _ntes_nnid=5b5e7787ebf5e761569ef6b0301df071,1736649554638; _ntes_nuid=5b5e7787ebf5e761569ef6b0301df071; WEVNSM=1.0.0; WNMCID=vbehmi.1736649554906.01.0; WM_NI=EQio7qxGNdM8Yi5qXmQZGxNDusmS4qZR10ZqIhim91Ty59b8jzKjTxz1kw0Fvon4Kh9Q%2BSvMtPvoFGidHcdoHPs%2BS71aWLmSkxp7xMLqfXjAvolCwqaOrB5HiJ87bCuNNXY%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eea4c67aedafbeb1c174abb88fa6c45b839a8a87d64681bf9e86c546a9989d94d32af0fea7c3b92a878fa790b67bbc998285d0349bb7fb92db6793868999cd50b7ada3b4b77b9a8effd1d97b8bb8a78ebc3b98a7fbdae134aaa6858bd774baefa598b34eb6b1a2d5ca64fb8fe5b4f547b890ba90c54dabbc8884e7658c90bdccd23df3bf99adf059a9a8c0d8fb4790afaab9e94bb6b1a4a4f67ba391bea3b844ab96f8d8e149b79282b9dc37e2a3; ntes_utid=tid._.akJiVJkWY6FFRgFAVEPWZDfQKBZ1entO._.0; sDeviceId=YD-2Nj%2FhdViOYdBU0BUBUODIXeBKQc1e3o2; __snaker__id=hYVqnoPW3Sua3caN; WM_TID=uSwf1189LFZAAAQRAFeGMTfQPRNgCXs4; gdxidpyhxdE=IWbKMCsxtfatXZA3Y7CRkLGW7BPfAsxk6mbwwM7YTNeOgCs4CC5pjo%2F1qvujMWSXuqncX3P7%2FDVqP1was9RxPlDnsJu0nZ6M2SQbxQ9f2pp6TYGv2pG9wyk%2B3GdYNMjxDEAmHTf8mqr%2Bb5vACH2VnJ%2Fh6%2Fbr5h%2BwhpZA6SWbnV7byldt%3A1736650642034; MUSIC_U=00D5E5936CA9A741C6D76B84278BFC6BCD1F6E84B437102BCA574330486C08DDD125BF57D73141D363AFC8DD85D0EAC49FC70341F6D72E3A61AEE7D0574E5AF07DD69E7A39D48A07413083AD9D614028DC31A80062A239FF71F400F21B9D80B312A195F28A8525430A7032B77D84EACE9611569BC2772687967FB7C89A7983D822EF3A3FDBC3545876774B5D8FEC10B1E93F6755CD47A2CEE31FB131D04B7BC477C2F0C964C40A07811CCDDD39685A4B66B14673D0D711EDC9B2CA20686AAF8B17F948BE67DC012C796CC6B89119312BECF8DF269BFEF863B0F794213D1364AAA8078EEB4A491B604062E7DB72EF78C04BDEE1634AD03F5FA555E271FE352505B87431F87D079705CBDB02C9F36E522A7E4C4E3977FCEA4FCA73D2E9F27BA82B550C55F427F90FD1E021DEE4F28293EA31A6BD7F4DEC135D3BB0F186F4639BDA806F449688EEF03AC3A5C3E9CC22F4C8C9212132669DFA00BCD69AAC4205E8880A; __csrf=90034247236ad3bce9419c4ba49b7da9; ntes_kaola_ad=1; playerid=97427375; JSESSIONID-WYYY=WfvA772Ovagt3pawBX9ZYEHB3kuIYdeg4vdDNhZ7s8VVUeZzJMAWWNtTMbiCJY%5C65%2F6O0HXavrpwY5UOhB8YTVZScO%2BKuKrmpDWvIaEN4Q%5CR42w5CXVqAG0ZtpcdUasmiwiXGPHksTKjs7zNFJq1xD5o%2BEt5WuzSu%5CoN5%2FbSdigrmKnp%3A1736683555102',
    'origin': 'https://music.163.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://music.163.com/',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
}

params = {
    'csrf_token': '90034247236ad3bce9419c4ba49b7da9',
}

# 将 cookie 字典转换成 字符串
cookie_list = [key + "=" + value for key, value in cookies.items()]
cookie = '; '.join(item for item in cookie_list)

# e3x=
# {
#     "cookie": true,
#     "type": "json",
#     "method": "POST",
#     "data": "logs=%5B%7B%22action%22%3A%22impress%22%2C%22json%22%3A%7B%22mspm%22%3A%22619df35ce51b6b383f5fafdb%22%2C%22page%22%3A%22mainpage%22%2C%22module%22%3A%22nav_bar%22%2C%22target%22%3A%22friends%22%2C%22reddot%22%3A%220%22%2C%22mainsite%22%3A%221%22%7D%7D%5D"
# }


ex3Data = "logs=%5B%7B%22action%22%3A%22recommendclick%22%2C%22json%22%3A%7B%22id%22%3A1400453707%2C%22alg%22%3A%22alg-music-rec-a3_recall-author-hpCover-unrestricted%22%2C%22scene%22%3A%22user-song%22%2C%22position%22%3A0%2C%22mainsite%22%3A%221%22%7D%7D%5D"
jsData = execjs.compile(open('core.js', encoding='utf-8').read()).call('getEncryptParams', ex3Data, cookie)


# data = {
#     'params': 'aVle+QVTwN4SXXobxC2tYhWcAzhGxewF9R6VIWL9s/E8A2vShfUu8AWxTa0iBaNLaaeynNZ0kgdyEysKIVX7CC+sguNll3CaNP/JDCv+0EYEqJU1oG5y4QIjhtVf8TpUHioxK1hF2PD7qQVmWrE6X+scy1P1BvbNVuMg9CTjM+kuNwmv+EX0VDFx7FJwPza2REPYGVDJip2zgHwztr8+7A==',
#     'encSecKey': '8b8909e264e938539e5fc711b6ddd7fcdd07bf699e8e5446218f393616afa2c5e8ee6398ef07ae28549d7ece77b0a74b14e2ec424fe6a773b3da45f39287a18f84d5cec8efd1c3822312b3ebc9186dad7c6aa0146a48a88bf70a161407ace9f74d1388142d3f7661d0ee18f011ab2931a272253dd52aea80d02b465b9ae5056b',
# }

data = {
    'params' : jsData['encText'],
    'encSecKey': jsData['encSecKey']
}

print(data)
response = requests.post('https://music.163.com/weapi/song/enhance/player/url/v1', params=params, cookies=cookies, headers=headers, data=data)
print(response.text)
