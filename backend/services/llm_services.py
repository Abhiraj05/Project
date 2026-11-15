import json
from prompt.preference_recommendation import PREFERENCE_RECOMMENDATION
from prompt.custom_trip import CUSTOM_TRIP_PROMPT
from core.llm_config import client, GROQ_MODEL
from schemas.preference_recommendation_schema import PreferenceRecommendationSchema
from schemas.trip_plan_schema import CustomTripItinerary

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


class Generate_Trip_Service:
    async def generate_trip(trip_plan_data: dict):
        user_prompt = f"""
Create a custom trip itinerary from the following user-selected trip details:
{json.dumps(trip_plan_data, indent=2, default=str)}

Return only the JSON object required by the system instructions.
"""
        response = await client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": CUSTOM_TRIP_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,
            max_completion_tokens=6000,
        )

        llm_output = response.choices[0].message.content
        if not llm_output:
            raise ValueError("LLM returned an empty custom trip response")

        itinerary = CustomTripItinerary.model_validate_json(llm_output)

        # Reject an otherwise well-formed response if it changed the user's request.
        for field in ("destination", "departure_date", "return_date", "travelers"):
            requested_value = trip_plan_data[field]
            if field == "destination":
                matches = itinerary.destination.strip().casefold() == str(requested_value).strip().casefold()
            else:
                matches = getattr(itinerary, field) == requested_value
            if not matches:
                raise ValueError(f"LLM custom trip response does not match requested {field}")

        if itinerary.currency != "INR":
            raise ValueError("LLM custom trip response must use INR for the submitted budget")
        if itinerary.estimated_total_cost > trip_plan_data["total_budget"]:
            raise ValueError("LLM custom trip estimate exceeds the submitted total budget")

        return itinerary.model_dump(mode="json")
