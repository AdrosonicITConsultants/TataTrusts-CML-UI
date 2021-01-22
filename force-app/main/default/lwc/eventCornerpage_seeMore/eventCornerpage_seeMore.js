import { LightningElement, track , wire } from 'lwc';
import EventCorner from "@salesforce/apex/EventManagementClass.EventCorner";
import Playicon from '@salesforce/resourceUrl/Playicon';
import SpeakerEvent from '@salesforce/resourceUrl/SpeakerEvent'
export default class EventCornerpage_seeMore extends LightningElement {
  Playicon=Playicon;
  SpeakerEvent=SpeakerEvent;
    @track
    csuite=[];

    @wire(EventCorner) events({ error, data }) {
        if (data) {
          var csuite=data.csuite;
          console.log(data.csuite);
          let Csuite_array=[];
          var i = 0;
          
           for(i=0;i<data.csuite.length;i++)
          {      
           Csuite_array.push(data.csuite[i]);
          this.csuite=Csuite_array;
           }
          
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    
    }
}