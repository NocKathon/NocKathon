from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
import requests
from datetime import datetime

app = FastAPI()
FRONTEND_URL = ""

ALERT = {}

class TeamContact(BaseModel):
    fullname: str
    phone_number: str
    team_name: str

class Formatted_alert(BaseModel):
    name: str
    description: str
    tc: TeamContact

@app.get("/")
def read_root():
    return {"Hackathon": "NocKathon"}

@app.post("alerts/splunk")
def format_splunk_alert(alert_body):
    formatted_alert = Formatted_alert(name=alert_body.name, description=alert_body.description, tc=get_tc())

    format_and_notify_for_alert(formatted_alert)

@app.post("alerts/am")
def format_am_alert(alert_body):
    formatted_alert = Formatted_alert(name=alert_body.name, description=alert_body.description, tc=get_tc())

    format_and_notify_for_alert(formatted_alert)

@app.post("alerts/formatted")
def send_alert():
    a = ALERT.copy()
    ALERT = {}
    return a

def get_tc():
    tc = TeamContact(fullname="Ben Shaver",phone_number="0543533078",team_name="IdfctsId")
    return tc

def format_and_notify_for_alert(formatted_alert):
    ALERT[datetime.now("%d-%m-%Y_%H:%M:%S").strftime()] = formatted_alert.dict()

    requests.get(FRONTEND_URL)