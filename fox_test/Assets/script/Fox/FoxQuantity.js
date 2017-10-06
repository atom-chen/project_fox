private var totalFox : int = 0;
private var step : float;

function Start () {
	EventSystem.AddObserver(this, "OnCalcTotalFox");
	EventSystem.AddObserver(this, "OnCreateFox");
}

function OnCalcTotalFox(notify : Notification)
{
	totalFox = notify.data;
	step = 75.0f/totalFox;
}

function OnCreateFox()
{
	transform.position += Vector3(step, 0, 0);
}