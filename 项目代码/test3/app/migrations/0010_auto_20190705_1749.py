# Generated by Django 2.2.3 on 2019-07-05 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20190705_1747'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='communityDistrictID',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customer',
            name='charger',
            field=models.SmallIntegerField(choices=[(1, '管理员'), (2, '普通用户')], default=2),
        ),
    ]
