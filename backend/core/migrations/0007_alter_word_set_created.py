# Generated by Django 5.0.3 on 2024-04-15 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_word_set_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word_set',
            name='created',
            field=models.DateTimeField(),
        ),
    ]
