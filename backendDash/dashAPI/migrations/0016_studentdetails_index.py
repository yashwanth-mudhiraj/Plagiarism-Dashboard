# Generated by Django 4.0.5 on 2022-10-07 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashAPI', '0015_professordetails_simthreshold'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentdetails',
            name='index',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
