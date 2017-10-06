function OnCollisionEnter(collision : Collision)
{
	Destroy(collision.gameObject);
}

function OnTriggerEnter(other : Collider)
{
	Destroy(other.gameObject);
}