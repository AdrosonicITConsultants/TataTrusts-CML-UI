import { LightningElement , track , wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import antaran from '@salesforce/resourceUrl/antaran';
import Poppinregular from '@salesforce/resourceUrl/Poppinregular';
import Poppinbold from '@salesforce/resourceUrl/Poppinbold';
import MontserratRegular from '@salesforce/resourceUrl/MontserratRegular';
import MontserratMedium from '@salesforce/resourceUrl/MontserratMedium';
import Montserratbold from '@salesforce/resourceUrl/Montserratbold';
import calendarIcon from '@salesforce/resourceUrl/calendarIcon';
import LocationIcon from '@salesforce/resourceUrl/LocationIcon';
import downloadIcon from '@salesforce/resourceUrl/downloadIcon';
import EventDetails from "@salesforce/apex/EventManagementClass.EventDetails";
import EventInviteFriend from "@salesforce/apex/EventManagementClass.EventInviteFriend"
export default class EventDetailspage extends LightningElement {
    invite;
    modalIsopen;
    antaran=antaran;
    LocationIcon=LocationIcon;
    calendarIcon=calendarIcon;
    downloadIcon=downloadIcon;
    // recordId="a0Q1e000000Jc5xEAC";
    recordId="";
    currentPageReference = null; 
    urlStateParameters = null;
    notifyCheckbox;
    showTitleChiefateendee;
    /* Params from Url */
    id = null;
    @track myValue = "";
    @track
    ArtifactsArray=[];
    @track
    SingleEventarray=[];
    @track
    CheifArray=[];
    Event_desc="";
    Event_tag="";
    Event_name="";
    Event_Start_time="";
    Event_End_time="";
    Event_Start_Date="";
    Event_End_Date="";
    Total_seats="";
    registration_done="";
    Event_Venue="";
    seatAvailable="";
    Loc_title="";
    mapMarkers = [{
        location: {
            City: '',
            Country: '',
            PostalCode: '',
            State: '',
            Street: ''
        },
        value: '',
        title: '',
        description: '',
        icon: ''
    }];

   

    
    @wire(EventDetails,{eventId: '$recordId'}) events({ error, data }) {
        if (data) {
            console.log(this.parameters);
            console.log('Response:');
            console.log(data);
            var i=0;
            var chief_attendees=[];
            var arts_array=[];
            var eventdesc= data.ev.Event_Description__c ;
            var eventTags=data.ev.Event_Tags__c;
            var eventName=data.ev.Name;
            var eventStartDate=data.ev.Event_Start_Date__c;
            var eventEndDate=data.ev.Event_End_Date__c;
            var eventStartTime=data.ev.Event_Start_Time__c;
            var eventEndTime=data.ev.Event_End_Time__c
            var Totalseats=data.ev.Event_Capacity__c;
            var registrationdone=data.ev.Registrations_Done__c;
            var SeatsAvailable=(data.ev.Event_Capacity__c-(data.ev.Registrations_Done__c))
            var Eventvenue=data.ev.Event_Venue__c;
            var mapMarkers=[];
            this.mapMarkers[0].title=data.ev.Event_Venue__c;
            this.Event_desc=eventdesc;
            this.Event_tag=eventTags;
            this.Event_name=eventName;
            this.Event_Start_time=eventStartTime;
            this.Event_End_time=eventEndTime;
            this.Event_Start_Date=eventStartDate;
            this.Event_End_Date=eventEndDate
            this.Total_seats=Totalseats;
            this.registration_done=registrationdone;
            this.Event_Venue=Eventvenue;
            this.seatAvailable=SeatsAvailable;
            if(data.ev.Event_Capacity__c-(data.ev.Registrations_Done__c)==0){
               this.notifyCheckbox=true;
            }
            for(i=0;i<data.cas.length;i++)
            {
                if(this.recordId=data.cas[i].Event__c)
                {
                chief_attendees.push(data.cas[i]);
                this.CheifArray=chief_attendees;
                }
                
            }
            for(i=0;i<data.arts.length;i++)
            {
                if(this.recordId=data.arts[i].Event__c)
                {
                arts_array.push(data.arts[i]);
                this.ArtifactsArray=arts_array;
                }
                
            }
           this.mapMarkers = [{
                location: {
                    City: data.ev.City__c,
                    State: data.ev.State__c,
                    Street: data.ev.Street__c,
                },
                value: 'location001',
                title: data.ev.Event_Venue__c,
                description: data.ev.Short_Event_Description__c,
                icon: 'standard:account'
            }];
                 }
                 
        if(this.CheifArray.length>0){
            this.showTitleChiefateendee=true
        }
        else if (error) {
            this.error = error;
            this.record = undefined;
         }
    }

   
    inviteFun(){
        console.log("inv btn clicked")
        this.invite=true;
        this.modalIsopen=true;
    }
    closeModal(){
        this.invite=false;
        this.modalIsopen=false;

    }
    handleChange(evt) {
        this.myValue = evt.target.value;
        console.log('input: ' + evt.target.value);
    }
    sendEmail(){
        console.log(this.myValue);
        EventInviteFriend({ 
            EventId: this.recordId,
            Emailid : this.myValue
         })
        .then((result) => {
            var res = JSON.parse(result);
            console.log(" RES ", res);
            console.log(result)
            // if(res.emailSend){
            //  this.otpSend = true;
            // }else if(res.banned){
            //   this.banned = true;
            // }
        }) 
        .catch((error) => {
            this.error = error;
            console.log('error',error);

        })
    }
    
    
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
       }
    }
 
    setParametersBasedOnUrl() {
       console.log(this.urlStateParameters.id + "Id of param");
      this.recordId=this.urlStateParameters.id;
    }

}