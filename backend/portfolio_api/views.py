from rest_framework import generics
from .models import Skill, Project, ContactMessage
from .serializers import SkillSerializer, ProjectSerializer, ContactMessageSerializer

class SkillListAPIView(generics.ListAPIView):
    queryset = Skill.objects.all().order_by('-level')
    serializer_class = SkillSerializer

class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

class ContactMessageCreateAPIView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
