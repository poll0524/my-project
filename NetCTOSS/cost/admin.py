from django.contrib import admin
from .models import Cost

# Register your models here.
class CostAdmin(admin.ModelAdmin):
    list_display = ['costName','status','costType']

admin.site.register(Cost,CostAdmin)
