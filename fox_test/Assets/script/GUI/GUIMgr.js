private var totalScore : int = 0;
function Start()
{
	EventSystem.AddObserver(this, "OnHitFoxSuccess");
}

function OnHitFoxSuccess(notify : Notification)
{
	totalScore += notify.data;
	EventSystem.Send(this, "OnDisplayScore", totalScore);
	//~ EventSystem.Send(this, "OnDisplayScore", totalScore);
}