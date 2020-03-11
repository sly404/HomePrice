from django.db import models
from django.utils import timezone
# 陈潇阳，刘亦凡，田国庆编写
class Customer(models.Model):
    customerName = models.CharField(max_length=50)
    customerPassword = models.CharField(max_length=50)
    # 是否是管理员
    chargerChoices = {
        (1, '管理员'),
        (2, '普通用户')
    }
    charger = models.SmallIntegerField(choices=chargerChoices, default=2)
    headImage = models.CharField(max_length=50)


class District(models.Model):
    districtCityName = models.CharField(max_length=20)
    districtName = models.CharField(max_length=20)
    instantPrice = models.IntegerField()
    # 同比
    yearOnYearRatio = models.CharField(max_length=20, default=None)
    # 环比
    linkRelativeRatio = models.CharField(max_length=20, default=None)
    districtYear = models.IntegerField(default=None)
    districtMonth = models.IntegerField(default=None)


class Community(models.Model):
    communityCityName = models.CharField(max_length=20)
    communityDistrictName = models.CharField(max_length=20)
    communityLocation = models.CharField(max_length=150)
    communityPrice = models.IntegerField(default=None)
    communityName = models.CharField(max_length=20)
    usage = models.CharField(max_length=50)
    #小区名字
    communityArea = models.IntegerField(default=None)

class City(models.Model):
    cityName = models.CharField(max_length=20)

    # 同比
    yearOnYearRatio = models.CharField(max_length=20, default=None)
    # 环比
    linkRelativeRatio = models.CharField(max_length=20, default=None)

    cityPrice = models.IntegerField()
    cityYear = models.IntegerField()
    cityMonth = models.IntegerField()


class Comment(models.Model):
    commentPostID = models.IntegerField()
    commentCustomerID = models.IntegerField(default=0)
    commentTime = models.CharField(max_length=50, default=timezone.localtime().strftime("%Y-%m-%d %H:%M:%S"))
    commentContent = models.CharField(max_length=500)


class Post(models.Model):
    postTime = models.CharField(max_length=50, default=timezone.localtime().strftime("%Y-%m-%d %H:%M:%S"))
    postName = models.CharField(max_length=50)
    postContent = models.CharField(max_length=500)
    postThumbUp = models.IntegerField(default=0)
    postComment = models.IntegerField(default=0)


# 成交量
class Amount(models.Model):
    turnover = models.IntegerField()
    amountYear = models.IntegerField()
    amountMonth = models.IntegerField()

