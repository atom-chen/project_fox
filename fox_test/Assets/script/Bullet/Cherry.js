public var explode : GameObject;

function Start()
{
	EventSystem.AddObserver(this, "OnFire");
}

function OnFire(notify : Notification)
{
	var info : BulletInfo = notify.data;
	if(info.type == BulletType.cherry && transform.gameObject.GetInstanceID() == info.bulletInst.GetInstanceID())
	{
		transform.rigidbody.isKinematic = false;
		transform.rigidbody.AddForce(-Vector2.right * info.force);
		transform.gameObject.AddComponent(Rotate);
	}
}

function OnCollisionEnter(collision:Collision)
{
	if(collision.transform.name == "DownDeahArea" ||
		collision.transform.name == "DeahArea")
		EventSystem.Send(this, "OnCleanMultiple");
		
	Instantiate(explode, Vector3(transform.position.x, transform.position.y - 5, transform.position.z), Quaternion.identity);
}