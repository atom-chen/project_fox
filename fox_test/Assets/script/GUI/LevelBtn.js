public var levelIdx:int = 0;

private var sceneObj:GameObject;
private var levelObj:GameObject;
private var starObj:Transform;
private var sprit:PackedSprite;
private var spritStar:PackedSprite;
private var isLock:boolean = false;
private var grade:int = 0;
function Start() {
	sceneObj = GameObject.FindWithTag("scene_mgr");
	if(!sceneObj) {
		Debug.Log("error! can not find scene_mgr");
	}
	levelObj = GameObject.FindWithTag("leveldata_mgr");
	if(!levelObj) {
		Debug.Log("error! can not find leveldata_mgr");
	}
	starObj = transform.Find("LevelStar");
	if(!starObj) {
		Debug.Log("error! can not find levelstar");
	}
	sprit = GetComponent(PackedSprite);
	if(!sprit) {
		Debug.Log("forgot attach level packedsprite???");
	} 
	spritStar = starObj.GetComponent("PackedSprite");
	if(!spritStar) {
		Debug.Log("forgot attach star packedsprite???");
	}
	
	var k_data:LevelsData = levelObj.GetComponent(LevelsData);
	if(k_data.LevelIsPass(levelIdx)) {
		isLock = false;
		sprit.DoAnim("Normal");
	} else {
		isLock = true;
		sprit.DoAnim("Lock");
	}
	
	if(isLock) {
		spritStar.DoAnim("StarLock");
	} else {
		var score:int = k_data.GetLevelScore(levelIdx);
		grade = k_data.LevelScoreGrade(levelIdx,score) ;
		spritStar.DoAnim("Star"+grade);
	}
	
	//spritStar.DoAnim("Star2");
}

function OnMouseUp() {
	if(isLock) {
		sprit.DoAnim("LockMouseUp");
		spritStar.DoAnim("StarLockMouseUp");
	} else {
		sprit.DoAnim("NormalMouseUp");
		spritStar.DoAnim("StarMouseUp"+grade);
		var k_mgr:SceneMgr = sceneObj.GetComponent(SceneMgr);
		k_mgr.EnterAssignLevel(levelIdx) ;
	}
}

function OnMouseEnter() {
	if(isLock) {
		sprit.DoAnim("LockMouseUp");
		spritStar.DoAnim("StarLockMouseUp");
	} else {
		sprit.DoAnim("NormalMouseUp");
		spritStar.DoAnim("StarMouseUp"+grade);
	};
}

function OnMouseExit() {
	if(isLock) {
		sprit.DoAnim("Lock");
		spritStar.DoAnim("StarLock");
	} else {
		sprit.DoAnim("Normal");
		spritStar.DoAnim("Star"+grade);
	};
}