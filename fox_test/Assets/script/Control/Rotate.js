var rotateSpeed : int = 1000;
function Update () {
	transform.Rotate(0, 0, rotateSpeed * Time.deltaTime);
}