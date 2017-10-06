private var sprit:PackedSprite;
function Start () {
	sprit = GetComponent(PackedSprite);
	if(!sprit) {
		Debug.Log("error! can not find packedsprite");
	} 
	var cur_class : int = SceneMgr.GetCurClass();
	
	sprit.DoAnim("back"+cur_class);
}
function Update () {
}