from django.shortcuts import render
from django.http import JsonResponse

from .forms import UploadForm
from .models import File

# Create your views here.

def index(request):
    form = UploadForm(request.POST or None, request.FILES or None)
    files = File.objects.order_by('-pk')
    context = {
        'form' : form,
        'files' : files,
    }
    if request.is_ajax():
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'All good...'})
        # else:
            # return render(request, 'main/error.html', context)

    return render(request, 'main/index.html', context)
