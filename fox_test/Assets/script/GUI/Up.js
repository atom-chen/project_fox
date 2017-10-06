function OnMouseDown()
{
	print("1234");
	EventSystem.Send(this, "OnMoveUp");
}