# Generated by Django 5.0.3 on 2024-04-15 11:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_user_word_set_mapping_last_view'),
    ]

    operations = [
        migrations.AddField(
            model_name='word_set',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2024, 4, 15, 13, 31, 20, 348814)),
        ),
    ]