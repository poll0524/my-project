# -*- coding: utf-8 -*-
"""
Created on Tue Nov 27 16:01:53 2018

@author: mi
"""

import requests
from lxml import etree
import urllib.parse

class ImageSpider:
    def __init__(self):
        self.baseurl = 'http://tieba.baidu.com/f?kw='
        self.headers = {'User-Agent':'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)'}
    
    #获取所有帖子url列表
    def getPageUrl(self,url):
        res = requests.get(url,headers = self.headers)
        res.encoding = 'utf-8'
        html = res.text
#        提取页面中所有帖子的URL
        parseHTML = etree.HTML(html)
        t_list = parseHTML.xpath('//div[@class="t_con cleafix"]/div/div/div/a/@href')
        
        for t_link in t_list:
            t_url = 'http://tieba.baidu.com' + t_link
            self.getImageUrl(t_url)
            
    #获取每个帖子中图片的url列表
    def getImageUrl(self,t_url):
        res = requests.get(t_url,headers = self.headers)
        res.encoding = 'utf-8'
        html = res.text
        
        parseHTML = etree.HTML(html)
        img_list = parseHTML.xpath('//div[@class="d_post_content j_d_post_content  clearfix"]/img/@src|//embed/@data-video')
#        img_list = parseHTML.xpath('//embed/@data-video')
        
        for img_link in img_list:
            self.writeImage(img_link)

    
    
    #解析页面
    #保存图片
    def writeImage(self,img_link):
        res = requests.get(img_link,headers = self.headers)
        res.encoding = 'utf-8'
        html = res.content
        filename = img_link[-8:]
        with open(filename,'wb') as f:
            f.write(html)
            print(filename,'下载成功')
            
    #主函数
    def workOn(self):  
        name = input('请输入贴吧名:')
        begin = int(input('请输入起始页:'))
        end = int(input('请输入结束页'))
        for pn in range(begin,end+1):
#            拼接贴吧页面url
            pn = (pn-1)*50
            kw = {'kw':name}
            kw = urllib.parse.urlencode(kw)
            fullurl = self.baseurl+kw+'&pn='+str(pn)
            
            self.getPageUrl(fullurl)
            
    
    
if __name__ == "__main__":
    spider = ImageSpider()
    spider.workOn()