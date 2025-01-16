from .models import *
from disease_app.models import Disease

patient1= Patient(first_name='John',last_name="Smith", dob='1970-05-25')
patient1.save()
patient1.current_disease = Disease.objects.get()