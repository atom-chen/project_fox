function OnCollisionEnter(collision : Collision)
{
	EventSystem.Send(this, "OnStealSuccess");
	Destroy(collision.gameObject);
}

function OnTriggerEnter(other : Collider)
{
	EventSystem.Send(this, "OnStealSuccess");
	EventSystem.Send(this, "onFoxBulletDestory", other.gameObject);
}