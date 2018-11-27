# -*- coding: utf-8 -*-
"""
Created on Tue Nov 27 17:05:36 2018

@author: mi
"""

import requests
import urllib.parse
from lxml import etree
import pymongo

class QiushiSpider:
    def __init__(self):
        self.baseurl = 'http://tieba.baidu.com/f?'
        self.headers = {'User-Agent':'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)'}
        
        #连接对象
        self.conn = pymongo.MongoClient('localhost',27017)
        
        self.db = self.conn['Qiushi']
        
        self.myset = self.db['qiushiinfo']
    
    #获取页面
    def getPage(self,url):
        res = requests.get(url,headers = self.headers)
        res.encoding = 'utf-8'
        html = res.text
        self.parsePage(html)
    
    #解析并存入数据库
    def parsePage(self,html):
        #创建解析对象
        parseHtml = etree.HTML(html)
        base_list = parseHtml.xpath('//div[contains(@id,"qiushi_tag_")]')
        for base in base_list:
            #用户昵称
            username = base.xpath('./div/a/h2')
            if len(username) == 0:
                username = '匿名用户'
            else:
                username = base.xpath('./div/a/h2')[0].text.strip()

            #段子内容
            content = base.xpath('.//div[@class="content"]/span')
            #好笑的数量
            laughNum = base.xpath('.//i')[0]
            #评论的数量
            pingNum = base.xpath('.//i')[1]
            
            d = {
                'username':username,
                'content':content[0].text.strip(),
                'laughNum':laughNum.text,
                'pingNum':pingNum.text,
                    }
            self.myset.insert(d)
            print('成功')
    
if __name__ == "__main__":
    spider = QiushiSpider()
    spider.getPage("https://www.qiushibaike.com/8hr/page/1/")
