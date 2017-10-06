enum BulletType{
	cherry = 1,
	watermelon = 2,
	banana = 3
}

class BulletInfo {
	public var type : BulletType;
	public var force : int = 3000;
	public var createTimer : float = 1;
	public var createCount : int = 2;
	public var intervalTimer : float = 1;
	public var relateObject : GameObject;
	public var bulletInst : GameObject;
}