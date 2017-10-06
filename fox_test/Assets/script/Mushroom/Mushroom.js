public var particle : GameObject;
public var sprite : PackedSprite;
public var WaitSecond : float = 3;
private var hasTrigger : boolean = false;
private var triggerObj : GameObject;

function Start()
{
	sprite.DoAnim("Normal");
}

function Update()
{
	if(triggerObj)
		triggerObj.transform.position = transform.position;
}

function OnTriggerEnter (other : Collider) {
	if(!hasTrigger && other.gameObject.transform.tag=="bullet")
	{
		EventSystem.Send(this, "OnMushroomHited", transform.GetInstanceID());
		sprite.DoAnim("Trigger");
		Destroy(other.gameObject);
		hasTrigger = true;
		triggerObj= Instantiate(particle, transform.position, Quaternion.identity);
		yield WaitForSeconds(WaitSecond);
		Destroy(triggerObj);
		hasTrigger = false;
		sprite.DoAnim("Normal");
		EventSystem.Send(this, "OnMushroomNormal", transform.GetInstanceID());
	}
}