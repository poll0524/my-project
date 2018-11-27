# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-11-20 12:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cost',
            fields=[
                ('costId', models.AutoField(db_column='cost_Id', primary_key=True, serialize=False, verbose_name='资费ID')),
                ('costName', models.CharField(db_column='name', max_length=80, verbose_name='资费名')),
                ('baseDuration', models.IntegerField(blank=True, db_column='base_duration', null=True, verbose_name='基本时长')),
                ('baseCost', models.DecimalField(blank=True, db_column='base_cost', decimal_places=2, max_digits=6, null=True, verbose_name='基本费用')),
                ('unitCost', models.DecimalField(blank=True, db_column='unit_cost', decimal_places=2, max_digits=4, null=True, verbose_name='单位费用')),
                ('status', models.BooleanField(db_column='status', verbose_name='状态')),
                ('descr', models.CharField(blank=True, db_column='descr', max_length=300, null=True, verbose_name='描述')),
                ('creatime', models.DateTimeField(db_column='creatime', default=django.utils.timezone.now, verbose_name='创建时间')),
                ('startime', models.DateTimeField(blank=True, db_column='startime', null=True, verbose_name='开通时间')),
                ('costType', models.CharField(db_column='cost_type', max_length=4, verbose_name='资费类型')),
            ],
            options={
                'verbose_name': '资费',
                'verbose_name_plural': '资费',
                'db_table': 'cost',
            },
        ),
    ]