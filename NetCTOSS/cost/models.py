from django.db import models
from django.utils.timezone import now

# Create your models here.
# 创建资费模型
class Cost(models.Model):
    costId = models.AutoField(db_column='cost_Id',verbose_name='资费ID',primary_key=True)

    costName = models.CharField(db_column='name',max_length=80,verbose_name='资费名')

    baseDuration = models.IntegerField(db_column='base_duration' , null=True , blank=True , verbose_name='基本时长')

    baseCost = models.DecimalField(db_column='base_cost',max_digits=6,decimal_places=2,null=True,blank=True,verbose_name='基本费用')

    unitCost = models.DecimalField(db_column='unit_cost',max_digits=4,decimal_places=2,null=True,blank=True,verbose_name='单位费用')
    # 状态
    status = models.BooleanField(db_column='status', verbose_name='状态')
    # 描述
    descr = models.CharField(db_column='descr', max_length=300, null=True, blank=True, verbose_name='描述')

    creatime = models.DateTimeField(db_column='creatime',default=now,verbose_name='创建时间')

    startime = models.DateTimeField(db_column='startime',null=True,blank=True,verbose_name='开通时间')

    costType = models.CharField(db_column='cost_type',max_length=4,verbose_name='资费类型')

    def __str__(self):
        return self.costName

    class Meta:
        db_table = 'cost'
        verbose_name = '资费'
        verbose_name_plural = verbose_name





