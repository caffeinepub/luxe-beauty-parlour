import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  type ServiceType = {
    #haircut;
    #facial;
    #makeup;
    #waxing;
    #bridalPackage;
    #nailCare;
    #hairColoring;
    #eyebrowThreading;
  };

  type Appointment = {
    customerName : Text;
    phoneNumber : Text;
    email : Text;
    service : ServiceType;
    preferredDate : Text;
    preferredTimeSlot : Text;
    notes : ?Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  let appointments = Map.empty<Text, Appointment>();
  let inquiries = Map.empty<Text, Inquiry>();

  public shared ({ caller }) func submitAppointment(
    customerName : Text,
    phoneNumber : Text,
    email : Text,
    service : ServiceType,
    preferredDate : Text,
    preferredTimeSlot : Text,
    notes : ?Text,
  ) : async () {
    let appointment : Appointment = {
      customerName;
      phoneNumber;
      email;
      service;
      preferredDate;
      preferredTimeSlot;
      notes;
    };
    appointments.add(email.concat(preferredDate).concat(preferredTimeSlot), appointment);
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      message;
    };
    inquiries.add(email.concat(phone), inquiry);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray();
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };
};
