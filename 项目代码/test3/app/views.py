from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from . import models
from django.db.models import F
import json
import numpy as np
import matplotlib.pyplot as plt
from django.contrib import messages
from django.shortcuts import redirect
# from pyecharts.charts import Bar


# 陈潇阳编写
#房价预测的函数
def file2matrix(filename):
    fr = open(filename)
    arrayolines = fr.readlines()
    numberoflines = len(arrayolines)
    returnmat = np.zeros((numberoflines, 2))
    index = 0
    for line in arrayolines:
        line = line.strip()
        listfromline = line.split(' ')
        listfromline = list(map(float, listfromline))
        returnmat[index, :] = listfromline[0:2]
        index = index + 1
    return returnmat, numberoflines



def plot_scatter(*args):
    fig = plt.figure()
    ax = fig.add_subplot(111)
    ax.scatter(args[0][:, 0], args[0][:, 1])
    plt.xlabel("year")
    plt.ylabel("money")
    if len(args) != 1:
        plt.plot(args[0][:, 0], args[1], '-')
    #plt.show()


# if __name__ == "__main__":
#     returnmat, _ = file2matrix("../city.txt")
#     m = returnmat.shape[0]
#     X = np.column_stack((np.ones(m), returnmat[:, 0].reshape(m, 1)))
#     theta = np.ones((2, 1))
#     plot_scatter(returnmat, np.dot(X, theta))


def normalizefeature(x):
    x_norm = x
    mu = np.mean(x)
    sigma = np.std(x)
    for i in range(x.shape[1]):
        x_norm[:, i] = (x[:, i] - mu) / sigma
    return x_norm, mu, sigma



def computecost(X, y, theta):
    m = X.shape[0]
    J = 1.0 * np.sum(np.square(np.dot(X, theta) - y)) / (2 * m)
    return J


def gd(X,y,theta,numiter,lr):
    J_history=[]
    m=X.shape[0]
    for i in range(numiter):
        J_history.append(computecost(X,y,theta))
        theta=theta-lr*np.dot(X.T,(np.dot(X,theta)-y))/m
    return theta,J_history


# 施立耀，刘亦凡编写
#房价排行初始界面函数
# Create your views here.
def ranking(request):
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request, "ranking.html",{"username":username,"charger":charger})


#房价排行的局部替换函数
def ranking_show(request):
    global sel
    cityRanking = request.POST.get('cityRanking')
    #去掉市字
    cityRanking = cityRanking[:-1]
    districtRanking = request.POST.get('districtRanking')
    districtRanking = districtRanking[:-1]
    # 开始选取小区信息 城市 区 小区 地址 类型 房价 属性的排序
    sel = models.Community.objects.values("communityCityName","communityDistrictName","communityName","communityLocation","usage","communityPrice").filter(communityCityName=cityRanking,communityDistrictName=districtRanking).order_by('-communityPrice')[:10]
    sel = list(sel)
    i = 0
    selLength = len(sel)
    while i < selLength:
        sel[i]['ranking'] = i + 1
        i = i + 1
    return render(request,"rankingShare.html", {"dataRanking":sel})


#首页初始界面函数
def index(request):
    user=models.Customer.objects.get(customerName=username)
    charger=user.charger
    return render(request, "index.html",{"username":username,"charger":charger})


#房源推荐初始界面函数
def recommend(request):
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request,"recommend.html",{"username":username,"charger":charger})

#房源推荐局部替换
def recommend_show(request):
    #sel是筛选出来的数据库字段集合
    global usage, prices, sel
    # pro = "河南省"
    city = request.POST.get('city')
    city = city[:-1]
    district = request.POST.get('district')
    district = district[:2]
    usage = "普通住宅"
    prices = request.POST.get('price')
    if usage != None:
        # usage = str(usage)
        prices = int(prices)
        if prices == 1:
            sel = models.Community.objects.values("communityName", "communityLocation", "usage","communityPrice").filter(communityPrice__range=(5000.00, 10000.00), usage=usage, communityCityName=city, communityDistrictName=district).order_by('-communityPrice')[:10]
        elif prices == 2:
            sel = models.Community.objects.values("communityName", "communityLocation", "usage","communityPrice").filter(communityPrice__range=(10000.00, 20000.00), usage=usage, communityCityName=city,communityDistrictName=district).order_by('-communityPrice')[:10]
        elif prices == 3:
            sel = models.Community.objects.values("communityName", "communityLocation", "usage","communityPrice").filter(communityPrice__range=(20000.00, 40000.00), usage=usage, communityCityName=city,communityDistrictName=district).order_by('-communityPrice')[:10]
        elif prices == 4:
            sel = models.Community.objects.values("communityName", "communityLocation", "usage","communityPrice").filter(communityPrice__range=(40000.00, 80000.00), usage=usage, communityCityName=city,communityDistrictName=district).order_by('-communityPrice')[:10]
        elif prices == 5:
            sel = models.Community.objects.values("communityName", "communityLocation", "usage", "communityPrice").filter(communityPrice__gt=80000.00, usage=usage, communityCityName=city, communityDistrictName=district).order_by('-communityPrice')[:10]

    # 名字 地址 用途 均价
    # sel = models.Community.objects.values("communityName","communityLocation","usage","communityPrice")
    sel = list(sel)
    return render(request,"share.html", {"data":sel})


# 注册界面初始化代码
def register(request):
    usrn = ''
    pwd1 = ''
    pwd2 = ''
    if 'username' in request.GET:
        usrn = request.GET['username']
    if 'pwd1' in request.GET:
        pwd1 = request.GET['pwd1']
    if 'pwd2' in request.GET:
        pwd2 = request.GET['pwd2']
    if pwd1 == pwd2 and pwd1 != '' and pwd2 != '':
        for existed in models.Customer.objects.all():
            if existed.customerName == usrn:
                errorMsg = "用户名已存在！"
                return render(request, "register.html", locals())
        models.Customer.objects.create(
            customerPassword=pwd1,
            customerName=usrn,
        )
        return redirect("../login")
    else:
        if usrn != '' and pwd1 != '' and pwd2 != '':
            errorMsg = "两次输入密码不匹配！"
    return render(request, "register.html", locals())

username = '待加载'


# 登录界面初始化代码
def login(request):
    global username
    usrn=''
    pwd =''
    if 'usrname' in request.GET:
        usrn = request.GET['usrname']
    if 'pwd' in request.GET:
        pwd = request.GET['pwd']
    customer_list = models.Customer.objects.all()
    for customer in customer_list:
        if customer.customerName == usrn and customer.customerPassword == pwd:
            username = usrn
            return redirect('../index')
    if pwd!='' and usrn!='':
        errorMsg="用户名或密码不正确！"
    return render(request, 'login.html',locals())

#房价信息界面初始化函数
def houseinfo(request):
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request,"houseinfo.html",{"username":username,"charger":charger})

# 田国庆参与编写
# 城市房价界面局部替换函数
def houseinfo_change(request):
    # cityName = request.POST.get('city')
    cityName = request.POST.get('city')
    cityName = cityName[:-1]
    year = request.POST.get('year')
    year = year[:4]
    year = int(year)
    city = {"city":cityName,"year":year}
    cityPrice = {"mouth": "price"}  # cityPrice存储的是城市一年的数据，格式如左所示
    cityPrice.clear()
    # 从数据库中读取与city和year对应的一年十二个月的房价
    for object in models.City.objects.all():
        if object.cityName == city["city"] and object.cityYear == city["year"]:
            if object.cityMonth == 1:
                cityPrice["一月"] = int(object.cityPrice)
            if object.cityMonth == 2:
                cityPrice["二月"] = int(object.cityPrice)
            if object.cityMonth == 3:
                cityPrice["三月"] = int(object.cityPrice)
            if object.cityMonth == 4:
                cityPrice["四月"] = int(object.cityPrice)
            if object.cityMonth == 5:
                cityPrice["五月"] = int(object.cityPrice)
            if object.cityMonth == 6:
                cityPrice["六月"] = int(object.cityPrice)
            if object.cityMonth == 7:
                cityPrice["七月"] = int(object.cityPrice)
            if object.cityMonth == 8:
                cityPrice["八月"] = int(object.cityPrice)
            if object.cityMonth == 9:
                cityPrice["九月"] = int(object.cityPrice)
            if object.cityMonth == 10:
                cityPrice["十月"] = int(object.cityPrice)
            if object.cityMonth == 11:
                cityPrice["十一月"] = int(object.cityPrice)
            if object.cityMonth == 12:
                cityPrice["十二月"] = int(object.cityPrice)
    # 从数据库中读取city对应的各区的房价
    districts = models.District.objects.filter(districtCityName=cityName)
    num = len(districts)  # 区的个数
    districts = models.District.objects.values("districtName", "instantPrice").filter(districtCityName=cityName)
    districts = list(districts)
    disPrice = {}
    while num >= 0:
        key = districts[num - 1]["districtName"]
        value = districts[num - 1]["instantPrice"]
        disPrice[key] = value
        num -= 1
    array = [{"user":"sly","code":"123"},{"user":"qwe","code":"345"},]
    data = {'cityDict': cityPrice,'disDict': disPrice,'Dictlist':array}
    asd = json.dumps(data,ensure_ascii=False)
    return HttpResponse(json.dumps(data,ensure_ascii=False), content_type='application/json', charset='utf-8')

#房价对比页面初始化代码
def compare(request):
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request,"compare.html",{"username":username,"charger":charger})


# 房价对比界面局部替换代码
def compare_show(request):
    cityName1 = request.POST.get('city1')
    cityName1 = cityName1[:-1]
    cityName2 = request.POST.get('city2')
    cityName2 = cityName2[:-1]
    city1 = {"city": cityName1, "year": 2018}
    city2 = {"city": cityName2, "year": 2018}
    cityPrice1 = {"mouth": "price"}  # cityPrice1存储的是城市一年的数据，格式如左所示
    cityPrice1.clear()
    # 从数据库中读取与city1和year对应的一年十二个月的房价
    for object in models.City.objects.all():
        if (object.cityName) == city1["city"] and object.cityYear == city1["year"]:
            if object.cityMonth == 1:
                cityPrice1["一月"] = int(object.cityPrice)
            if object.cityMonth == 2:
                cityPrice1["二月"] = int(object.cityPrice)
            if object.cityMonth == 3:
                cityPrice1["三月"] = int(object.cityPrice)
            if object.cityMonth == 4:
                cityPrice1["四月"] = int(object.cityPrice)
            if object.cityMonth == 5:
                cityPrice1["五月"] = int(object.cityPrice)
            if object.cityMonth == 6:
                cityPrice1["六月"] = int(object.cityPrice)
            if object.cityMonth == 7:
                cityPrice1["七月"] = int(object.cityPrice)
            if object.cityMonth == 8:
                cityPrice1["八月"] = int(object.cityPrice)
            if object.cityMonth == 9:
                cityPrice1["九月"] = int(object.cityPrice)
            if object.cityMonth == 10:
                cityPrice1["十月"] = int(object.cityPrice)
            if object.cityMonth == 11:
                cityPrice1["十一月"] = int(object.cityPrice)
            if object.cityMonth == 12:
                cityPrice1["十二月"] = int(object.cityPrice)
    cityPrice2 = {"mouth": "price"}  # cityPrice2存储的是第二个城市一年的数据，格式如左所示
    cityPrice2.clear()
    # 从数据库中读取与city2和year对应的一年十二个月的房价
    for object in models.City.objects.all():
        if (object.cityName) == city2["city"] and object.cityYear == city2["year"]:
            if object.cityMonth == 1:
                cityPrice2["一月"] = int(object.cityPrice)
            if object.cityMonth == 2:
                cityPrice2["二月"] = int(object.cityPrice)
            if object.cityMonth == 3:
                cityPrice2["三月"] = int(object.cityPrice)
            if object.cityMonth == 4:
                cityPrice2["四月"] = int(object.cityPrice)
            if object.cityMonth == 5:
                cityPrice2["五月"] = int(object.cityPrice)
            if object.cityMonth == 6:
                cityPrice2["六月"] = int(object.cityPrice)
            if object.cityMonth == 7:
                cityPrice2["七月"] = int(object.cityPrice)
            if object.cityMonth == 8:
                cityPrice2["八月"] = int(object.cityPrice)
            if object.cityMonth == 9:
                cityPrice2["九月"] = int(object.cityPrice)
            if object.cityMonth == 10:
                cityPrice2["十月"] = int(object.cityPrice)
            if object.cityMonth == 11:
                cityPrice2["十一月"] = int(object.cityPrice)
            if object.cityMonth == 12:
                cityPrice2["十二月"] = int(object.cityPrice)
    #开始下面的两个城市的各个区的数据
    #指定为最新的年份
    districtInfo = models.District.objects.values("districtCityName","districtName", "yearOnYearRatio","linkRelativeRatio","instantPrice").filter(districtYear = 2019, districtMonth= 6,districtCityName__in = [cityName1,cityName2]).order_by("-instantPrice")[:100]
    districtInfo = list(districtInfo)
    listLength = len(districtInfo)
    i = 0
    while i < listLength:
        districtInfo[i]['ranking'] = i + 1
        i = i + 1
    mydata = {"cityPrice1":cityPrice1,"cityPrice2":cityPrice2,"district":districtInfo}
    return HttpResponse(json.dumps(mydata,ensure_ascii=False), content_type='application/json', charset='utf-8')


#房价对比局部替换表格函数
def compare_table(request):
    cityName1 = request.POST.get('city1')
    cityName1 = cityName1[:-1]
    cityName2 = request.POST.get('city2')
    cityName2 = cityName2[:-1]
    #     #指定最新的年份
    districtInfo = models.District.objects.values("districtCityName","districtName", "yearOnYearRatio","linkRelativeRatio","instantPrice").filter(districtYear = 2019, districtMonth= 6,districtCityName__in = [cityName1,cityName2]).order_by("-instantPrice")[:100]
    districtInfo = list(districtInfo)
    listLength = len(districtInfo)
    i = 0
    while i < listLength:
        districtInfo[i]['ranking'] = i + 1
        i = i + 1
    return render(request,"compare-table.html",{"districtInfo":districtInfo})


#房价预测界面初始化函数
def predict(request):
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request, "predict.html",{"username":username,"charger":charger})


#房价预测界面局部替换函数
def predict_show(request):
    cityPredict = request.POST.get('cityPredict')
    cityPredict = cityPredict[:-1]
    history = models.City.objects.values("cityPrice").filter(cityName=cityPredict).order_by('cityYear', 'cityMonth')
    history = list(history)
    history = history[-12:]
    with open('city.txt', "w") as date_obj:
        pass
    i = 0
    for items in history:
        for key , value in items.items():
            with open('./city.txt', "a") as data_obj:
                i = i +1
                data_obj.write(str(i)+' '+str(value)+'\n')

    #使用房价的预测模型函数
    returnmat, m = file2matrix("D://QQ下载//test3//city.txt")

    plot_scatter(returnmat)
    x_norm, mu, sigma = normalizefeature(returnmat[:, 0].reshape(returnmat.shape[0], 1))

    X = np.column_stack((np.ones(m), x_norm))
    # print(X)
    y = returnmat[:, 1].reshape(m, 1)
    # print(y)

    theta = np.zeros((2, 1))

    iterations = 5
    lr = 1

    theta, J_history = gd(X, y, theta, iterations, lr)

    plot_scatter(returnmat, np.dot(X, theta))

    plt.plot(np.arange(iterations), J_history)
    plt.xlabel("itera")
    plt.ylabel('J_loss')
    #plt.show()
    #下面是最新的数据
    future = np.dot([1, (13 - mu) / sigma], theta)[0]
    future = int(future)

    report = {}
    report['2018.7'] = history[0]['cityPrice']
    report['2018.8'] = history[1]['cityPrice']
    report['2018.9'] = history[2]['cityPrice']
    report['2018.10'] = history[3]['cityPrice']
    report['2018.11'] = history[4]['cityPrice']
    report['2018.12'] = history[5]['cityPrice']
    report['2019.1'] = history[6]['cityPrice']
    report['2019.2'] = history[7]['cityPrice']
    report['2019.3'] = history[8]['cityPrice']
    report['2019.4'] = history[9]['cityPrice']
    report['2019.5'] = history[10]['cityPrice']
    report['2019.6'] = history[11]['cityPrice']
    report['2019.7(预测)'] = future
    predictdata = {"predictdata":report}
    return HttpResponse(json.dumps(predictdata,ensure_ascii=False), content_type='application/json', charset='utf-8')


postID = 0 #评论的id，用于确定详细显示哪个帖子的内容
#社区界面初始化函数
def community(request):
    ctitle = ''
    carticle = ''
    username1 = username
    if 'title' in request.GET:
        ctitle = request.GET['title']
    if 'article' in request.GET:
        carticle = request.GET['article']

    global postID
    postID = request.POST.get("postid")
    posts = models.Post.objects.all().order_by("-id")
    for existed in models.Post.objects.all():
        if existed.postName == ctitle:
            return render(request, "community.html", locals())

    if ctitle != '' and carticle != '':
        models.Post.objects.create(
            postName=ctitle,
            postContent=carticle,
        )
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request, "community.html", locals())


comment=''#用于存放评价
#回复评论界面函数
def profile(request):
    global comment
    username1 = username
    if 'content' in request.GET:
        comment = request.GET['content']
    post = models.Post.objects.filter(id=postID)
    comments = models.Comment.objects.filter(commentPostID=postID)
    for existed in models.Comment.objects.all():
        if existed.commentContent == comment:
            return render(request, "profile.html", locals())

    if comment != '':
        models.Comment.objects.create(
            commentContent=comment,
            commentPostID=postID,
        )
    comments = models.Comment.objects.filter(commentPostID=postID)
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request, "profile.html", locals())


#管理员用户管理界面
def usermanage(request):
    username1 = username
    deleteid = 0
    myid2 = request.POST.get("id2")
    if type(myid2) == str:
        deleteid = int(myid2)
    for existed in models.Customer.objects.all():
        if deleteid == existed.id:
            models.Customer.objects.get(id=int(myid2)).delete()
            break
    customers = models.Customer.objects.all()
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request, "usermanage.html", locals())

#管理员帖子管理界面
def community_m(request):
    username1 = username
    deleteid = 0
    myid = request.POST.get("id")
    if type(myid) == str:
        deleteid = int(myid)
    for existed in models.Post.objects.all():
        if deleteid == existed.id:
            models.Post.objects.get(id=int(myid)).delete()
            break
    posts = models.Post.objects.all()
    user = models.Customer.objects.get(customerName=username)
    charger = user.charger
    return render(request, "community_m.html", locals())

# def switch(request):
#     user = models.Customer.objects.get(customerName=username)
#     charger = user.charger
#     return render(request,"switch.html",{"username":username,"charger":charger})
#
#
# def datamanage(request):
#     user = models.Customer.objects.get(customerName=username)
#     charger = user.charger
#     return render(request,"datamanage.html",{"username":username,"charger":charger})









