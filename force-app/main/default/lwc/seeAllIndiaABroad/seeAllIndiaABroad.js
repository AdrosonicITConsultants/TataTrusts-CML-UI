import { LightningElement , track , wire} from 'lwc';
import dummyprofile2 from '@salesforce/resourceUrl/dummyprofile2';
import EventCorner from "@salesforce/apex/EventManagementClass.EventCorner";
import Poppinregular from '@salesforce/resourceUrl/Poppinregular';
import Poppinbold from '@salesforce/resourceUrl/Poppinbold';
import MontserratRegular from '@salesforce/resourceUrl/MontserratRegular';
import MontserratMedium from '@salesforce/resourceUrl/MontserratMedium';
import Montserratbold from '@salesforce/resourceUrl/Montserratbold';
export default class SeeAllIndiaABroad extends LightningElement {
    dummyprofile2=dummyprofile2;
    @track
    indiaabroad2=[];
    
    @wire(EventCorner) events({ error, data }) {
      if (data) {
       
        let indiaabroad_array2=[];
       
        var i = 0 ;
     
        for(i=0;i<data.events.length;i++)
        {
         if(data.events[i].Event_categoryUI__c == "India Abroad")
         {
          indiaabroad_array2.push(data.events[i]);
          this.indiaabroad2=indiaabroad_array2;
         }
        }
         } 
        else if (error) {
          this.error = error;
          this.record = undefined;
       }
      }
  
}