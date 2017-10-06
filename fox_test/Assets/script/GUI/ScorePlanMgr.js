private var score : int = 0;
public var scoreObject : GameObject;

private var levelObj:GameObject;
function Start() {
	var s_obj:GameObject = GameObject.FindWithTag("leveldata_mgr");
	if(s_obj) {
		var k_data:LevelsData = s_obj.GetComponent(LevelsData);
		score = k_data.GetLevelScore(SceneMgr.GetCurLevel());
	} else {
		Debug.Log("leveldata_mgr can not find");
	}
	Display();
}

function Display()
{
	var StepScore : int = CalcStepScore();
	var TotalScore : int = 0;
	while(TotalScore < score)
	{
		TotalScore += StepScore;
		scoreObject.BroadcastMessage("DisplayScore", TotalScore);
		yield WaitForSeconds(0.01);
	}
}

function CalcStepScore()
{
	if(score <= 5000)
		return 50;
	else if(score > 5000 && score <= 10000)
		return 100;
	else if(score > 10000 && score <= 20000)
		return 200;
	else
		return 300;
}