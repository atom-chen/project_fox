function Start()
{
	Physics.IgnoreLayerCollision(0, 31, true);
}

function OnCollisionEnter()
{
	EventSystem.Send(this, "OnMoveStop");
	EventSystem.Send(this, "OnRopeStop");
}

function OnCollisionExit()
{
	EventSystem.Send(this, "OnRopeStart");
}