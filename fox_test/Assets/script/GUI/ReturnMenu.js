private var sprit:PackedSprite;

function Start() {
	sprit = GetComponent(PackedSprite);
	if(!sprit) {
		Debug.Log("forgot attach packedsprite???");
	} 
}
function Update () {
}

function OnMouseUp() {
	sprit.DoAnim("MouseUp");
}

function OnMouseEnter() {
	sprit.DoAnim("MouseUp");
}

function OnMouseExit() {
	sprit.DoAnim("None");
}