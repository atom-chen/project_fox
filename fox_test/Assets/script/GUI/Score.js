var diaplayTimer : float = 0.8;

function Start()
{
		//EventSystem.Send(this, "UpdateScore", score);
		//���ü��ʱ��Ϊ10��
		yield WaitForSeconds (diaplayTimer);
		Destroy(this.gameObject);
}

function Update()
{
	var translation : float = Time.deltaTime * 10;
	transform.Translate (0, translation, 0);
}