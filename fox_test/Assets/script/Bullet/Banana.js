/*
	œ„Ω∂µ¿æﬂ
*/
public var BananaPathObj : GameObject;
private var PathArray : Vector3[];
private var hasTrigger : boolean = false;

function Start() {
	EventSystem.AddObserver(this, "OnSyncPosition");
	EventSystem.AddObserver(this, "OnFire");
	EventSystem.AddObserver(this, "OnAttackBalloonRebound");
	var path : iTweenPath = BananaPathObj.GetComponent("iTweenPath");
	PathArray = path.GetPath("BananaPath");
}

function OnAttackBalloonRebound(notify : Notification)
{
	iTween.Stop();
	transform.rigidbody.isKinematic = false;
	
	var direction : Vector3 = notify.data - transform.position;
	direction = Vector3(-direction.x * 2500, -direction.y * 2500, 0);
    transform.rigidbody.AddForceAtPosition(direction, transform.position);
}

function OnTriggerEnter(other : Collider)
{
	if(other.name == "Hedgehog" && !hasTrigger)
	{
		EventSystem.Send(this, "OnPropTrigger");
		hasTrigger = true;
	}
}

function OnSyncPosition(notify : Notification)
{
	var info : BulletInfo = notify.data;
	if(info.type == BulletType.banana && info.bulletInst)
	{
		var bulletPos : Vector3 = info.bulletInst.transform.position;
		var offset = bulletPos.y - PathArray[0].y;
		PathArray[0] = bulletPos;
		for(var i = 1; i < PathArray.Length; i++)
		{
			var position = PathArray[i];
			PathArray[i] = position + Vector3(0, offset, 0);
		}
	}
}

function OnFire(notify : Notification)
{
	var info : BulletInfo = notify.data;
	if(info.type == BulletType.banana)
	{
		transform.gameObject.AddComponent(Rotate);
		iTween.MoveTo(transform.gameObject, iTween.Hash(//"position", Vector3(0, 0, 0), 
						"path", PathArray,
						"time", 2,
						"loopType", "none",
						 "onComplete","Destroy",
						"easetype", "linear"));
	}
}

function Destroy()
{
	Destroy(this.gameObject);
}
