# Generated by Django 4.0.5 on 2022-09-13 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashAPI', '0011_avgsimscore'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avgsimscore',
            name='avgSim',
            field=models.FloatField(),
        ),
    ]
