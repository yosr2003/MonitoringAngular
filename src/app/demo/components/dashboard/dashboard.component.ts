import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { EventService } from 'src/app/event.service';
import { Events } from 'src/app/event';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { HttpErrorResponse } from '@angular/common/http';
import { EmailService } from 'src/app/email.service';
export enum EventType {
    CARD_ADDED = 'CARD_ADDED',
    CARD_ACTIVATED = 'CARD_ACTIVATED',
    CARD_DISABLED = 'CARD_DISABLED',
    CARD_LIMIT_CHANGED = 'CARD_LIMIT_CHANGED',
    CARD_RESET_PIN_INITIATED = 'CARD_RESET_PIN_INITIATED',
    CARD_3DSECURE_ACTIVATED = 'CARD_3DSECURE_ACTIVATED',
    CARD_3DSECURE_DISABLED = 'CARD_3DSECURE_DISABLED',
    RELOAD_PREPAID_CARD = 'RELOAD_PREPAID_CARD',
    RELOAD_PREPAID_CARD_FAILED = 'RELOAD_PREPAID_CARD_FAILED',
  }
  export enum EventTypeDesc {
    CARD_ADDED = 'success',
    CARD_ACTIVATED = 'success',
    CARD_DISABLED = 'fail',
    CARD_LIMIT_CHANGED = 'success',
    CARD_RESET_PIN_INITIATED = 'success',
    CARD_3DSECURE_ACTIVATED = 'success',
    CARD_3DSECURE_DISABLED = 'fail',
    RELOAD_PREPAID_CARD = 'success',
    RELOAD_PREPAID_CARD_FAILED = 'fail',
  }
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
notificationCount: any;
showNotifications() {
throw new Error('Method not implemented.');
}

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;
    nbSucc:number=0;
    nbFail:number=0;

    subscription!: Subscription;
    eventTypes: { label: string, value: string }[] = Object.values(EventType).map(type => ({ label: type, value: type }));
    selectedEventType: string = '';

    events: Events[] = [];
    selectedEvent: Events | null = null;
selectedEventDetails: any;
private toastDisplayed: boolean = false;
selectedEventStatus: any;
eventStatusOptions: any[] = [
    { label: 'Success Events', value: 'success' },
    { label: 'Fail Events', value: 'fail' }
  ];
    size: number;


    constructor(private productService: ProductService, public layoutService: LayoutService, private eventService: EventService, private messageService: MessageService, private emailService: EmailService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    notificationCount2:any ;
    ngOnInit() {
   
        this.loadEvents();
      
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        
   
      
    }



   displayEmailDialog: boolean = false;
    selectedEvent2: any;
    email = {
        to: '',
        subject: '',
        body: ''
      };

    showEmailDialog(event: Events) {
        this.email.to = ''; 
    this.email.subject = `Event ${event.eventId}`;
    this.email.body = `Event ID: ${event.eventId}\nEvent Type: ${event.eventType}\nTimestamp: ${event.timestamp}`;
        this.selectedEvent2 = event;
        this.displayEmailDialog = true;
    }

    sendEmail() {
        this.emailService.saveEmail(this.email.to, this.email.subject, this.email.body).subscribe({
          next: response => {
            console.log('Email saved successfully:', response);
            this.displayEmailDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Email Sent', detail: 'The email has been sent successfully!' });
          },
          error: error => {
            console.error('Error saving email:', error);
            this.messageService.add({ severity: 'error', summary: 'Email Not Sent', detail: 'There was an error sending the email.' });
          },
          complete: () => {
            console.log('Email save request completed');
          }
        });
      }






    // ngAfterViewInit() {
    //     this.showToast();
    // }

    initChart() {
        this.showToast();
        this.notificationCount2=this.countNotificationsBetweenYesterdayAndToday();
  
        console.log("Eventssssssssssssssssssssssssssssssssssssss: ", this.events);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // Initialize chartData with the past week's dates
        const today = new Date();
        console.log("today:", today)
        const lastWeek = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            console.log("dateyosr",date)
            date.setDate(today.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        const eventCounts = lastWeek.map(date => ({
            date,
            succeeded: 0,
            failed: 0
        }));
     
        // Populate event counts based on events data
        this.events.forEach(event => {
            console.log("dateeeeeeee000000000000:",event.timestamp );
            const eventDate = new Date(event.timestamp).toISOString().split('T')[0];
            console.log("eeeeeeeeeeee",eventDate)
        
            const eventTypeDesc = EventTypeDesc[event.eventType];

            const eventCount = eventCounts.find(count => count.date === eventDate);
            if (eventCount) {
                if (eventTypeDesc === 'success') {
                    eventCount.succeeded++;
                    
        
                } else if (eventTypeDesc === 'fail') {
                    eventCount.failed++;
      
                }
            }
        });



        // this.events.forEach(event => {
        //     const eventTypeDesc = EventTypeDesc[event.eventType];
        //     if (eventTypeDesc === 'success') {
        //         this.nbSucc++;
        //     } else if (eventTypeDesc === 'fail') {
        //         this.nbFail++;
        //     }
        // });








        this.chartData = {
            labels: eventCounts.map(count => count.date),
            datasets: [
                {
                    label: 'Succeeded Events',
                    data: eventCounts.map(count => count.succeeded),
                 
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600')
                },
                {
                    label: 'Failed Events',
                    data: eventCounts.map(count => count.failed),
                    backgroundColor: documentStyle.getPropertyValue('--red-600'),
                    borderColor: documentStyle.getPropertyValue('--red-600')
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    displayDialog: boolean = false;
    displayDialog2: boolean = false;

    showDialog(event: Events) {
        this.selectedEvent = event;
        this.selectedEventDetails = event; // Assign eventData to selectedEventDetails
        console.log("Selected Event Details:", this.selectedEventDetails);
        this.displayDialog = true; // Show the dialog
    }
    
    displayFilterDialogEventId: boolean = false;
    displayFilterDialogEventType: boolean = false;
    displayFilterDialogTimestamp: boolean = false;


    
    

    loadEvents(eventType?: string) {
        this.eventService.getAllEvents().subscribe(
            data => {
                console.log("data", data)
                this.size=data.length;
                console.log("siiiiiiiiiiizeeeeeeee:",this.size);
                let filteredEvents = data;
                if (eventType) {
                    filteredEvents = filteredEvents.filter(event => event.eventType === eventType);
                }
                this.events = filteredEvents;
                console.log("evvvvv", this.events)
                
//----------------------------------------------------------------------------------------------
            
this.updateEventCounts();


//------------------------------------
                console.log('couuuuuunt', this.countNotificationsBetweenYesterdayAndToday())
                // this.showToast();
    //*-------------------------------------------------------------------------------------------




                this.initChart();
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    console.error('Une erreur s\'est produite :', error.error.message);
                } else {
                    console.error(`Erreur ${error.status}: ${error.error}`);
                }
            }
        );


        
    }


    loadEvents2(eventStatus: string) {
        this.eventService.getAllEvents().subscribe(
            data => {
                let filteredEvents = data;
                if (eventStatus) {
                    filteredEvents = filteredEvents.filter(event => {
                        const eventTypeDesc = EventTypeDesc[event.eventType];
                        return eventTypeDesc === eventStatus;
                    });
                }
                this.events = filteredEvents;
                this.updateEventCounts();
                // this.showToast();
                this.initChart();
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    console.error('Une erreur s\'est produite :', error.error.message);
                } else {
                    console.error(`Erreur ${error.status}: ${error.error}`);
                }
            }
        );
    }

    updateEventCounts() {
        this.nbSucc = 0;
        this.nbFail = 0;
        this.events.forEach(event => {
            const eventTypeDesc = EventTypeDesc[event.eventType];
            if (eventTypeDesc === 'success') {
                this.nbSucc++;
            } else if (eventTypeDesc === 'fail') {
                this.nbFail++;
            }
        });
    }


    onEventStatusChange(event: any) {
        this.selectedEventStatus = event.value;
        console.log("selectedEventStatus updated to:", this.selectedEventStatus);
    }


      openFilter() {
        this.displayFilterDialogEventId = true;
      }
    
      openFilter2() {
        this.displayFilterDialogEventType = true;
      }
    
      openFilter3() {
        this.displayFilterDialogTimestamp = true;
      }
    
      applyFilterEventId(filterValue: string) {
        console.log("applyFilterDescription appelé avec:", this.selectedEventType);
        this.loadEvents2( this.selectedEventStatus);
      }
    
      applyFilterEventType() {
        console.log("applyFilterEventType appelé avec:", this.selectedEventType);
        this.loadEvents(this.selectedEventType);
    }
    
    onEventTypeChange(event: any) {
        this.selectedEventType = event.value;
        console.log("selectedEventType updated to:", this.selectedEventType);
    }
      applyFilterTimestamp(startDate: Date, endDate: Date) {
        // Ajouter votre logique de filtrage pour Timestamp
        this.loadEvents3(startDate, endDate);
      }


      loadEvents3( startDate: Date, endDate: Date) {
        this.eventService.getAllEvents().subscribe(
            data => {
                let filteredEvents = data;
             
                if (startDate && endDate) {
                    filteredEvents = filteredEvents.filter(event => {
                        const eventDate = new Date(event.timestamp);
                        return eventDate >= startDate && eventDate <= endDate;
                    });
                }
                this.events = filteredEvents;
                this.updateEventCounts();
                // this.showToast();
                this.initChart();
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    console.error('Une erreur s\'est produite :', error.error.message);
                } else {
                    console.error(`Erreur ${error.status}: ${error.error}`);
                }
            }
        );
    }

    calculateNewEventsCount(): number {
        // Déterminer la date d'il y a 5 jours
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    
        // Filtrer les événements dont la date de création est dans les 5 jours précédents par rapport à aujourd'hui
        const newEvents = this.events.filter(event => {
            const eventDate = new Date(event.timestamp);
            return eventDate >= fiveDaysAgo && eventDate <= new Date(); // Inclut la date d'aujourd'hui
        });
    
        return newEvents.length;
    }
    showToast(): void {
        if (!this.toastDisplayed) {
        const notificationCount = this.countNotificationsBetweenYesterdayAndToday();
        console.log('couuuuuunttoast', this.countNotificationsBetweenYesterdayAndToday())
        console.log("yosrtesttoast");
        this.messageService.add({
            severity: 'info',
            summary: 'Notifications Found',
            detail: `You have ${notificationCount} notifications!`,
            sticky: true // Make the toast sticky
        }); 
        this.toastDisplayed = true; // Mark the toast as displayed
    }
    }
    
    
    showSuccessMessage(summary: string, detail: string) {

        console.log("tttttttttttttttttttttoast")
        this.messageService.add({ severity: 'success', summary: summary, detail: detail });
    }








    showSuccess() {
        console.log("esstoastt")
        this.showSuccessMessage('Success!', 'Operation completed successfully.');
    }
   

    getEventsToday(): Events[] {
        const today = new Date().toISOString().split('T')[0];
        return this.events.filter(event => {
       
          const eventDate = new Date(event.timestamp).toISOString().split('T')[0];
          return eventDate === today;
        });
      }
    
      getEventsYesterday(): Events[] {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayISO = yesterday.toISOString().split('T')[0];
        return this.events.filter(event => {
          const eventDate = new Date(event.timestamp).toISOString().split('T')[0];
          return eventDate === yesterdayISO;
        });
      }
      countNotificationsBetweenYesterdayAndToday(): number {
 
    
        const yesterdayEvents = this.getEventsYesterday();

        const todayEvents = this.getEventsToday();
            console.log("Today's events:", todayEvents);

        return todayEvents.length + yesterdayEvents.length;
    }
    
      getUser(event: Events): string {
        if (event && event.eventData && event.eventData.userId) {
          return event.eventData.userId;
        } else {
          return 'Unknown'; // Handle if userId is not available
        }
      }
    
      getEventType(event: Events): string {
        return event.eventType;
      }
    
      getResult(event: Events): string {
        const eventTypeDesc = EventTypeDesc[event.eventType];
        return eventTypeDesc === 'success' ? 'Success' : 'Failure';
      }
  



}
