/*
	Î÷¹ÏµÀ¾ß
*/
public var sprite : PackedSprite;
private var isExplode : boolean = false;

function Start()
{
	sprite.DoAnim("Normal");
	EventSystem.AddObserver(this, "OnFire");
}

function OnFire(notify : Notification)
{
	var info : BulletInfo = notify.data;
	if(info.type == BulletType.watermelon)
	{
		transform.rigidbody.isKinematic = false;
		transform.rigidbody.AddForce(-Vector2.right * info.force);
	}
}

function OnTriggerEnter(other : Collider)
{
	if(other.name == "Hedgehog")
	{
		EventSystem.Send(this, "OnPropTrigger");
	}
	else if(other.name == "Floor")
	{
		isExplode = true;
		transform.rigidbody.useGravity = false;
		transform.rigidbody.isKinematic = true;
		sprite.DoAnim("explode");
		EventSystem.Send(this, "OnCleanMultiple");
		EventSystem.Send(this, "OnMultipleType", 1);
	}
}