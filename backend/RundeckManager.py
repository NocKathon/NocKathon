from pyrundeck import Rundeck
import time

class RundeckManager(Rundeck):
    def __init__(self, server, port, usr, pwd):
        self.rd = Rundeck(rundeck_url=f"http://{server}:{port}", username=usr, password=pwd, api_version=39, verify=False)
        self.project_name = "NOC"

    def run_job(self, team_name):
        job_id = self.rd.run_job_by_name(team_name)
        execution_state = self.rd.execution_state(job_id["id"])["executionState"]
        while execution_state == "RUNNING" or execution_state == "WAITING":
            time.sleep(2)
            execution_state = self.rd.execution_state(job_id["id"])["executionState"]

        ts = " ".join(self.rd.execution_state(job_id["id"])['startTime'].split("T"))
        ts = ts.split(".")[0]

        return { "status" : execution_state, "time": ts}

    def get_all_jobs_formatted(self):
        formmated_jobs = []
        all_jobs = self.rd.list_all_jobs()

        for job in all_jobs:
            formmated_jobs.append({'systemName': job['name'],'teamName': job['group']})

        return formmated_jobs

    def get_execution_history(self, team_name):
        return(self.rd.get_executions_for_job(job_name=team_name, max=1))