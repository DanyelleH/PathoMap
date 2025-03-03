FROM python:3.11-buster

WORKDIR /src

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
COPY ./spacy_models /usr/local/lib/python3.11/site-packages/spacy/data/

COPY . .

CMD gunicorn --bind 0.0.0.0:8000 --workers 3 protein_proj.wsgi:application