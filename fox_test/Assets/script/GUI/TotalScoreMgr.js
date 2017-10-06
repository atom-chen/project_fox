function Start () {
	EventSystem.AddObserver(this, "OnDisplayScore");
}

function OnDisplayScore(notify : Notification)
{
	transform.gameObject.BroadcastMessage("DisplayScore", notify.data);
}