import { Component, NgZone } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommentDto } from './commentDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  comment = '';
  messages: CommentDto[] = [];
  socket!: WebSocket;

  constructor(private zone: NgZone, private chatService: ChatService) {}

  ngOnInit(): void {
    this.socket = new WebSocket('ws://localhost:8080/ws/messages');
    this.socket.onmessage = (event) => {
      console.log('onmessage: ' + event);
      console.log(event.data);
      this.zone.run(() => {
        this.addMessage(JSON.parse(event.data));
      });
    };
  }

  addMessage(msg: CommentDto) {
    this.messages.push(msg);
    console.log('messages::' + JSON.stringify(this.messages));
  }

  ngOnDestroy(): void {
    this.socket && this.socket.close();
  }

  submitComment(room: string) {
    this.chatService.makeComment(room, this.comment).subscribe(() => {
      this.comment = '';
    });
  }
}
