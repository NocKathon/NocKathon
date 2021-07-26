from rundeck.client import Rundeck

class RundeckManager(Rundeck()):
    def __init__(server, port=4440, api_token=None):
        self.rd = Rundeck(server, port, api_token)
        self.project_name = "NOC"

    def run_job(team_name):
        job_id = self.rd.get_job_id(self.project_name, team_name)
        exec = self.rd.run_job(job_id)
        print(exec)
        # TODO: check what is in the exec
        return exec["status"]
