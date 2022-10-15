# Generated by Django 4.0.5 on 2022-09-13 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashAPI', '0010_assignments_docfilename'),
    ]

    operations = [
        migrations.CreateModel(
            name='avgSimScore',
            fields=[
                ('simId', models.AutoField(primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('courseId', models.CharField(max_length=50)),
                ('professorId', models.IntegerField()),
                ('assgnId', models.IntegerField()),
                ('avgSim', models.IntegerField()),
            ],
        ),
    ]
