function Update () {
	if(Input.GetKey("up") )
		EventSystem.Send(this, "OnMoveUp");
	else if(Input.GetKey("down"))
		EventSystem.Send(this, "OnMoveDown");
	else if(Input.GetKey("left"))
		EventSystem.Send(this, "OnMoveLeft");
	else if(Input.GetKey("right"))
		EventSystem.Send(this, "OnMoveRight");
	else if(Input.GetKeyUp("up") || Input.GetKeyUp("down") || Input.GetKeyUp("left") || Input.GetKeyUp("right"))
		EventSystem.Send(this, "OnMoveStop");
	else if(Input.GetKeyDown("escape"))
		EventSystem.Send(this,"OnEscape");
	/*else if(Input.GetMouseButtonUp(0))
		EventSystem.Send(this,"OnLMouseUp");
	else if(Input.GetMouseButtonDown(0))
		EventSystem.Send(this,"OnLMouseDown");
	else if(Input.GetMouseButtonUp(1))
		EventSystem.Send(this,"OnRMouseUp");
	else if(Input.GetMouseButtonDown(1))
		EventSystem.Send(this,"OnRMouseDown");*/
} 