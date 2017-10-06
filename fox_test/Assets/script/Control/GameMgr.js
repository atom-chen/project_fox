public var totalStealCount : int = 6;
private var totalFox : int = 40;
private var totalBornFox : int = 0;
private var stealCount : int = 1;

function Start()
{
	EventSystem.AddObserver(this, "OnStealSuccess");
	EventSystem.AddObserver(this, "OnCalcTotalFox");
	EventSystem.AddObserver(this, "OnFoxDestory");
	yield WaitForSeconds(1);
	EventSystem.Send(this, "OnTotalStealCount", totalStealCount);
}

function OnStealSuccess() {
	stealCount++;
	totalBornFox++;
	
	var s_obj:GameObject = GameObject.FindWithTag("scene_mgr");
	if(!s_obj) {
		Debug.Log("error! can not find scene_mgr");
	}
	else
	{
		var k_mgr:SceneMgr = s_obj.GetComponent(SceneMgr);
		if(stealCount > totalStealCount) {
			k_mgr.DoLevelFailed() ;
		}
		else
		{
			if(totalBornFox >= totalFox){
				k_mgr.DoLevelSuccess() ;
			}
		}
	}
}

function OnFoxDestory()
{
	totalBornFox++;
	if(totalBornFox >= totalFox)
	{
		var s_obj:GameObject = GameObject.FindWithTag("scene_mgr");
		if(s_obj) {
			var k_mgr:SceneMgr = s_obj.GetComponent(SceneMgr);
			k_mgr.DoLevelSuccess() ;
		}
		else
			Debug.Log("error! can not find scene_mgr");
	}
}

function OnCalcTotalFox(notify : Notification)
{
	totalFox = notify.data;
}