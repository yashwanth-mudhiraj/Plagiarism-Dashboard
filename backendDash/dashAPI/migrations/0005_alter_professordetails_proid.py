# Generated by Django 4.0.5 on 2022-07-14 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashAPI', '0004_professordetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professordetails',
            name='proId',
            field=models.IntegerField(max_length=50, primary_key=True, serialize=False),
        ),
    ]
