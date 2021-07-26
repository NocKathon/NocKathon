from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
import requests

app = FastAPI()
FRONTEND_URL = ""

ALERT = {}

@app.get("/")
def read_root():
    return {"Hackathon": "NocKathon"}

@app.post("alerts/splunk")
def format_splunk_alert(alert_body):
    formatted_alert = {
        "name": alert_body.name,
        "description": alert_body.description,
        "tc": get_tc()
    }

    format_and_notify_for_alert(formatted_alert)

@app.post("alerts/am")
def format_am_alert(alert_body):
    formatted_alert = {
        "name": alert_body.name,
        "description": alert_body.description,
        "tc": get_tc()
    }

    format_and_notify_for_alert(formatted_alert)

@app.post("alerts/formatted")
def send_alert():
    a = ALERT
    ALERT = {}
    return a

def get_tc():
    return "Ben 0543533078"

def format_and_notify_for_alert(formatted_alert):
    ALERT[formatted_alert[name] = {
        "name": alert_body.name,
        "description": alert_body.description,
        "tc": get_tc()     
    }

    requests.get(FRONTEND_URL)

