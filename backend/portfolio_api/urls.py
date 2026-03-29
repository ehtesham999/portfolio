from django.urls import path
from .views import SkillListAPIView, ProjectListAPIView, ContactMessageCreateAPIView

urlpatterns = [
    path('skills/', SkillListAPIView.as_view(), name='skill-list'),
    path('projects/', ProjectListAPIView.as_view(), name='project-list'),
    path('contact/', ContactMessageCreateAPIView.as_view(), name='contact-create'),
]
