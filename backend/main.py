from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
import requests

app = FastAPI()
FRONTEND_URL = ""

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

@app.post("alerts/am")
def format_am_alert(alert_body):
    formatted_alert = {
        "name": alert_body.name,
        "description": alert_body.description,
        "tc": get_tc()
    }

def get_tc():
    return "Ben 0543533078"

def format_and_send_alert(formatted_alert):
    requests.post(FRONTEND_URL, data=formatted_alert)

