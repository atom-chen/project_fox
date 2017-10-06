public var sprite : PackedSprite;
function Start () {
	EventSystem.AddObserver(this, "OnDisplayCombox");
}

function OnDisplayCombox(notify : Notification)
{
	if(notify.data <=3)
		sprite.DoAnim("Combox" + notify.data);
	else
		sprite.DoAnim("Combox3");
		
	yield WaitForSeconds(1);
	sprite.DoAnim("empty");
}