private var sprit:PackedSprite;
function Start() {
	sprit = GetComponent(PackedSprite);
	if(!sprit) {
		Debug.Log("forgot attach packedsprite???");
	} 
	//EventSystem.AddObserver(this, "OnLMouseUp");
}

function Update () {
}

function OnMouseUp() {
	var s_obj:GameObject = GameObject.FindWithTag("scene_mgr");
	if(s_obj) {
		var k_mgr:SceneMgr = s_obj.GetComponent(SceneMgr);
		k_mgr.ReplayCurLevel() ;
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

