def get_recommendations(age, injury):
    recommendations = []
    if age < 18:
        if injury == "none":
            recommendations.append("Jumping Jacks")
            recommendations.append("Squats")
        elif injury == "knee":
            recommendations.append("Chair Squats")
            recommendations.append("Wall Push-ups")
    elif age >= 18 and age < 60:
        if injury == "none":
            recommendations.append("Push-ups")
            recommendations.append("Lunges")
        elif injury == "back":
            recommendations.append("Plank")
            recommendations.append("Marching in Place")
    else:
        if injury == "none":
            recommendations.append("Chair Squats")
            recommendations.append("Wall Push-ups")
        elif injury == "shoulder":
            recommendations.append("Marching in Place")

    return recommendations
