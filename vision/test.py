from flask import Flask, jsonify
from gtts import gTTS
import os
import speech_recognition as sr
import datetime
import pygame

app = Flask(__name__)

# Initialize pygame audio
pygame.mixer.init()

def speak(audio):
    tts = gTTS(text=audio, lang='en')
    tts.save("audio.mp3")

    # Load and play the audio file using pygame
    pygame.mixer.music.load("audio.mp3")
    pygame.mixer.music.play()

    # Wait for the audio to finish playing
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)

def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        return "Good Morning"
    elif hour >= 12 and hour < 18:
        return "Good Afternoon"
    else:
        return "Good Evening"

def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)
    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")
        return query
    except Exception as e:
        print("Say that again please...")
        return "None"

@app.route('/get_questions', methods=['GET'])
def get_questions():
    speak('Hello')
    return jsonify({"message": "Hello from get_questions"})

@app.route('/start_exam', methods=['GET'])
def start_exam():
    speak("Initializing VISION")
    speak("Welcome to the examination. Shall we start?")
    query = takeCommand()
    if "yes" in query:
        speak("Okay, all the best")
        speak("What is your name?")
        master = takeCommand()
        greeting = wishMe() + f" {master}"
        speak(greeting)

        # questions:
        with open("questions.txt", "rt") as f:
            questions = f.readlines()

        # answers:
        with open("answers.txt", "rt") as f:
            answers = f.readlines()

        for question, answer in zip(questions, answers):
            speak(question)
            user_answer = takeCommand().lower()
            if user_answer.strip() == answer.strip():
                speak("Correct")
            else:
                speak("Incorrect")

        speak("Thank you. Have a good day.")

    return jsonify({"message": "Exam completed"})

if __name__ == "__main__":
    app.run(debug=True)
