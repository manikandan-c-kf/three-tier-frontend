import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://localhost:8000/api/posts'; // URL to web api
  private postsUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postsUrl);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.postsUrl, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.postsUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.postsUrl}/${id}`);
  }

  getPostsUpdateListener(): Observable<void> {
    return this.postsUpdated.asObservable();
  }

  notifyPostsUpdate(): void {
    this.postsUpdated.next();
  }
}
