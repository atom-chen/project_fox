private var maxRope : float = 42.25549;
private var minRope : float = -11.74174;
private var scaleNum = 43;
function Update () {
	if(Input.GetKey("up"))
	{
		transform.localScale += Vector3(0, -Time.deltaTime * scaleNum, 0);
		transform.position += Vector3(0, Time.deltaTime * (scaleNum/2), 0);
	}
	else if(Input.GetKey("down"))
	{
		transform.localScale += Vector3(0, Time.deltaTime * scaleNum, 0);
		transform.position += Vector3(0, -Time.deltaTime * (scaleNum/2), 0);
	}
}