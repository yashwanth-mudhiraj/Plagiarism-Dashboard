from django.urls import re_path
from backendDash.settings import MEDIA_ROOT, MEDIA_URL
from dashAPI import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    re_path(r'^courseReg/$',views.courseRegApi),
    re_path(r'^courseReg/([0-9]+)$',views.courseRegApi),
    re_path(r'^profDetails/$',views.profDetailsApi),
    re_path(r'^profDetails/([0-9]+)$',views.profDetailsApi),
    re_path(r'^stuDetails/$',views.stuDetailsApi),
    re_path(r'^stuDetails/([0-9]+)$',views.stuDetailsApi),
    re_path(r'^assignments/$',views.assgnApi),
    re_path(r'^assignments/([0-9]+)$',views.assgnApi),

    re_path(r'^SaveFile/$', views.SaveFile)
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)