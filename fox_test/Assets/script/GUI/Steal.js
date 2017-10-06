public var sprite : PackedSprite;
private var stealCount : int = 1;
private var totalStealCount : int;
function Start () {
	EventSystem.AddObserver(this, "OnTotalStealCount");
	EventSystem.AddObserver(this, "OnStealSuccess");
}

function OnTotalStealCount(notify : Notification)
{
	totalStealCount = notify.data;
}

function OnStealSuccess()
{
	stealCount++;
	if(stealCount <= totalStealCount + 1 && stealCount <= 7)
		sprite.DoAnim("steal" + stealCount.ToString());
}