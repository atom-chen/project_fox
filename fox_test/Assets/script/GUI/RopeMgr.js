public var hang : GameObject;
private var hang_pos:float = 0.0f;

function Start () {
	if(hang)
	{
		EventSystem.AddObserver(this, "OnMoveUp");
		EventSystem.AddObserver(this, "OnMoveDown");
		transform.position.y = Mathf.Abs(hang.transform.position.y-transform.position.y)/2;
		transform.localScale.y = Mathf.Abs(hang.transform.position.y-transform.position.y);
		hang_pos = transform.position.y;
	}
}

function OnMoveUp()
{
	if(hang.transform.position.y - hang_pos !=0) {
		var delta_h = transform.position.y-hang.transform.position.y;
		var h = transform.localScale.y;
		transform.position.y += h-delta_h;
		transform.localScale.y += delta_h-h;
		hang_pos = hang.transform.position.y;
	}
}

function OnMoveDown()
{
	if(hang.transform.position.y - hang_pos !=0) {
		var delta_h = transform.position.y-hang.transform.position.y;
		var h = transform.localScale.y;
		transform.position.y += h-delta_h;
		transform.localScale.y += delta_h-h;
		hang_pos = hang.transform.position.y;
	}
}