from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import psycopg2
from datetime import datetime
# import psycopg2
from RundeckManager import RundeckManager
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## CONSTS
ALERTS_LIMIT = 20
FRONTEND_URL = ""
RUNDECK_SERVER = "20.55.57.106"
RUNDECK_PORT = 4440
RUNDECK_USER = "admin"
RUNDECK_PASS = "admin"

rundeck_manager = RundeckManager(RUNDECK_SERVER, RUNDECK_PORT, RUNDECK_USER, RUNDECK_PASS)

connection = psycopg2.connect(user="postgres",
                                  password="Aa123456",
                                  host="20.55.57.106",
                                  port="5432",
                                  database="")
cursor = connection.cursor()

global ALERT
ALERT = []

class TeamContact(BaseModel):
    fullName: str
    phoneNumber: str
    teamName: str

class Formatted_alert(BaseModel):
    name: str
    description: str
    severity: str
    time: str
    tc: dict

@app.get("/")
def read_root():
    return {"Hackathon": "NocKathon"}

@app.post("/alerts/splunk")
def format_splunk_alert(alert_body: dict):
    ts = datetime.fromtimestamp(int(str(alert_body['result']['_time']).split(".")[0])).strftime('%Y-%m-%d %H:%M:%S')
    try:
        formatted_alert = Formatted_alert(name=alert_body['search_name'], description=alert_body['result']['_raw'], severity=alert_body['result']['log_level'].upper(), time=ts, tc=get_tc("bla"))
        format_and_notify_for_alert(formatted_alert)
    except:
        pass

@app.post("/alerts/am")
def format_am_alert(alert_body: dict):
    ts = " ".join(alert_body['alerts'][0]['startsAt'].split("T"))
    ts = ts.split(".")[0]
    try:
        name = alert_body['alerts'][0]['labels']['alertname']
        formatted_alert = Formatted_alert(name=name, description=alert_body['alerts'][0]['annotations']['description'], severity=alert_body['alerts'][0]['labels']['severity'].upper(), time=ts, tc=get_tc(name))
        format_and_notify_for_alert(formatted_alert)
    except:
        pass

@app.get("/alerts/formatted")
def send_alert():
    global ALERT
    return ALERT

@app.get("/rundeck/team/{team_name}")
def run_opening_access(team_name):
    exec_status = rundeck_manager.run_job(team_name=team_name)
    return exec_status

@app.get("/rundeck/jobs")
def get_jobs():
    return rundeck_manager.get_all_jobs_formatted()

@app.get("/rundeck/latest/{team_name}")
def latest(team_name):
    a = rundeck_manager.get_execution_history(team_name)
    ts = " ".join(a["executions"][0]["date-started"]["date"].split("T"))
    ts = ts.split("Z")[0]
    return { "status": a["executions"][0]["status"].upper(), "time": ts}

@app.get("/users/{name}")
def get_profile(name):
    if name == "ido_zeif":
        return {
            "name": "Ido Zeif",
            "phoneNumber": "0543117799",
            "teamName": "Openshift",
            "hobbies": "להפיל את הפרוד",
            "mishpatPtiha": "מה שיפה זה שאין לך ברירה אתה חייב לקפוץ",
            "profilePhotoLink": "https://upload.wikimedia.org/wikipedia/he/thumb/9/92/Rosh.png/375px-Rosh.png",
        }
    elif name == "daniel_harit": 
        return {
            "name": "Daniel Harit",
            "phoneNumber": "0542002033",
            "teamName": "DBaas",
            "hobbies": "ופל לימון פג תוקף",
            "mishpatPtiha": "אחר כך תוכל להגיד שזה השקט שאחרי השערה",
            "profilePhotoLink": "https://rb.gy/q2s6f2",
        }
    else:
        return {
            "name": "Guy Zilberman",
            "phoneNumber": "0526231280",
            "teamName": "Openstack",
            "hobbies": "מגבוני שקם",
            "mishpatPtiha": "תכין את הפלייליסט של מושיקו מור",
            "profilePhotoLink": "https://images.one.co.il/images/msites/extraone/swim/zilbrman%20guy.jpg",
        }

def get_tc(name):
    cursor.execute('select * from "Toranim"')
    toranim = cursor.fetchall()
    user = {}

    for toran in toranim:
        
        if name == "service_up":
            if toran[0].strip() == "Ido Zeif":
                print("ZEIF")
                user = toran
                break
        elif name == "service_down":
            if toran[0].strip() == "Daniel Harit":
                print("DANIEL")
                user = toran
                break
        else:
            if toran[0].strip() == "Guy Zilberman":
                user = toran
                break
    
    cursor.execute('select * from "Teams"')
    teams = cursor.fetchall()

    team_name = ""
    for team in teams:
        if team[0] == user[2]:
            team_name = team[1]
            break

    # if name == "service_up":
    #     tc = TeamContact(fullName="Ido Zeif",phoneNumber="0543117799",teamName="Openshift")
    # elif name == "service_down":
    #     tc = TeamContact(fullName="Nadav Margalit",phoneNumber="0546234722",teamName="DBaas")
    # else:
    #     tc = TeamContact(fullName="Guy Zilberman",phoneNumber="0526231280",teamName="Openstack")

    tc = TeamContact(fullName=user[0], phoneNumber="0"+str(user[1]), teamName=team_name)
    return tc.dict()

def format_and_notify_for_alert(formatted_alert):
    global ALERT
    if len(ALERT) == ALERTS_LIMIT:
        ALERT = ALERT[1:]
    ALERT.append(formatted_alert.dict())