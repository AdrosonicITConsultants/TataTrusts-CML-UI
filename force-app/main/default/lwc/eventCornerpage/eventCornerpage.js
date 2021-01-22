import { LightningElement , track , wire} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import jqueryMinJS from '@salesforce/resourceUrl/jqueryminjsv1';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Nature from '@salesforce/resourceUrl/Nature';
import Nature2 from '@salesforce/resourceUrl/Nature2';
import Nature3 from '@salesforce/resourceUrl/Nature3';
import Carousel1 from '@salesforce/resourceUrl/carousel1';
import video1 from '@salesforce/resourceUrl/video1';
import antaran from '@salesforce/resourceUrl/antaran';
import Playicon from '@salesforce/resourceUrl/Playicon';
import dummyprofile from '@salesforce/resourceUrl/dummyprofile';
import dummyprofile2 from '@salesforce/resourceUrl/dummyprofile2';
import seemorearrow from '@salesforce/resourceUrl/seemorearrow';
import videorecordicon from '@salesforce/resourceUrl/videorecordicon';
import EventCorner from "@salesforce/apex/EventManagementClass.EventCorner";
import Poppinregular from '@salesforce/resourceUrl/Poppinregular';
import Poppinbold from '@salesforce/resourceUrl/Poppinbold';
import MontserratRegular from '@salesforce/resourceUrl/MontserratRegular';
import MontserratMedium from '@salesforce/resourceUrl/MontserratMedium';
import Montserratbold from '@salesforce/resourceUrl/Montserratbold';
import Searchicon from '@salesforce/resourceUrl/Searchicon';
import SpeakerEvent from '@salesforce/resourceUrl/SpeakerEvent'
export default class eventCornerpage  extends LightningElement {
  Carousel1 = Carousel1;
  Playicon=Playicon;
  video1=video1;
  dummyprofile=dummyprofile;
  dummyprofile2=dummyprofile2;
  seemorearrow=seemorearrow;
  videorecordicon=videorecordicon;
  Nature=Nature;
  Nature2=Nature2;
  Nature3=Nature3;
  navigateTovideo;
  antaran=antaran;
  SpeakerEvent=SpeakerEvent;
  Searchicon=Searchicon;
  videogrid4;
  videogrid3;
  videogrid2;
  videogrid1;
  moveRight;
  goright=true;
  showEventDetail;
  csuite_video="";
  seemore;
  showmoreIndiaAbroad;
  IndiaAbroadSeemore;
  @track 
  specialfeature=[];
  @track 
  trendingvideo=[];
  @track 
  feature_global_event=[];
  @track 
  liveevent=[];
  @track
  indiaabroad=[];
  @track
  indiaabroad2=[];
  @track
  upcomming_event=[];
  @track
  csuite=[];
  @track 
  csuite_4=[];
  count_indiaAbroad=0
  events_data=[];
  

  @wire(EventCorner) events({ error, data }) {
    if (data) {
      console.log(data);
      var Events=data;
      this.events_data=Events
      let array=[];
      let Csuite_array=[];
      let Csuite_array_4=[];
      let feature_array=[];
      let LiveEvent_array=[];
      let  trending_array=[];
      let indiaabroad_array=[];
      let indiaabroad_array2=[];
      let upcommingevent_array=[];
      var i = 0 , count_indiaAbroad=0;
      if(data.csuite.length > 4){
        this.seemore=true;
      }
     
      for(i=0;i<data.events.length;i++)
      {
       if(data.events[i].Event_categoryUI__c == "Special Feature")
       {
        array.push(data.events[i]);
        this.specialfeature=array;
       }
       if(data.events[i].Event_categoryUI__c == "Featured Global Event")
       {
        feature_array.push(data.events[i]);
       this.feature_global_event=feature_array;
       }
       if(data.events[i].Event_categoryUI__c == "Trending")
       {
        trending_array.push(data.events[i]);
       this.trendingvideo=trending_array;
       }
       if(data.events[i].Event_categoryUI__c == "Live Event")
       {
        LiveEvent_array.push(data.events[i]);
       this.liveevent=LiveEvent_array;
       }
       if(data.events[i].Event_categoryUI__c == "India Abroad" &&  count_indiaAbroad<3)
       {
         count_indiaAbroad+=1;
        indiaabroad_array.push(data.events[i]);
        this.indiaabroad=indiaabroad_array; 
       }
       if(data.events[i].Event_categoryUI__c == "India Abroad"  )
       {
        indiaabroad_array2.push(data.events[i]);
        this.indiaabroad2=indiaabroad_array2;
       }
       if(count_indiaAbroad>2){
         this.IndiaAbroadSeemore=true;
       }
       if(data.events[i].Event_categoryUI__c == "Upcoming Events")
       {
       upcommingevent_array.push(data.events[i]);
       this.upcomming_event=upcommingevent_array;
       }
      }
       for(i=0;i<data.csuite.length;i++)
      {      
       Csuite_array.push(data.csuite[i]);
      this.csuite=Csuite_array;
       }
       for(i=0;i<=3;i++){
      Csuite_array_4.push(data.csuite[i]);
      this.csuite_4=Csuite_array_4;
      }  
       } 
      else if (error) {
        this.error = error;
        this.record = undefined;
     }
    }

handleEventDetails(){
this.showEventDetail = true
}
handleToggleClick(){
this.navigateTovideo = true;
}

    handleToggleClickvideogrid1(event){
      console.log(event.currentTarget.getAttribute('data-id' + "Event of yuoube"));
      var dynamicId = event.currentTarget.getAttribute('data-id');
      for( var hub of this.csuite){
        if(hub.Id == dynamicId){
        var video_url=hub.Video_URL__c;
        this.csuite_video=video_url;
           window.open(video_url);
        }
      }
    }
   
  openUrl(event){
    console.log(event.currentTarget.getAttribute('data-id'));
    var eId = event.currentTarget.getAttribute('data-id');
    window.open("https://dev-tatatrusts.cs111.force.com/testdev/s/"+eId,"_self");
    // window.open("https://www.youraddress.com","_self")
    // var eId = event.currentTarget.getAttribute('data-id');
    // for( var event of this.events_data){
    //   if(event.Id == eId){
    //   var eventId=event.Id;
    //   }
    // }
}
}