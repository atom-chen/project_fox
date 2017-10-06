public var cherry : GameObject;
public var sprite : PackedSprite;
private var bullet : GameObject = null;
private var bulletType : int;
private var info : BulletInfo;

function Start() {
	EventSystem.AddObserver(this, "OnSetBullet");
	EventSystem.AddObserver(this, "OnReplaceBullet");
}


function OnSetBullet(notify : Notification)
{
	if(!bullet)
	{
		info = notify.data;
		if(!info.bulletInst)
			info.bulletInst = Instantiate(cherry, Vector3(info.relateObject.transform.position.x, info.relateObject.transform.position.y + 13, info.relateObject.transform.position.z), Quaternion.identity);
		bullet = info.bulletInst;
		bulletType = info.type;
		sprite.DoAnim("cherry");
	}
}

function OnReplaceBullet(notify : Notification)
{
	if(bullet)
		Destroy(bullet);
		
	info = notify.data;
	bullet = info.bulletInst;
	bulletType = info.type;
	EventSystem.Send(this, "OnMultipleType", bulletType);
	EventSystem.Send(this, "OnCleanMultiple");
	sprite.DoAnim("watermelon");
}

function Update () {
	if(Input.GetKeyDown("space") && bullet)
	{
		EventSystem.Send(this, "OnFire", info);
		EventSystem.Send(this, "OnCompleteFire", info);
		bullet = null;
		sprite.DoAnim("idle");
	}
	
	SyncPosition();
}

function SyncPosition()
{
	if(bullet)
	{
		bullet.transform.position =  Vector3(transform.position.x, transform.position.y + 13, transform.position.z);
		EventSystem.Send(this, "OnSyncPosition", info);
	}
}