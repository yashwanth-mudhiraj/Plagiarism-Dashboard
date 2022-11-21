from django.db import models


class courseRegistration(models.Model):
    courseId = models.CharField(primary_key=True,max_length=50)
    courseName = models.CharField(max_length=50)
    professorId = models.IntegerField()
    professorName = models.CharField(max_length=50)
    courseCreateDate = models.DateField()
    
class professorDetails(models.Model):
    proId = models.IntegerField(primary_key=True)
    proFName = models.CharField(max_length=50)
    proLName = models.CharField(max_length=50)
    dept = models.CharField(max_length=20)
    yearJoin = models.DateField()
    email = models.EmailField()
    simThreshold = models.FloatField()

class studentDetails(models.Model):
    index = models.AutoField(primary_key=True)
    stuId = models.IntegerField()
    stuFName = models.CharField(max_length=50)
    stuLName = models.CharField(max_length=50)
    courseId = models.CharField(max_length=50)
    yearJoin = models.DateField()
    email = models.EmailField()  

class assignments(models.Model):
    assgnId = models.AutoField(primary_key=True)
    assgnName = models.CharField(max_length=50)
    assgnCreated = models.DateField()
    assgnDeadline = models.DateField()
    proId = models.IntegerField()
    courseId = models.CharField(max_length=50)
    DocFileName = models.CharField(max_length=100)
    avgSim = models.FloatField()
    year = models.IntegerField()

