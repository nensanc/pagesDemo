from django.db import models

# Create your models here.
class Process(models.Model):
    class Meta:
        verbose_name = 'Lista'
        verbose_name_plural = 'Listas'
    
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    coparent = models.ForeignKey('self', related_name='co_children',on_delete=models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    desc = models.CharField(max_length=1000, unique=True)

    def __str__(self):
        return self.name