from dotenv import load_dotenv
load_dotenv()
import os
import json
from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

api_key = os.getenv("OPENAI_API_KEY")
# Set the OpenAI API key (replace with your own key or set it as an environment variable)
client = OpenAI(
    api_key=api_key,
)

class AnalyzeSymptomsView(APIView):
    def post(self, request):
        try:
            # Get symptoms from the request body (assuming JSON)
            user_symptoms = request.data.get('symptoms', '')

            if not user_symptoms:
                return Response({'error': 'No symptoms provided'}, status=status.HTTP_400_BAD_REQUEST)

            # Call the function to analyze symptoms
            diagnosis = analyze_symptoms(user_symptoms)

            return Response(diagnosis, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






def analyze_symptoms(user_symptoms):
    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                        {
                            "role": "system",
                            "content": """Analyze the following plain language description of symptoms. The input may be casual, vague, or non-clinical. 
                            Your job is to interpret it using common symptom-disease relationships and return likely conditions. Provide a structured list of possible diseases, ranked by likelihood. 
                            - Base your responses on common medical knowledge and symptom-disease relationships.
                            - Always recommend consultation with a doctor for any serious conditions.
                            - If symptoms are vague, respond with the following JSON format, using an empty conditions list and a recommendation like 'Please provide more detailed symptoms (e.g., duration, severity, or accompanying symptoms).' Do not guess in these cases.
                            - Format your response strictly as JSON, following this structure:
                                {
                                "summary": "Brief summary of the users request.",
                                "conditions": [
                                    {"name": "Condition 1", "likelihood": "High", "description": " description of condition", "severity": "Monitor at Home", "Advice": "recomended medical advice for treatment, and when to act"},
                                    {"name": "Condition 2", "likelihood": "Medium" , "description": " description of condition, "severity":"Needs Medical Attention", "Advice": "recomended medical advice for treatment, and when to act"},
                                    {"name": "Condition 3", "likelihood": "Low" , "description": " description of condition, "severity":"Emergency", "Advice": "recomended medical advice for treatment, and when to act"}
                                    
                                ],
                                "recommendations": "Advice on what the patient should do next."
                                Ensure the response is **valid JSON** with no extra text outside the JSON block.
                                Now, analyze the following symptoms and return a response:
                                } """
                        },
                        {
                            "role": "user",
                            "content": user_symptoms
                        }
                    ],
                    max_tokens=600,  # Token limit of 600 
                    temperature=0.3,
        )
        # Extract response content
        response_text = completion.choices[0].message.content
        if not response_text.strip().startswith("{"):
            raise ValueError("GPT returned invalid or non-JSON response: " + response_text)

        # Convert stringified JSON back to a dictionary
        structured_response = json.loads(response_text)

        return structured_response
    except Exception as e:
        return str(e)
    
