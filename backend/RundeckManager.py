from pyrundeck import Rundeck
import time

class RundeckManager(Rundeck):
    def __init__(self, server, port, usr, pwd):
        self.rd = Rundeck(rundeck_url=f"http://{server}:{port}", username=usr, password=pwd, api_version=39, verify=False)
        self.project_name = "NOC"

    def run_job(self, team_name):
        job_id = self.rd.run_job_by_name(team_name)
        execution_state = self.rd.execution_state(job_id["id"])["executionState"]
        while execution_state == "RUNNING":
            time.sleep(2)
            execution_state = self.rd.execution_state(job_id["id"])["executionState"]

        return execution_state