public var levelsIdxSeq:int[];
private var levelScore:int = 0;
static private var curPos:int = 0;
static public var curLevel:int = 0;
static private var curClass:int = 0;

function Start()
{
	EventSystem.AddObserver(this, "OnHitFoxSuccess");
	
	curLevel = levelsIdxSeq[curPos];
}

function OnHitFoxSuccess(notify : Notification)
{
	levelScore += notify.data;
}

function EnterNextLevel() {
	if(curPos >= levelsIdxSeq.Length-1) {
		Application.LoadLevel("hedgehog_list");
	} else {
		curPos ++;
		Application.LoadLevel(levelsIdxSeq[curPos]);
	}
}

function ReplayCurLevel() {
	Application.LoadLevel(levelsIdxSeq[curPos]);
}

function EnterAssignLevel(idx:int) {
	for(var i=0; i<levelsIdxSeq.Length; i++) {
		if(levelsIdxSeq[i] == idx) {
			curPos = i;
			break;
		}
	}
	Application.LoadLevel(idx);
}

function ReturnLevelList() {
	Application.LoadLevel("hedgehog_list");
}

function DoLevelSuccess() {
	var s_obj:GameObject = GameObject.FindWithTag("leveldata_mgr");
	if(s_obj) {
		var k_data:LevelsData = s_obj.GetComponent(LevelsData);
		
		if(levelsIdxSeq.length-1 > curPos) {
			k_data.LevelPass(levelsIdxSeq[curPos+1]) ;
		}
		k_data.SetLevelScore(curLevel,levelScore);
	}
	Application.LoadLevel("hedgehog_victory");
}

function DoLevelFailed() {
	Application.LoadLevel("hedgehog_lose");
}

static function GetCurLevel() : int {
	return curLevel;
}

static function GetCurClass() : int {
	return curClass;
}