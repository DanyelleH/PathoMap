# Generated by Django 5.1.4 on 2025-01-17 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disease_app', '0001_initial'),
        ('patient_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='current_disease',
            field=models.ManyToManyField(blank=True, related_name='current_patients', to='disease_app.disease'),
        ),
        migrations.AlterField(
            model_name='patient',
            name='history',
            field=models.ManyToManyField(blank=True, related_name='patient_history', to='disease_app.disease'),
        ),
    ]
