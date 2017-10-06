private var sprit:PackedSprite;

function Start() {
	sprit = GetComponent(PackedSprite);
	if(!sprit) {
		Debug.Log("forgot attach packedsprite???");
	} 
}
function OnMouseUp() {
	var s_obj:GameObject = GameObject.FindWithTag("game_pause");
	if(s_obj) {
		var k_mgr:PauseMgr = s_obj.GetComponent(PauseMgr);
		k_mgr.SetPauseStat(false) ;
	}
	else
		Debug.Log("error! can not find scene_mgr");
		
	sprit.DoAnim("MouseUp");
}

function OnMouseEnter() {
	sprit.DoAnim("MouseUp");
}

function OnMouseExit() {
	sprit.DoAnim("None");
}