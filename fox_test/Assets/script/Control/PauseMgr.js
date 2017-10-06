private var pauseObj:GameObject;
private var savedTimeScale:float;
private var pauseStat:boolean = false;

function Start() {
	EventSystem.AddObserver(this, "OnEscape");
	
	pauseObj = GameObject.Find("PausePlane");
	if(!pauseObj)
		Debug.Log("can not find pause_mgr");
	
	pauseObj.SetActiveRecursively(false);
	
	Time.timeScale = 1.0;
}

function Update() {
	if(pauseStat && !IsGamePaused()) {
		PauseGame();
	} else if(!pauseStat && IsGamePaused()){
		UnPauseGame();
	}
}

function OnEscape() {
	pauseStat = !pauseStat;
}

private function PauseGame() {
	pauseObj.SetActiveRecursively(true);
    savedTimeScale = Time.timeScale;
    Time.timeScale = 0;
    AudioListener.pause = true;
}

private function UnPauseGame() {
	pauseObj.SetActiveRecursively(false);
    Time.timeScale = savedTimeScale;
    AudioListener.pause = false;
}

function SetPauseStat(stat:boolean) {
	pauseStat = stat;
}

function IsGamePaused() {
    return Time.timeScale==0;
}

function OnApplicationPause(pause:boolean) {
    if (IsGamePaused()) {
        AudioListener.pause = true;
    }
}