import pyttsx3
import speech_recognition as sr #pip install speechRecognition
import datetime

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
# print(voices[1].id)
engine.setProperty('voice', voices[0].id)

def speak(audio):
    engine.say(audio)
    print(audio)
    engine.runAndWait()

def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("Good Morning " + master)
    elif hour>=12 and hour<18:
        speak("Good Afternoon " + master)   
    else:
        speak("Good Evening " + master)         

def takeCommand():                      #It takes microphone input from the user and returns string output
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)
    try:
        print("Recognizing...")    
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")
    except Exception as e:
        # print(e)    
        print("Say that again please...")  
        return "None"
    return query


speak("Initialising VISION...")
speak("welcome, to the examination shall we start?")
query=takeCommand()
if "yes" in query:
    speak("okay all the best")   
 
    speak("What is your name?")
    master = takeCommand()
    wishMe()

    #questions:
    f= open(r"/questions.txt", "rt")
    a= f.readline()
    #answers:
    f= open(r"/answers.txt", "rt")
    b= f.readline()

    speak(a)
    query=takeCommand().lower()
    if b in query:
        speak("correct")
    else:
        speak("incorrect")

speak("Thankyou have a good day")    






