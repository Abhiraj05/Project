import json
from prompt.preference_recommendation import PREFERENCE_RECOMMENDATION
from core.llm_config import client, GROQ_MODEL
from schemas.preference_recommendation_schema import PreferenceRecommendationSchema

class Preference_LLM_Service:
    async def generate_preference_recommendations(preferences : dict):
        user_prompt = f"""
    Analyze the following user travel preferences:
    {json.dumps(preferences, indent=2)}

    Generate personalized travel destination recommendations
    based on these preferences.

    Return only the required JSON recommendation structure.
    """
        response = await client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": PREFERENCE_RECOMMENDATION
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        temperature=0.3,
        max_completion_tokens=2000
    )

       

        llm_output = response.choices[0].message.content

        if not llm_output:
            raise ValueError("LLM returned an empty response")

        validated_response = PreferenceRecommendationSchema.model_validate_json(
        llm_output
    )

        return validated_response.model_dump()
