import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDto} from "./dashboard/commentDto";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8080/chat';

  constructor(private http: HttpClient) {
  }

  makeComment(room: string, comment: string): Observable<string> {
    const commentDto: CommentDto = {
      roomId: room,
      username: "ram",
      message: comment
    };
    return this.http.post<string>(`${this.baseUrl}/` + room, commentDto);
  }

}
