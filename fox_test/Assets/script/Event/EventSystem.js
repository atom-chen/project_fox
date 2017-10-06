private static var defaultCenter : NotificationCenter;

private static function create()
{
	return NotificationCenter.DefaultCenter();
}

static function AddObserver(observer, name: String)
{
	defaultCenter = create(); 
	defaultCenter.AddObserver(observer, name, null); 
}

static function RemoveObserver (observer, name: String) 
{
	defaultCenter = create();
	defaultCenter.RemoveObserver (observer, name) ;
}

static function Send(aSender, aName: String)
{
	defaultCenter = create();
	defaultCenter.PostNotification(aSender, aName);
}

static function Send(aSender, aName: String, aData)
{
	defaultCenter = create();
	defaultCenter.PostNotification(aSender, aName, aData);
}