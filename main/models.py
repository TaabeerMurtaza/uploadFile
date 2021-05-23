from django.db import models

# Create your models here.

class File(models.Model):
    file = models.FileField(upload_to='main')        

    def __str__(self):
        return str(self.pk)

    def delete(self):
        self.file.storage.delete(self.file.path)

        super().delete()
