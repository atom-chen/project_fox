public var sprite : PackedSprite;
public var displayName : String;
private var dict;

function Start () {
	EventSystem.AddObserver(this, "OnGameStart");
	if(displayName == "")
	{
		yield WaitForSeconds(0.01);
		EventSystem.Send(this, "OnGameStart");
	}
	else
	{
		if(SimpleDictionary.Contains(displayName))
		{
			if(SimpleDictionary.Get(displayName) == "true")
			{
				yield WaitForSeconds(0.01);
				EventSystem.Send(this, "OnGameStart");
			}
			else
			{
				sprite.DoAnim(displayName);
			}
		}
		else
		{
			SimpleDictionary.Set(displayName, "false");
			//~ dict.Save("help.ini");
			EventSystem.AddObserver(this, "OnGameStart");
			sprite.DoAnim(displayName);
		}
	}
}

function OnGameStart()
{
	SimpleDictionary.Set(displayName, "true");
	//~ dict.Save("help.ini");
	Destroy(this.gameObject);
}