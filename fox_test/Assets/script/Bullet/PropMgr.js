/*
	道具管理器
*/
public var info : BulletInfo;
public var prop : GameObject;
public var offset_x : float = 5.0;
public var offset_y : float = 5.0;

function Start() {
	EventSystem.AddObserver(this, "OnPropTrigger");
	EventSystem.AddObserver(this, "OnCompleteFire");
	//~ EventSystem.AddObserver(this, "OnGameStart");
}

function OnGameStart()
{
	StartCoroutine("CreateProp");
}

function OnPropTrigger()
{
	EventSystem.Send(this, "OnReplaceBullet", info);
}

function CreateProp()
{
	while(true)
	{
		if(!info.bulletInst)
			info.bulletInst = Instantiate(prop, Vector3(info.relateObject.transform.position.x + offset_x, info.relateObject.transform.position.y + offset_y, info.relateObject.transform.position.z), Quaternion.identity);
			
		yield WaitForSeconds(info.createTimer);
	}
}