import { Timestamp } from "@angular/fire/firestore";

export class Channel {
    channelId: string = '';
    creationDate: Timestamp = Timestamp.now();
    creatorId: string = '';
    type: string = 'public';
    description: string = '';
    name: string = '';
    members: string[] = [];
    threads: string[] = [];

    constructor(obj?: any) {
        this.channelId = obj && obj.channelId || '';
        this.creationDate = obj && obj.creationDate;
        this.creatorId = obj && obj.creatorId || '';
        this.type = obj && obj.type || 'public';
        this.description = obj && obj.description || '';
        this.name = obj && obj.name || '';
        this.members = obj && obj.members || [];
        this.threads = obj && obj.threads || [];
    }


    toJSON() {
        return {
            channelid: this.channelId,
            creationdate: this.creationDate,
            creatorid: this.creatorId,
            type: this.type,
            description: this.description,
            name: this.name,
            members: this.members,
            threads: this.threads
        };
    }
}
