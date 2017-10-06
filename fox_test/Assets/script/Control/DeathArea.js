function OnCollisionEnter (collision:Collision) {
	switch(collision.transform.tag)
	{
		case "bullet":
			Destroy(collision.gameObject);
			EventSystem.Send(this, "OnBulletDestroy", this);
			break;
		default:
			break;
	}
}

function OnTriggerEnter (other : Collider) {
    Destroy(other.gameObject);
}