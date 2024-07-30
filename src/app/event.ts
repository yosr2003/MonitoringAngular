
 // Assurez-vous que l'importation est correcte selon votre configuration

import { EventType } from "./event-type";

export class Events {
    eventId: string;
    aggregateId: string;
    eventData: any;
    eventType: EventType;
    timestamp: Date;

    constructor(eventId: string, aggregateId: string, eventData: any, eventType: EventType, timestamp: Date) {
        this.eventId = eventId;
        this.aggregateId = aggregateId;
        this.eventData = eventData;
        this.eventType = eventType;
        this.timestamp = timestamp;
    }


}
