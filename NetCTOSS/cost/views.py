from django.shortcuts import render

# Create your views here.
def cost_views(request):
    return render(request,'fee/fee_list.html')
