import os
import json
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
print(api_key)
# Set the OpenAI API key (replace with your own key or set it as an environment variable)
# client = OpenAI(api_key=api_key)


# def analyze_symptoms(user_symptoms):
#     completion = client.chat.completions.create(
#         model="gpt-4o",
#         messages=[
#                     {
#                         "role": "system",
#                         "content": """Analyze a patient's symptoms and provide a structured list of possible diseases, ranked by likelihood. 
#                         - Base your responses on common medical knowledge and symptom-disease relationships.
#                         - Always recommend consultation with a doctor for any serious conditions.
#                         - If symptoms are too vague, ask follow-up questions instead of making guesses."""
#                     },
#                     {
#                         "role": "user",
#                         "content": user_symptoms
#                     }
#                 ],
#                 max_tokens=350,  # Token limit of 350
#                 temperature=0.3,
#     )

#     return(completion.choices[0].message.content)

# print(analyze_symptoms("I have frequent urination and excessive thirst."))