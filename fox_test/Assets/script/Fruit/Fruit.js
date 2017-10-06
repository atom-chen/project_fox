public var info : FruitInfo[];
public var sprite : PackedSprite;
private var stealCount : int = 0;

function Start () {
	EventSystem.AddObserver(this, "OnStealSuccess");
}

function OnStealSuccess()
{
	stealCount++;
	for(var i = 0; i<info.Length; i++)
	{
		if(info[i].count == stealCount)
		{
			sprite.DoAnim(info[i].name);
			break;
		}
	}
}