# Generated by Django 4.0.5 on 2022-10-07 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashAPI', '0016_studentdetails_index'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentdetails',
            name='index',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='studentdetails',
            name='stuId',
            field=models.IntegerField(),
        ),
    ]