FROM python:3.11-buster

WORKDIR /src

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD gunicorn --bind 0.0.0.0:8000 --workers 3 protein_proj.wsgi:application