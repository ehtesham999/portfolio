from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=7, help_text="Number from 0 to 10 representing proficiency")

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True, help_text="Link to an image/screenshot of the project")
    live_link = models.URLField(blank=True, null=True, help_text="Link to live deployment")
    github_link = models.URLField(blank=True, null=True, help_text="Link to source code")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
