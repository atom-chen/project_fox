var rotateSpeed : int = 30;

function Start()
{
	EventSystem.AddObserver(this, "OnMoveUp");
	EventSystem.AddObserver(this, "OnMoveDown");
}

function OnMoveUp()
{
	transform.Rotate(0, 0, -rotateSpeed * Time.deltaTime);
}

function OnMoveDown()
{
	transform.Rotate(0, 0, rotateSpeed * Time.deltaTime);
}
