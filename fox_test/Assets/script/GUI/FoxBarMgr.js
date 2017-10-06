public var hang : GameObject;
private var hang_pos:float = 0.0f;
private var end_pos:Vector3 = Vector3(47.5f,0.25,-0.02);
private var x_scale:float = 0.0f;

function Start () {
	if(hang)
	{
		EventSystem.AddObserver(this, "OnCreateFox");
		x_scale = transform.localScale.x;
		transform.localScale.x = x_scale*Vector3.Distance(end_pos,hang.transform.localPosition)/98.0f;
		transform.localPosition.x = (end_pos.x + hang.transform.localPosition.x)/2;
		hang_pos = hang.transform.localPosition.x;
	}
}

function OnCreateFox()
{
	if(hang.transform.localPosition.x - hang_pos !=0) {
		transform.localScale.x = x_scale*Vector3.Distance(end_pos,hang.transform.localPosition)/98.0f;
		transform.localPosition.x = (end_pos.x + hang.transform.localPosition.x)/2;
		hang_pos = hang.transform.localPosition.x;
	}
}