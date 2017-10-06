private var levelObj:GameObject;
function Start() {
	var score:int = 0;
	var grade:int = 0;
	var s_obj:GameObject = GameObject.FindWithTag("leveldata_mgr");
	if(s_obj) {
		var k_data:LevelsData = s_obj.GetComponent(LevelsData);
		score = k_data.GetLevelScore(SceneMgr.GetCurLevel());
		grade = k_data.LevelScoreGrade(SceneMgr.GetCurLevel(),score) ;
	} else {
		Debug.Log("leveldata_mgr can not find");
	}
	var sprite:PackedSprite = GameObject.Find("WatermelonCount").GetComponent("PackedSprite");
	sprite.DoAnim("star"+grade);
}
function Update () {
}