# 编写人：蒋梓健
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2019-07-04 18:35:14
# Project: whbu_province


from pyspider.libs.base_handler import *
import re
import datetime

class Handler(BaseHandler):
    crawl_config = {
    }

    @every(minutes=24 * 60)
    def on_start(self):
        self.crawl('https://www.lianjia.com/city/', callback=self.index_page,validate_cert=False,fetch_type='js')
        
        
        
        

    @config(age=10 * 24 * 60 * 60)
    def index_page(self, response): #選擇地區頁面
        re_wubi = '(.*?)\n'
        for each in response.doc('.city_list_ul a').items():
            itme = each.parent().parent().parent().text()
            provin = re.search(re_wubi,itme,re.S)
            provin =provin.group(1)
            
            self.crawl(each.attr.href, callback=self.index2_page,validate_cert=False,fetch_type='js',save={'province': provin ,'area':each.text()})
            
            
                
     
    
    
    #選擇房價頁面
    @every(minutes=24 * 60)
    def index2_page(self,response): 
        for each in response.doc('.fr ul a').items():
            if(each.text() == '二手房' ):
                self.crawl(each.attr.href, callback=self.index3_page,validate_cert=False,fetch_type='js',save=response.save)
            else:
                continue
                
            
            
            
   
                   
               
    @every(minutes=24 * 60)
    def index3_page(self, response): #抓取頁面數(1-100)
        #for each in response.doc('.contentBottom > .fr a').items():
        for i in range(1,101):
            
            next = response.url+'pg'+str(i)
            self.crawl(next, callback=self.index_detail_page,validate_cert=False,fetch_type='js',save=response.save)
            break
            
    
    #進入爬取的頁面
    def index_detail_page(self,response):
        for each in response.doc('.clear > .title a').items():
            self.crawl(each.attr.href, callback=self.detail_page,validate_cert=False,fetch_type='js',save=response.save)
                                                                    
        
    @config(priority=2)
    def detail_page(self, response): #捉取資料的頁面
        content =response.text
        #城市名稱
        re_city = '<a href="/">(.*?)房产网</a>'
        city_srh = re.search(re_city,content,re.S)
        city=city_srh.group(1)
        
        #區名
        area = response.doc('.info > a:first-child').text()
        
        #當時房價
        home_price = response.doc('.unitPrice > span').text()
        
        #小區名
        litte_area=response.doc('.communityName > .info').text()
        
        #房屋用途
        re_home_using = 'class="transaction".*?<span class="label">房屋用途.*?<span>(.*?)</span>'
        home_using_srh = re.search(re_home_using,content,re.S)
        home_using=home_using_srh.group(1)
        
        #日期
        date_time=str(datetime.datetime.now().year)+'-'+str(datetime.datetime.now().month)+'-'+str(datetime.datetime.now().day)
        
        #大小
        size =response.doc('.area > .mainInfo').text()
        
        #地址
        address =response.doc('.areaName ').text()
        
        return {
             
            "title": response.doc('title').text(),
            "省份名":response.save['province'],
            "城市名":city+"市",
            "區名:":area+"区",
            "小區名":litte_area,
            "當時房價":home_price,
            "日期": date_time,     
            "用途":home_using,
            "大小":size,
            "地址":address
         
             }
