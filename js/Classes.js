var C_User = function(FirstName,LastName,Email,Phone,Username,Password,Image ) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Phone = Phone;
    this.Username = Username;
    this.Password = Password;
    this.Image = Image;

}

var C_Driver = function (Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, Date, Time, TripDetails){
    this.Origin = Origin;
    this.Destination = Destination;
    this.Price = Price;
    this.hasStops = hasStops;
    this.Stop1 = Stop1;
    this.Price1 = Price1;
    this.Stop2 = Stop2;
    this.Price2 = Price2;
    this.Stop3 = Stop3;
    this.Price3 = Price3;
    this.Date = Date;
    this.Time = Time;
    this.TripDetails = TripDetails;
}
var C_DriverSch = function (Day,Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, IsReturn, Time, Return, TripDetails){
    this.Day = Day;
    this.Origin = Origin;
    this.Destination = Destination;
    this.Price = Price;
    this.hasStops = hasStops;
    this.Stop1 = Stop1;
    this.Price1 = Price1;
    this.Stop2 = Stop2;
    this.Price2 = Price2;
    this.Stop3 = Stop3;
    this.Price3 = Price3;
    this.IsReturn = IsReturn;
    this.Time = Time;
    this.Return = Return;
    this.TripDetails = TripDetails;
}

var C_Rider = function (Origin, Destination, Price, Date, Time, TripDetails){
    this.Origin = Origin;
    this.Destination = Destination;
    this.Price = Price;
    this.Date = Date;
    this.Time = Time;
    this.TripDetails = TripDetails;
}
var C_RiderSch = function (Day,Origin, Destination, Price, IsReturn, Time, Return, TripDetails){
    this.Day = Day;
    this.Origin = Origin;
    this.Destination = Destination;
    this.Price = Price;
    this.IsReturn = IsReturn;
    this.Time = Time;
    this.Return = Return;
    this.TripDetails = TripDetails;
}