import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../services/post.service';
import { PostUpdateDialogComponent } from '../post-update-dialog/post-update-dialog.component';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];
  dataSource: any[] = [];

  constructor(private postService: PostService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts();
    this.postService.getPostsUpdateListener().subscribe(() => {
      this.loadPosts();
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  openUpdateDialog(post: any): void {
    const dialogRef = this.dialog.open(PostUpdateDialogComponent, {
      width: '400px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPosts(); // Refresh the table after update
      }
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(
      () => {
        this.loadPosts();
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
